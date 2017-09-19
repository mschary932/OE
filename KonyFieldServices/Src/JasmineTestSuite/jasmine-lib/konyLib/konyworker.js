/**
Worker threads are a means of introducing concurrency to run parallel control paths of execution, which can take advantage of multiprocessor environments as well as to keep UI Thread in App responsive by delegating or offloading work which need not be handled in Main thread.
This spec is in line with HTML5 proposed Worker threads using "Message Passing".
Currently only Dedicated workers are implemented. Shared workers are not supported.
*/
kony.worker = {
    
            /**
                Dedicated Worker: 
                The Worker() constructor call creates a worker and returns a Worker object representing that worker,which is used to communicate with the worker.
            */
            WorkerThread: function (sURL, fDefListener, fOnError) {
            	if (sURL === undefined || sURL === null || sURL === '') { 
            		throw new KonyError(3001, "WorkerThreadError", "WorkerThread: MissingMandatoryParameter. Failed to construct WorkerThread"); 
            	}
				if (typeof sURL !== "string") {
					throw new KonyError(3002, "WorkerThreadError", "WorkerThread: InvalidParameter. Invalid script name"); 
				} 
                
                var oInstance = this, workerBasePath = $KG["platformver"] + "appjs/";
                /**
                    First worker will start with konyworkerinit.js which will load required kony apis and then load actual worker.
                */
				if(typeof nestedWorker  === "undefined"){
					this.oWorker = new Worker(workerBasePath + "konyworkerinit.js"); 
				}else {
					this.oWorker = new Worker( "konyworkerinit.js");
				}

				var kgAppMode = $KG["appmode"] || "";
				var kgAppID = $KG["appid"] || ""; 
				var kgSkipProxy = $KG["skipproxy"] || ""; 
				var kgRcid = $KG["rcid"] || ""; 
				var isFMSupported = false;
				var kgUserAgent = kony.os.userAgent();
				if( typeof $KG["functionalModules"] !== "undefined")
					isFMSupported = true;
					
                /*konyworkerinit.js will create actual worker on first postMessage and removes that onmessage, so that it is called only once. */
                this.oWorker.postMessage({moduleName:sURL,contextPath:workerBasePath,kgAppMode:kgAppMode,kgAppID:kgAppID,kgSkipProxy:kgSkipProxy,kgRcid:kgRcid,isFMSupported:isFMSupported,kgUserAgent:kgUserAgent}),
                /* If default onmessage is not provided in constructor then will add dummy onmessage.*/
                oInstance.defaultListener = fDefListener || function(event) { kony.print("Data: " + event.data)};
                /* If default onerror is not provided in constructor then will add dummy onmessage.*/
                oInstance.defaultErrorListener = fOnError || function(e){
                	kony.print(e.message  + " : in file - " + e.filename + " at location :" + e.lineno + "," + e.colno);
                };
                this.oWorker.addEventListener("error",oInstance.defaultErrorListener);
                
                
                /**
                //currently this commented, but this can be used to keep track of list of listeners added and removed on worker.
                var oListeners = {};
                oWorker.onmessage = function(oEvent) {
                    if (oEvent.data instanceof Object || typeof oEvent.data === "string") {
                        oListeners[oEvent.type].call(oInstance, oEvent.data);
                    } else {
                        oInstance.defaultListener.call(oInstance, oEvent.data);
                    }
                };
                */

            },
			
            hasWorkerThreadSupport: function (){
		      if(typeof Worker === "undefined")
		    	  return false;
                 
		      return true;
		    }
        };
/**
This is wrapper function for native browser worker api postMessage method.
*/
kony.worker.WorkerThread.prototype.postMessage = function(vMsg) {
	if (vMsg === undefined || vMsg === null || vMsg === '') { 
		throw new KonyError(3001, "WorkerThreadError", "postMessage: MissingMandatoryParameter. Message undefined"); 
	}
	if (typeof vMsg === "number"  || typeof vMsg === "boolean" || typeof vMsg === "function"  ) {
		throw new KonyError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message"); 
	}
	try{
		Worker.prototype.postMessage.call(this.oWorker, vMsg);
	}catch(err){
		kony.print("Error occured in WorkerThread postMessage: "+err.message);
		throw new KonyError(3002, "WorkerThreadError", "postMessage: InvalidParameter. Invalid Message");
	}
};
/**
This is wrapper function for native browser worker api terminate method.
*/
kony.worker.WorkerThread.prototype.terminate = function() {
    Worker.prototype.terminate.call(this.oWorker);
};
/**
This is wrapper function for native browser worker api addEventListener method.
*/
kony.worker.WorkerThread.prototype.addEventListener = function(sName, fListener) {
	if(arguments.length < 2) {  
		throw new KonyError(3001, "WorkerThreadError", "addEventListener: MissingMandatoryParameter. Mandatory arguments missing");	// (errorcode, name, message)
	} 
	if (typeof arguments[0] != "string"  || typeof arguments[1] != "function") {
		throw new KonyError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments"); 
	} 
	if ( sName != "message" && sName != "error")  { 
		throw new KonyError(3002, "WorkerThreadError", "addEventListener: InvalidParameter. Invalid arguments"); 
	}
    fListener = fListener?fListener: this.defaultListener;    
    Worker.prototype.addEventListener.call(this.oWorker,sName,fListener,false);
    if("error" === sName){
        Worker.prototype.removeEventListener.call(this.oWorker,"error",this.defaultErrorListener,false);
    }
};
/**
This is wrapper function for native browser worker api removeEventListener method.
*/
kony.worker.WorkerThread.prototype.removeEventListener = function(sName,fListener) {
	if(arguments.length < 2) {  
		throw new KonyError(3001, "WorkerThreadError", "removeEventListener: MissingMandatoryParameter. Mandatory arguments missing");	// (errorcode, name, message)
	} 
	if (typeof arguments[0] != "string"  || typeof arguments[1] != "function") {
		throw new KonyError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments"); 
	} 
	if ( sName != "message" && sName != "error")  { 
		throw new KonyError(3002, "WorkerThreadError", "removeEventListener: InvalidParameter. Invalid arguments"); 
	}
    Worker.prototype.removeEventListener.call(this.oWorker,sName,fListener,false);
    if("error" === sName){
        Worker.prototype.addEventListener.call(this.oWorker,"error",this.defaultErrorListener,false);
    }
};