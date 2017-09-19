
$KI.setappevents = function(eventobj){
   
   // Added this to handle dynamic skinning in hybrid mode as appinitialize was not called during hybrid mode
   if($KG["appmode"] == constants.APPLICATION_MODE_HYBRID){
        var initfunc;
        if(IndexJL) 
        	initfunc =  window["appinit"];
         else
         	initfunc = window["appInit"];

        initfunc && initfunc();
		$KU.detectDevice();
        return;
    }	
	
	$KG["__konyappevents"]=eventobj;
	//if (!IndexJL) kony.appinit.disablesplash();   //commented because JS launch of hybrid mode is not working
	var preappinit = eventobj["preappinit"] || null;
	var appinit = eventobj["init"] || null;
	var postappinit = eventobj["postappinit"] || null;
	var appservice = eventobj["appservice"] || null;
	var showstartref = eventobj["showstartupform"] || null;
	var deepfunc = eventobj["deeplink"] || null;  
	var launchparams = {};
	var startform = null;
	var launchobj = {};
	launchobj["launchparams"] = {};
	var formmodel;
	

	//launchparams["sessionId"] = kony.appinit.sessionId;
	if(window.location.hash){
        //reading the bookmarked state from url and adding to launchparams
        var formId = kony.bm.getFormId(window.location.hash);
        if(formId) {
            launchparams['formID'] = formId;
            var formState = kony.bm.getBMState(formId);
            if(formState) {
                for(var k in formState) {
                    launchparams[k] = formState[k];
                } 
            }
        }
	}

	/*for(var prop in launchparams){
		launchobj[prop] = launchparams[prop];
	}*/


	
	launchobj["launchmode"] = $KG["__launchmode"];
	
	if($KG["kdeepobj"]){
		launchobj["launchparams"] = $KG["kdeepobj"];
	}
	
	//desktopWeb BM state support. 
	//Do not change the order of the below for loop code. It should be after if($KG["kdeepobj"])
	for(var prop in launchparams){
		launchobj["launchparams"][prop] = launchparams[prop];
	}
	//Storing innerHeight in a global variable - used in showLoadingScreen.	
	$KU.getInnerHeight($KU.isIDevice ? 0 : 200);
	$KU.isAndroid && setTimeout(function(){$KG['__viewportHeight'] = window.innerHeight;}, 200);	
	
	preappinit && preappinit(launchobj);
	
	$KU.detectDevice();
	
    appinit = $KU.returnEventReference(appinit);
	appinit && 	appinit(launchparams);
	
	launchparams["isRefresh"] = false;
	launchparams["isNewSPASession"] = (kony.appinit.isNewSession == "true") ? true : false;
	if(window.location.hash){
		var formObj = window[window.location.hash.substring(2)];
		if(formObj && !launchparams["isNewSPASession"]){
			launchparams["isRefresh"] = true;
			launchparams["refreshForm"] = formObj;
		}
	}
	for(var prop in launchparams){
		launchobj["launchparams"][prop] = launchparams[prop];
	}
	
	
	if(postappinit) {
		startform = postappinit(launchobj);
	}
	
	if(deepfunc || appservice) {
		// if appservice is defined --> then deeplink is ignored
		/*if($KG["kdeepobj"]){
			for(var prop in launchobj){
				$KG["kdeepobj"][prop] = launchobj[prop];
			}
		}*/	
		if(appservice) {
			startform = appservice(launchobj);		
		} else if(deepfunc) {			
			startform = deepfunc($KG["kdeepobj"]);
		}
	}
	
	if((startform == null) || (startform.length == 0)) {
		showstartref &&	showstartref(launchobj);
	} else {
		if (typeof startform == "string") {
			formmodel = $KG.allforms[startform];
		} else {
			formmodel = startform
		}
        if(IndexJL == 1) 
        formmodel && $KW.Form.handleshow(formmodel); 
        else 
        formmodel && formmodel.show();
	}	
};


