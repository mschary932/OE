kony.modules = {
    /* Loads specified module and its depended modules recursively. 
    if module is already loaded then that module will not be loaded again.  */
    loadModule: function(moduleid){
        if(typeof $KG.functionalModules[moduleid] === "undefined"){
            return false;
        }
        try{
            var fm = $KG.functionalModules[moduleid];
            if(fm.loaded == 1) return true; 
            
            fm.loaded = 1;
            if(kony.modules.preInitCheck(moduleid)){ 
                return true;
            }
            /* Added condition to support modules in web workers  */
            if(typeof importScripts === "function")
            {
                importScripts(moduleid  + "_kfm.js");
                kony.modules.moduleCallback(moduleid);
            }else{
                var url = $KG.platformver+"appjs/"+moduleid+ (kony.appinit.isIE8?'ie':'') + "_kfm.js";
                $KI.net.loadJSFile(url, false, function(moduleScript){ 
                    try{
                        kony.modules.addScript(moduleScript);
                        kony.modules.moduleCallback(moduleid); 
                    }catch(e){
                        kony.print('Unable to load module '+ moduleid + '. Error ' + e.message);
                    }
                });
            }
        
            if($KG.functionalModules[moduleid].loaded === 1){
                return true;
            }else{
                return false;
            }
        }catch(e){
            kony.print(e.message);
            return false;
        }
    },
    
   
    
    /* Check if module is already loaded or not. Recursively load all dependent modules. */
    preInitCheck: function(moduleid){
        var fm = $KG.functionalModules[moduleid];
        //load dependent modules
        for(var i=0; i<fm.depends.length; i++){
            var m = fm.depends[i];
            if(typeof $KG.functionalModules[m] == "undefined"){
                throw new Error('Invalid module : ' + m);
            }
            if(typeof $KG.functionalModules[m].loaded == "undefined"){
                if(!kony.modules.loadModule(m)){
                    throw new Error('Unable to load module : ' + m);
                }
            }
        }
        return false;
    },
    
    /* custom callback for updating loaded mmodules */
    moduleCallback: function(m){
        var fm = $KG.functionalModules[m];
        if(typeof fm !== "undefined"){
            var init = null;
            if(typeof(fm.init) === "string"){
                init = window[fm.init];
                if(typeof init !== "function"){
                    fm.inProgress =false;
                    fm.loaded = undefined;
                    throw new Error('Invalid module init function : ' + m); 
                }
            }
            
            /* if module has init function then init should be executed.*/
            if(typeof fm.errorcode === "undefined" && init !== null){
                init();
            }
            fm.inProgress =false;
            fm.loaded = 1;
            
            
        }
    },
    
    /* Loads specified module and its depended modules recursively and calls provided callback after loading module.  */
    loadModuleAsync: function(moduleid, callback, errorcallback){
        try{
            var fm = $KG.functionalModules[moduleid];
            if(typeof  fm === "undefined") {
                return errorcallback(moduleid,1250);
            }
            var loadComplete = function(e){
                if(typeof fm.loaded == "undefined"){
                    try{
                        kony.modules.moduleCallback(moduleid); 
                    }catch(exp){
                        //error while module init is error.
                        e= 1251;
                    }
                }
                if(e){
                    errorcallback(moduleid,e);
                }else{
                    callback(moduleid);
                }
            };
            
            if(fm.loaded == 1){ 
                callback(moduleid);
                return true;
            }
            if(fm.inProgress){
                //kony.modules.checkForDependents(moduleid,null,loadComplete);
                return;
            }
            
            fm.inProgress =true;
            kony.modules.loadDependentModules(moduleid,callback,errorcallback);
            
            /* Added condition to support modules in web workers  */

            if(typeof importScripts === "function")
            {
                importScripts(moduleid  + "_kfm.js");
                loadComplete();
            }else{
                var url = $KG.platformver+"appjs/"+moduleid+ (kony.appinit.isIE8?'ie':'') + "_kfm.js";
                $KI.net.loadJSFile(url, true, function(moduleScript){
                    kony.modules.checkForDependents(moduleid,moduleScript,loadComplete);
                });
            }
        }catch(e){
            errorcallback(moduleid,1251);
        }

    },
    
    checkForDependents: function(moduleid,moduleScript,loadComplete,counter){
        var dependentsLoaded = true;
        var errorOnLoad = null;
        var fm = $KG.functionalModules[moduleid];
        if(typeof fm.errorcode !== "undefined"){
            errorOnLoad = fm.errorcode;
        }

        //Added counter logic to identify deadlock. To wait for around 3 sec, if modules is not loaded in 3 seconds it will error out.
        if(typeof counter === "undefined" ){
            counter = 0;
        }else{
            if(counter > 30){
                loadComplete(1251);
                return;
            }else{
                counter++;
            }
        }

        for(var i=0; i<fm.depends.length; i++){
            var m = fm.depends[i];
            if(typeof $KG.functionalModules[m] !== "undefined"){
                if(typeof $KG.functionalModules[m].loaded == "undefined"){
                    dependentsLoaded = false;
                }
                if(typeof $KG.functionalModules[m].errorcode !== "undefined"){
                    errorOnLoad = $KG.functionalModules[m].errorcode;
                }
            }
        }
        
        //Check if dependedn modules are loaded, if loaded then only add script. If there is error while loading dependents then error this modules also. else wait for 100 milliseconds and then check again.
        if(dependentsLoaded && errorOnLoad === null ){
            if(moduleScript === null){
                loadComplete();
            }else{
                kony.modules.addScript(moduleScript,loadComplete);
            }
        }else if(errorOnLoad !== null){
            loadComplete(errorOnLoad);
        }else{
            setTimeout(function(){
                kony.modules.checkForDependents(moduleid,moduleScript,loadComplete,counter);
            },100);
        }
    },
    
    loadDependentModules: function(moduleid, sc,ec){
        var mod = $KG.functionalModules[moduleid];
         // do not load module if already loaded
        //load dependent modules
        
        //IF dependent module is in progress don't load that module again.
        for(var i=0; i<mod.depends.length; i++){
            var m = mod.depends[i];
            if(typeof $KG.functionalModules[m] === "undefined"){
                ec(moduleid, 1250);//Invalid dependedent.
            }else if(typeof $KG.functionalModules[m].loaded == "undefined"  && $KG.functionalModules[m].inProgress !== true){
                kony.modules.loadModuleAsync(m,kony.modules.onLoadComplete,kony.modules.onLoadComplete); 
            }
        }
        return false;
    },
    onLoadComplete : function (moduleid, errorcode){
        $KG.functionalModules[moduleid].errorcode =errorcode;
    },
    
    addScript: function(moduleScript, callback){
    // add the returned content to a newly created script tag
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.text = moduleScript;
        try{
            document.getElementsByTagName('head')[0].appendChild(script);
            if(callback){ callback();}
        }catch(e){
            if(callback){ callback(e);}
        }finally{
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }
    
};

kony.modules.loadFunctionalModule = kony.modules.loadModule;

kony.modules.loadFunctionalModuleAsync = kony.modules.loadModuleAsync;