$KI.window = {

    openURL : function(url, params, name)
    {
	/*	var lform = $KG["__currentForm"]
		var model = $KG;
		
		model = JSON.stringify(model);
		//Store the model & lastform shown
		if (model != null) {
			sessionStorage.setItem("klastform", lform.id);
			sessionStorage.setItem("kmodel", model);	
		}
        
        */
		
		//window.location.href = url;
		//Currently opening the url in new window
	$KW.unLoadWidget();
			if(!name)
				name = "_blank";
            window.open(url, name);
    },

    alert : function(message, alertHandler, alertType)
    {
    	if( message === null ) return;

    	var msgstr = message;
    	var hndlr = alertHandler || null;
    	var alerttype = alertType || null;

    	/* New 5.0 Lua API
    		window.Alert( {
                            message = "Hi";
                            alerttype = constants.ALERT_TYPE_CONFIRMATION;
                            alerttitle = "AlertTitle";
                            yeslabel = "Yes";
                            nolabel = "No";
                            alerticon = "";
                            alerthandler = act0_frmBasicWidgets_button10854316781449_onclick_seq0;
                                }, { } );
        */

    	if(message.message || message.alerttype || message.alertType) {
    		alerttype = message.alerttype || message.alertType;	
    		msgstr = message.message;
    		hndlr = message.alerthandler || message.alertHandler || null;
    	}

		if(alerttype === constants.ALERT_TYPE_INFO || alerttype === constants.ALERT_TYPE_ERROR || !alerttype)
        {
            alert(msgstr);
            hndlr && hndlr();
        }
        else if (alerttype === constants.ALERT_TYPE_CONFIRMATION)
        {
             var answer = confirm(msgstr);
             hndlr && hndlr(answer);
		}
    },
    
    openMediaURL : function()
    {
	
    },
    
	/*
		window.showloadingscreen(skin, text, position, isBlocked, showProgressIndicator, nil)
		- If position is fullscreen, skin will be applied to entire scrim
		- If position is center, skin will be applied to center portion
		- If isBlocked is set to true, background will be blocked
		- If isBlocked is set to false, background will not be blocked; can be overriden by position
		- When an image is specified as background in the skin, showProgressIndicator should be set to false
		- When showProgressIndicator is set to false, text will be dispalyed below skin image, if any; Else will be dispalyed adjacent to it
	*/
	showLoadingScreen: function() 
	{
		$KG.__dismissed = false;
		var skin = arguments[0];
		var text = arguments[1] || "";
		var position = arguments[2] || constants.LOADING_SCREEN_POSITION_FULL_SCREEN;
		var isBlocked = (arguments[3] === false) ? false : true;
		var showProgressIndicator = (arguments[4] === false) ? false : true;
		var indicator = showProgressIndicator ? "<img src='" +  $KU.getImageURL("loading.gif") + "' style='vertical-align:middle'/>" : "";
		text = text ? "<label style='padding:10px; xfont-size: 16px;color:" + (skin ? ' inherit;' : 'white;' ) + (!showProgressIndicator ? "display: block;" : "") + "'>" + text + "</label>" : "";
		
		//Adding dummy span to body for voice over during loading indicator.
		$KU.createa11yDynamicElement();
	   
		var loadingDiv = document.getElementById("__loadingScreenDiv");
		var divTag = loadingDiv || document.createElement("div");
		//onClick registered to disable background widget events underlying the loadingDiv.
		if($KU.isWindowsPhone){	
			divTag.onclick = function(){
				var event = window.event;
				if(event){ 
					kony.events.preventDefault(event);
					kony.events.stopPropagation(event);
				}	
			}
			
		}
		divTag.id = "__loadingScreenDiv";
		divTag.style.zIndex = "100";
		divTag.style.visibility = "hidden";
		divTag.style.backgroundColor = "";
		var topPos = "50%";
		$KG.bgImgHeight = 0;
		divTag.className = "";
		
		var setLoadingPosition = function(event) 
		{
			if($KG.__dismissed)
				return;
				
			if(!event)
				event = window.event;
			if(event && event.type == 'error')
				document.body.appendChild(divTag);
			else 
			{
				var tagName, wrapDiv = "";
				if(event && event.type == 'load'){
					tagName = event.srcElement.tagName;					
					$KG.bgImgHeight = event.srcElement.naturalHeight;					
				}				
				else					
					wrapDiv = document.querySelector("div[id='__wrapperDiv']");	
				
				var bgPos, posY, screenH;
				var scrolledHeight = 0;
				if($KG.nativeScroll)
				{
					// cover the entire portion
					var mainContainerHeight = document.getElementById("__MainContainer").clientHeight;
					if(mainContainerHeight < (window.innerHeight || document.body.clientHeight))
						divTag.style.height = (window.innerHeight || document.body.clientHeight) + "px";
					else
						divTag.style.height = mainContainerHeight +"px";
					if($KU.isIDevice)
						scrolledHeight = document.body.scrollTop || window.pageYOffset;  //Not required in case of fixed positioning. 
				}
				
				//divTag.style.display = "";
				document.body.appendChild(divTag);			
				// Center the div										
				screenH = $KG["__innerHeight"] || window.innerHeight || document.body.clientHeight;	
				divTag.style.display = "";
				divTag.style.visibility = "visible";
				var bias;
				var innerDiv = divTag.firstChild;
				if(tagName && tagName.toLowerCase() == "img"){			
					bias =  event.srcElement.naturalHeight;					
				}	
				else if(wrapDiv){
					//In case of custom image wrapDiv.firstChild is undefined.
					if(wrapDiv.firstChild && wrapDiv.firstChild.tagName.toLowerCase() == "img"){								
						bias = wrapDiv.firstChild.naturalHeight;
					}
					else{ //For custom image.		
						bias = $KG.bgImgHeight || innerDiv.clientHeight || 0; 						
					}
				}		
				else{
					bias = innerDiv.clientHeight;
				}	
					
				posY = Math.round(scrolledHeight + (screenH - bias)/2) + "px";
				bgPos = "50% " + parseInt(posY,10) + "px";
				divTag.style.backgroundPosition = bgPos;
				topPos = posY;				
				innerDiv.style.top = posY;
				var labelEle = document.querySelector("#__loadingScreenDiv label");
				labelEle = labelEle && labelEle.textContent;
				labelEle && $KU.changea11yDynamicElement(labelEle);
				// Append to body
				//document.body.appendChild(divTag);
			}
		};
		
		var orientationEvent = ($KU.isOrientationSupported && !$KU.isAndroid) ? "onorientationchange" : "onresize";
		kony.events.addEvent(orientationEvent, "loadingScreen", function(){setTimeout(setLoadingPosition, $KU.orientationDelay)});
		//window.addEventListener(orientationEvent, function(){setTimeout(setLoadingPosition, $KU.orientationDelay)});
		if(position == constants.LOADING_SCREEN_POSITION_FULL_SCREEN || isBlocked)
		{
			divTag.className = "popuplayer absoluteContainer ";
			if($KG.nativeScroll && !$KU.isIDevice)
				divTag.style.position = "fixed";
			divTag.style.top = 0;
			if(position == constants.LOADING_SCREEN_POSITION_FULL_SCREEN)
			{
				divTag.style.backgroundPosition = "center";
				divTag.className += skin;
				var bgColor = $KU.getCSSPropertyFromRule(skin, 'background-color');			
				if(bgColor && bgColor != "initial" && bgColor != "inherit"){
					if($KU.isWindowsPhone && bgColor == "transparent") //To prevent click on underlying form when background is transparent in ie
						divTag.style.background = "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)";
					else
						divTag.style.backgroundColor = bgColor;	
				}		
			}
		}
		
		var wrapperDiv = "<div id ='__wrapperDiv'>";
		// TODO: Move to a class
		var style = "xcolor:white;position:absolute;width:100%;z-index:100;text-align:center;";
		if($KG["nativeScroll"]){
			style = "xcolor:white;position:fixed;width:100%;z-index:100;text-align:center;";
		}
		var className = "";
		if(position == constants.LOADING_SCREEN_POSITION_ONLY_CENTER)
		{	var height =  $KU.getCSSPropertyFromRule(skin, 'height');
			if(height)
			{
				height = height.replace("%","");
				height = parseInt((height * (window.innerHeight)/100),10);
				style += "height:" + height + "px !important";
			}
			className = skin;
			style += "background-position: center;";
		}
		
		divTag.innerHTML = "<div id='__innerDiv' class='" + className + "' style='" + style + "'>" + wrapperDiv + indicator + text + "</div></div>";
		var backgroundImage = "";
		
		if(showProgressIndicator)
		{
			//No skin given explicitly
			backgroundImage = $KU.getImageURL("loading.gif");
			$KU.imagePreloader(backgroundImage, setLoadingPosition);
        }
        else
        {	
			//Explicit skin defined
        	backgroundImage = $KU.getCSSPropertyFromRule(skin, 'background-image');
			if(backgroundImage && backgroundImage != "none" && backgroundImage != "initial" && backgroundImage != "inherit")
			{	
				if($KU.isWindowsPhone){
					var len = backgroundImage.lastIndexOf(")") - backgroundImage.lastIndexOf("/");
					backgroundImage = backgroundImage.substr(backgroundImage.lastIndexOf("/") + 1, len - 2);
					backgroundImage =  $KU.getImageURL(backgroundImage);					
				}
				else				
					backgroundImage =  backgroundImage.replace(/url\(([^\)]*)\)/,'$1');
				$KU.imagePreloader(backgroundImage, setLoadingPosition);
        	}
        	else
        		setLoadingPosition();
		}
		
		/* Disable scroll on loading screen */
		if(!loadingDiv && $KG["nativeScroll"]){
			function preventScroll(e){
				var evt = e || window.event;
				kony.events.preventDefault(evt);
				kony.events.stopPropagation(evt);
				return false;
			}
			
		kony.events.addEventListener(divTag, $KU.isTouchSupported ? 'touchstart' : 'mousedown', preventScroll);
		kony.events.addEventListener(divTag, $KU.isTouchSupported ? 'touchmove' : 'mousemove', preventScroll);
	
		}
	},
	
	dismissLoadingScreen: function()
	{
		var loadingDiv = document.getElementById("__loadingScreenDiv");
		if(loadingDiv) 
			loadingDiv.style.display = "none";
		$KG.__dismissed = true;
		
		
	},
	
	
	

	
}

$KI.exit = function()
{
	if($KU.isIDevice || !$KU.isMob)
	{
			window.open('', '_self', '');
			window.close();
	}
}

$KI.appreset = function()
{
	console.warn("appreset not supported in SPA");
}

$KI.assert = function(arg1, arg2){
	
	if (null === args1 || false === args2) {
		if (arguments.length > 1) {
			if (typeof(args2) === "string") {
				throw new Error(args2);
			}
			else {
				throw new Error("Invalid argument to assert");
			}
		}
		else {
			throw new Error("Assertion failed");
		}
	}
	else {
		return arg1;
	}
};
	
$KI.type = function (arg) {
       
	var result;
	
	/*if(typeof(arg) == "undefined") {
		result = "null";
	} else 
		if (arg + "" == "null") {
			result = "null";
		} */
	if(typeof(arg) == "undefined" || arg + "" == "null") {
		result = IndexJL?"nil":"null";
	}else 
		if (typeof(arg) === "boolean") {
			result = "boolean";
		} else 
			if (typeof(arg) === "number") {
				result = "number";
			} else
				 if (typeof(arg) === "string") {
					result = "string";
				} else 
					if (typeof(arg) === "function") {
						result = "function";
					} else {
						result = IndexJL?"table":"object";
					  }
	return result;
};
	

$KI.converttobase64 = function(rawbytes) {
	return $KU.getBase64(rawbytes);
};

$KI.converttorawbytes = function() {
	console.warn("converttorawbytes api not supported in SPA");
};

$KI.setappheaders = function(headers) {

	  kony.app.headers = {};	
	  
	  if(IndexJL) headers.splice(0,1);

	  for(i=0; i < headers.length; i++) {
	  	kony.app.headers[headers[i].id] = headers[i];
	  	_konyConstNS.Form2.prototype.createFormLevelHierarchy.call(headers[i], headers[i].ownchildrenref);
	  }
};

$KI.setappfooters = function(footers) {
	kony.app.footers = {};

	if(IndexJL) footers.splice(0,1);
	 
	for(i=0; i < footers.length; i++) {
	  	kony.app.footers[footers[i].id] = footers[i];
	  	_konyConstNS.Form2.prototype.createFormLevelHierarchy.call(footers[i], footers[i].ownchildrenref);
	}

};

$KI.setapplicationcallbacks = function() {
	console.warn("setapplicationcallbacks API is not supported on SPA") ;
};

$KI.setapplicationbehaviors = function(appbehavior) {
	if(!$KG.appbehaviors)
	    $KG.appbehaviors = appbehavior;
	else
	{
	    for(var k in appbehavior)
	        $KG.appbehaviors[k]= appbehavior[k]; 
	}
};

$KI.setupWidgetDataRecording = function() {
	//TO Do 	
	 $KG.appbehaviors["recording"] = true;
};

function tobeimplemented(str) {    
    console.warn(str + "  API to be implemented Yet");
}

KonyError = function(errorcode, name, message) {	
	this.errorCode = this.errorcode = errorcode;
	this.name = name;
	this.message = message;
};

//Not Necessary but just inheriting Javascript Error Object.
KonyError.prototype = new Error();  
KonyError.prototype.constructor = KonyError;

kony.getError = function(e) {
	return e;
}

kony.bm = {
    //#### How to use Bookmark API
    //Bookmarking is way of accesing the content of target page directly, instead of navigating via the home page.
    //The url, while bookmarking or copy/pasting in emails, has sufficient information for the server to process and redirect to 
    //corresponding page.
    //
    //Our Kony desktop web apps are Single Page Apps (SPA). All the code is download on to the client in the first hit.
    //From there onwards all the navigation..i.e switching between forms (between pages in web parlance) happens using client side kony api.
    //
    //The url has only the current form name in the hash part. There is no clue of any other required data to render the page. It is available only browser's mind.
    //This bookmark *API* is an attempt to provide the application developer, a **tool** to store/save the desired state in the urls.
    //
    //#### To use this api, the app must use *appservice* mechanism.
    //The appservice's function call argument object is pre-loaded with target '*formID*' and also all the state that is saved via setBMState/addBMState api calls.
    //
    //It is developer's call to honour the form requested or to navigate to any other form(via return value of appservice function call).
    //
    //The public api(explained later in the doc):
    //
    //* setBMState(formId, json)
    //* resetBMState(formId)
    //* addBMState(formId, key, value)
    //* removeBMState(formId, key)
    //* getBMState(formId)
    //
    //#### The public api is available in the 'kony.application' namespace.  
    //
    //
    // README: all '\_\_xxx__' are for private use.
    //
    //Here, 'this' variable is not used in the functions, instead 'kony.bm' namespace is used inside functions.
    //The public BM functions are mapped to 'kony.application' namespace in konyapplication.js .
    //When called via that namespace, the 'this' in BM functions will represent 
    //kony.application object not kony.bm object.
    //Hence the 'this' is replaced with 'kony.bm' in all the functions

    //please don't change the size of *FORM\_PREFIX* or its value
    //there is some code which assumes that it is '#_' and of size 2. e.g. konyinit.js
    FORM_PREFIX: '#_', 
    GSTATE_PREFIX: '/',

    __global_state__: {},
    __check_args__: function(args, count) {
        if(args.length != count) {
            throw new Error("Invalid number of arguments. Expected: " + count + ", Given: " + args.length);
        }

        //This code snippet might look stupid..but here is the scenario.  
        // var a = [], a[4] = 4, a.length == 5, but a[0] will be undefined..hence the check.
        // Other checks like string being not empty, object not empty etc. can be made but then it will be overkill..hence ignored
        for(var i in args) {
            if(typeof(args[i]) === 'undefined') {
                throw new Error("Invalid arg[" + i + "] in " + args);
            }
        }
    },

    //Bookmarking is enabled only for DESKTOP channel


    __initialized__: false,
    //This *\_\_init__* function should be called by all public functions. 
    //It reads/parses the url and sets up the state for further use
    __init__: function() {
        var hp = window.location.href;
        if(hp.indexOf("http") == 0) {
            hp = kony.bm.__get_hash__(hp);
        }
        var stateStr = kony.bm.__get_raw_state__(hp);
        if(stateStr) {
            kony.bm.__global_state__ = JSON.parse(decodeURI(stateStr));
        }
        kony.bm.__initialized__ = true;
    },
  
    //This *\_\_update_hash__* function should definitely be called by all public 
    //functions which effect change in the bm state
    __update_hash__: function() {
        var jsonStr = JSON.stringify(kony.bm.__global_state__);
        var currentFormId = kony.bm.getFormId(window.location.hash);
        window.location.hash = kony.bm.FORM_PREFIX + currentFormId + kony.bm.GSTATE_PREFIX + encodeURI(jsonStr);
    },

    __get_hash__: function(href) {
        return href.substr(href.indexOf(kony.bm.FORM_PREFIX));
    },

    __get_raw_state__: function(hash_part) {
        var hp = hash_part;//for small name purpose
        var indexOfStateBegin = hp.indexOf(kony.bm.GSTATE_PREFIX);
        var rawState = ""; //no state
        if(indexOfStateBegin > 0) { //some state parameters are present in url 
            rawState = hp.substr(hp.indexOf(kony.bm.GSTATE_PREFIX) + kony.bm.GSTATE_PREFIX.length); 
        }
        return rawState;
    },


    //Function to safely retrive the formId present in the url.
    //It is preferred to use this in longer run

    getFormId: function(hash_part) {
        var hp = hash_part; //for small variable name
        if(!hp) { //i.e if no hash is passed then use the current hash
            hp = location.hash;
        }
        var formAndState = hp.substr(hp.indexOf(kony.bm.FORM_PREFIX)+ kony.bm.FORM_PREFIX.length);
        var indexOfStateBegin = formAndState.indexOf(kony.bm.GSTATE_PREFIX);

        var formId;
        if(indexOfStateBegin < 0) {//i.e state not present
           formId = formAndState; 
        }else {
           formId =  formAndState.substr(0, indexOfStateBegin);
        }
        return formId;
    },

    //Dummy failover functions for other channels
    //### Bookmark Public API

    //#####setBMState(formId, object)
    // This function accepts *formId* and a *json* object.  
    // This object is retrievable by using its counter part *getBMState*.  
    // The browser's url(hash_part) is immediately updated to facilitiate
    // bookmarking or copy/pasting by browser users.
    setBMState: function(formId, json) {
        kony.bm.__check_args__(arguments, 2);
        if(!kony.bm.__initialized__) {
            kony.bm.__init__(); 
        }
        kony.bm.__global_state__[formId] = json;
        kony.bm.__update_hash__();
    },

    //#####resetBMState(formId)
    // This function clears the state object of given formId
    resetBMState: function(formId) {
        kony.bm.__check_args__(arguments, 1);
        if(!kony.bm.__initialized__) {
            kony.bm.__init__(); 
        }
        delete kony.bm.__global_state__[formId];
        kony.bm.__update_hash__();
    },

    //#####addBMState(formId, name, value)
    //A syntactic sugar to *setBMState*. It is error prone
    //to maintain another json object in developer mind-space and always calling
    //*setBMState* for every change in the bookmarkable state.  
    //It accepts a formId, name and value. It just appends to the
    //existing bookmarked state of the form and immediately updates the url.
    addBMState: function(formId, name, value) {
        kony.bm.__check_args__(arguments, 3);
        if(!kony.bm.__initialized__) {
            kony.bm.__init__(); 
        }
        var s = kony.bm.getBMState(formId);
        if(! s) {
            s = {};
            kony.bm.setBMState(formId, s);
        }
        s[name] = value;
        kony.bm.__update_hash__();
    },

    //#####removeBMState(formId, name)
    //The counter part of *addBMState*. It removes the given *name* from
    //the stored *formId*'s state.
    removeBMState: function(formId, name) {
        kony.bm.__check_args__(arguments, 2);
        if(!kony.bm.__initialized__) {
            kony.bm.__init__(); 
        }
        var s = kony.bm.getBMState(formId);
        if(s) {
            delete s[name];
            kony.bm.__update_hash__();
        }
    },
    
    //#####getBMState(formId)
    //Retrieves any state that is store for the given *formId*
    getBMState: function(formId) {
        kony.bm.__check_args__(arguments, 1);
        if(!kony.bm.__initialized) {
            kony.bm.__init__(); 
        }   
        return kony.bm.__global_state__[formId];
    }
};
