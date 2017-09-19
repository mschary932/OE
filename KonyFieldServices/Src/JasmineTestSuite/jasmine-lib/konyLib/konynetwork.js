$KI.net = {	

	postdataparams: function (postobj) {
	
		var postdata = "",value;

		for (var i in postobj ) {
		
		 	if (postobj.hasOwnProperty(i) && i != "httpheaders") {				
            	value = postobj[i];
            	kony.print("postdataparams:key  = " + i + "  value  =  " + value);
            	postdata += i + '=' + encodeURIComponent(value);
            	postdata += "&";
		 	}
		}	
		return postdata;
	},
	
	HttpRequest   : function (){
		var _openflag    = false
		, _requestMethod = null
		, _sendcount     = 0
		, that           = this
		, _xhr           = null
		, _xhrtimeout    = null;
		
		if(window.XMLHttpRequest) {
			_xhr = new XMLHttpRequest();
		} else {
			_xhr = new ActiveXObject ("Microsoft.XMLHTTP");
		}		
		
		that.onReadyStateChange = null;
		that.readyState         = undefined;
		that.response           = "";
		that.responseType       = "";
		that.status             = null;
		that.statusText         = null;
	    that.timeout            = 0; 

		_xhr.onreadystatechange = function() {
		    switch (_xhr.readyState)
			{
			    case 0 : // UNINITIALIZED
		        !!that.onReadyStateChange && that.onReadyStateChange();
				
				case 1 : // LOADING
				that.readyState  = _xhr.readyState;
				that.response    = "";
		        !!that.onReadyStateChange && that.onReadyStateChange();
				
				case 2 : // LOADED
				that.readyState  = _xhr.readyState;
				that.response    = "";
		        !!that.onReadyStateChange && that.onReadyStateChange();
				
				case 3 : // INTERACTIVE
				that.readyState  = _xhr.readyState;
				that.response    = "";
		        !!that.onReadyStateChange && that.onReadyStateChange();
                break;
				
				case 4 : // COMPLETED
				that.status      = _xhr.status;
				that.statusText  = "Request Completed";
			    that.readyState  = _xhr.readyState;
				that.response    = _xhr.responseText;
				if(_xhr.status === 200) {
				    that.statusText += ": OK";
				    clearTimeout(_xhrtimeout);
				}
				if(_xhr.status === 400) {
				    that.statusText += ": Error";
				    clearTimeout(_xhrtimeout);
				}
		        !!that.onReadyStateChange && that.onReadyStateChange();
				break;
				
				default:
                throw new Error("Unknown Error : XMLHttpRequest Error");
            }
		};
	
		that.timeoutFunction     = function () {
				that.abort();
			    that.readyState  = _xhr.readyState;
				that.status      = 0;
				that.statusText  = "Request timed out";
				that.response    = "";
		        !!that.onReadyStateChange && that.onReadyStateChange();
		};	

	    that.open               = function (requestMethod, url, async, username, password) {
		    if(!requestMethod && requestMethod !== "GET" && requestMethod !== "POST") {
			    throw new Error ("Syntax Error : Request Method is not defined");
				return;
			}
			if(!url) {
			    throw new Error ("Syntax Error : URL is not defined");
				return;
		    }
			async               = ((async === true) || (async === false) )&& async || true;
			_requestMethod      = requestMethod;
			_openflag           = true;
			_xhr.open(_requestMethod, url, async, username, password);
		};

		that.send               = function (data) {
		    if (_openflag === false) {
			    throw new Error("InvalidStateError : 'send' called before 'open' ");
				return;
			}
			
			if (_sendcount > 1) {
			    throw new Error("InvalidStateError : 'send' called more than once ");
				return;
			}
		    _sendcount++;
			_xhr.timeout = !!that.timeout && that.timeout;
			_xhrtimeout  = setTimeout(that.timeoutFunction, that.timeout);
			_xhr.send();
		};		
		
		that.abort              = function () {
		    _xhr.abort();
		};
		
		that.setRequestHeaders  = function (header, value){
			if (_openflag === false) {
			    throw new Error("InvalidStateError : 'setRequestHeaders' called before 'open' ");
				return;
			}
			if (_sendcount > 1) {
			    throw new Error("InvalidStateError : 'setRequestHeaders' called after 'send' ");
				return;
			}
			
			_xhr.setRequestHeader(header, value);
		    
		};
		that.getResponseHeader  = function (headerfield) {
		    return !!_xhr.getResponseHeader(headerfield) && _xhr.getResponseHeader(headerfield) || null;
		};
		that.getAllResponseHeaders = function() {
		    return !!_xhr.getAllResponseHeaders() && _xhr.getAllResponseHeaders() || null;
		};
	},
	sethttpheaders: function(ajaxobj, headers) {
	
	  	var headerdata = [], value, index = 0;	  	
	  	  	
	  	for (var i in headers) {
          	if (headers.hasOwnProperty(i) && headers[i]) {
          		value = headers[i] ? headers[i] : "";
                headerdata.push(i);
          		kony.print("sethttpheaders: key: " + i + "value: " + value);
          		ajaxobj.setRequestHeader(i, value);
          	}
	  	}                 	
	  	return headerdata;	
	},	
    
    loadJSFile: function(fileurl, async, callback) {
        var status = 0;
        var timeout = 30000;
        var options = {
			type : "GET",
			url  : fileurl,
			timeout : timeout,
			paramstr : null,
			callback : callback,
			info : ""
		};
		kony.print("loadJSFile: options: " + options);
        
        return (function ajax() {
			
			function invokecallback(callback) {
				if (callback) callback();
			};
			
			var requestDone = false;   // Keep track of when the request has been succesfully completed		
			var ajaxobj = new XMLHttpRequest();   //Request Object
			ajaxobj.open(options.type, options.url, async);
			ajaxobj.onLoaded = function() {	
				if(this.userCancelled) {
				 	kony.print(" onLoaded: on Abort Mission");
				  	this.onAbort();	
				}
			};
			
			ajaxobj.onInteractive = function() {
				if(this.userCancelled) {
					kony.print(" onInteractive: on Abort Mission");
				  	this.onAbort();	
				}
				else
					if (!this.firstByte) {
						this.firstByte = true;				
					}
			};
			
			// user abort
			ajaxobj.onAbort = function(transport){
				
				// Callback only when user cancelled explicitly
				kony.print(" onInteractive: <- Abort Mission");
				if (this.userCancelled) {

					this.userCancelled = false;
					this.ignoreCallback = true;
					rettable = {
						"opstatus": 1,
						"errcode": 1022,						
						"errmsg": "Request cancelled by user"
					};
					kony.print(" onInteractive: Abort Mission Success");
				}
				kony.print(" onInteractive: -> Abort Mission");
			};
			
			ajaxobj.onTimeout =  function(){	
			                                	
            	requestDone = true;		
            	rettable = {
            		"opstatus": 1,
            		"errcode": 1014,
            		"errmsg": "Request timed out"
            	};
				kony.print("Request timed out.");
			};
			
			ajaxobj.onreadystatechange = function() {
				// ReadyState values are mapped to kony network states expected.
				switch(!this.ignoreCallback && ajaxobj.readyState) {
				 	
				 	case 1:
				 		kony.print("onreadystatechange: ReadyState 1");
				 		ajaxobj.onLoaded(ajaxobj);
				 	break;
				 	
				 	case 2:
				 		kony.print("onreadystatechange: ReadyState 2");
				 		ajaxobj.onInteractive(ajaxobj);
				 	break;
				 	
				 	case 3:
				 		kony.print("onreadystatechange: ReadyState 3");
				 		ajaxobj.onAbort(ajaxobj);				
				 	break;
				 	
				 	case 4:                                            
				 		kony.print("onreadystatechange: ReadyState 4");                                                
				 		if (!requestDone ) {			
	                    	ajaxobj.onComplete(ajaxobj);
	                    	// Clean up after ourselves, to avoid memory leaks
	                    	ajaxobj = null;	
				 		}                   						                                        
				 	break;
				 	
				 	default:
				 		kony.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);	
				}		                                                                            						
			};
			
			ajaxobj.onComplete =  function(transport) {
				
				// Clear timeout
				window.clearTimeout(transport.timeoutid);
				kony.print("status: " + transport.status + "readystate: " + transport.readyState );

				this.firstByte = false;
				
				if(this.userCancelled) {
					kony.print(" onComplete: on Abort Mission");
				  	this.onAbort();	
				  	return;
				} 	
					
				if (transport.status == 200) {
					if (transport.responseText && transport.responseText.length > 0) {
                        
                        if(options.callback) 
                            options.callback(transport.responseText);
                        
						
					}
					// Empty response
					else {
						kony.print("errcode: 1013, No JS Code");
						rettable = {
							"opstatus": "1",
							"errcode": "1013",
							"errmsg": "Request returned no JS code"
						};
					}
				}
				else {
					//5XX - Server Error codes ref: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
				 	if (transport.status == 0 || (/5+/.test(transport.status.toString()) == true)) {
				 		kony.print("errcode: 1012, Request Failed");
				 		rettable = {
				 			"opstatus": 1,
				 			"errcode": "1012",
				 			"errmsg": "Request Failed"
				 		};
				 	}
				 	else {
				 		//4XX - Client Error codes
				 		if (/4+/.test(transport.status.toString()) == true) {
					 		kony.print("errcode: 1012, Request Failed");
					 		rettable = {
					 			"opstatus": 1,
					 			"errcode": "1015",
					 			"errmsg": "Request Failed"
					 		};
					 	} 	
					 	else {
				 			 if (transport.responseText != "") {
				 				kony.print("Status != 200 but response exists");
				 				rettable = transport.responseText;
				 			}
				 			else 
				 				kony.print("Empty response received.");
					 	} 
					}			 		
				}				
			};
			
			// Initalize a callback which will fire 60 seconds from now, cancelling the request (if it has not already occurred).
			ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
			ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");   
			//User setting headers explicitly
			if (typeof(headerobj) == "object") 
				options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
			
			// Establish the connection to the server
			ajaxobj.send(options.paramstr);	
			
			return ajaxobj;
		})();

    },
	
	invokeserviceasync: function(posturl, postdata, Callback, info,method, timeout) {
	
		var status = 0;
		var rettable = null;
		var usertimeout = timeout || 60000; //60 secs is the default value assumed	
		var origin = window.location.protocol + "//" + window.location.host;
		var proxyurl = "";
		var postorigin = "";
		var appmode = $KG["appmode"]; 
		var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";
		
		kony.print("invokeServiceAsync<- " + posturl);
		kony.print("middlewarecontext<- " + middlewarecontext);
		if(appmode == constants.APPLICATION_MODE_NATIVE) {
					
			var i = posturl.indexOf(middlewarecontext);	
			if (i != -1) {
				postorigin = posturl.slice(0, i);
			}
			//origin & middleware url are similar so proxy is skipped.
			if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin,postorigin) && posturl)) {
				proxyurl = origin + "/" + middlewarecontext + "/MWServlet";		//When skipping proxy the posturl is ignored and url to be hit is as assigned		
			} else {
				proxyurl = origin + "/" + $KG["appid"] + "/spa";
				kony.print("using proxy: URL " + proxyurl);
				
				if (postdata) {
					postdata["_desturl"] = posturl;
				} else {
					postdata = {};
					postdata["_desturl"] = posturl;
					kony.print("Without postdata " + posturl);
				}
			}
			postdata["rcid"] = $KG["rcid"] || "" ;
		}
			
		var headerobj = postdata && postdata["httpheaders"];
		var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";
				
		kony.print("invokeServiceAsync: URL: " + posturl);
		kony.print("invokeServiceAsync: Args are: " + postdatastr);
		kony.print("middleware origin: " + postorigin);
		kony.print("location origin: " + origin);
		
		//added for PaaS
		if(posturl && posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1)
		{
			proxyurl = posturl;
		} else if(posturl){
			var anchor = document.createElement('a');
			anchor.href = posturl;
			if(anchor.origin == origin){
			    proxyurl = posturl;
			}
        }		
		
		if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
			proxyurl = posturl;
			kony.print("!!!!!!!!!!appmode hybrid/wrapper: " +  proxyurl);
		}
		
		var httpconfig = postdata && postdata["httpconfig"];
		if(httpconfig && httpconfig.timeout && !isNaN(httpconfig.timeout))
			usertimeout = parseInt(httpconfig.timeout)*1000;
		
		var options = {
			type : "POST",
			url  : proxyurl,
			timeout : usertimeout,
			paramstr : postdatastr,
			callback : Callback,
			info : info	|| null
		};
        
		if(method && typeof method != "undefined" && "GET".toLowerCase() === method.toLowerCase()){
            options.type = "GET";
            options.url = options.url+"?"+postdatastr;
        }
        
		kony.print("invokeServiceAsync: options: " + options);
		kony.system.activity.increment();
		
		return (function ajax() {
			
			function invokecallback(callback, status, rettable, info) {
                if(status==300 || status==400)
                    kony.system.activity.decrement();
                if (!kony.system.activity.hasActivity()) {
                    if(typeof $KW !== "undefined") {
                        $KW.Utils.removeBlockUISkin();
                        $KW.unLoadWidget();
                    }
                }
				// Execute callback(status, resultset)
				if (callback) {
				 	callback(status, rettable, info);
				}	
			};
			
			var requestDone = false;   // Keep track of when the request has been succesfully completed		
			var ajaxobj = new XMLHttpRequest();   //Request Object
			ajaxobj.open(options.type, options.url, true);
			ajaxobj.onLoaded = function() {	
				if(this.userCancelled) {
				 	kony.print(" onLoaded: on Abort Mission");
				  	this.onAbort();	
				}
				else
                	invokecallback(options.callback, 100, null);
			};
			
			ajaxobj.onInteractive = function() {
				if(this.userCancelled) {
					kony.print(" onInteractive: on Abort Mission");
				  	this.onAbort();	
				}
				else
					if (!this.firstByte) {
						this.firstByte = true;				
						invokecallback(options.callback, 200, null);
					}
			};
			
			// user abort
			ajaxobj.onAbort = function(transport){
				
				// Callback only when user cancelled explicitly
				kony.print(" onInteractive: <- Abort Mission");
				if (this.userCancelled) {

					this.userCancelled = false;
					this.ignoreCallback = true;
					rettable = {
						"opstatus": 1,
						"errcode": 1022,						
						"errmsg": "Request cancelled by user"
					};
					invokecallback(options.callback, 300, rettable);
					kony.print(" onInteractive: Abort Mission Success");
				}
				kony.print(" onInteractive: -> Abort Mission");
			};
			
			ajaxobj.onTimeout =  function(){
			   if(ajaxobj.userCancelled) {
				  	ajaxobj.onAbort();
				}
				else {
                    requestDone = true;
                    rettable = {
                        "opstatus": 1,
                        "errcode": 1014,
                        "errmsg": "Request timed out"
                    };
                    invokecallback(options.callback, 400, rettable);
                }
			};
			
			ajaxobj.onreadystatechange = function() {
				// ReadyState values are mapped to kony network states expected.
				switch(!this.ignoreCallback && ajaxobj.readyState) {
				 	
				 	case 1:
				 		kony.print("onreadystatechange: ReadyState 1");
				 		ajaxobj.onLoaded(ajaxobj);
				 	break;
				 	
				 	case 2:
				 		kony.print("onreadystatechange: ReadyState 2");
				 		ajaxobj.onInteractive(ajaxobj);
				 	break;
				 	
				 	case 3:
				 		kony.print("onreadystatechange: ReadyState 3");
				 		ajaxobj.onAbort(ajaxobj);				
				 	break;
				 	
				 	case 4:                                            
				 		kony.print("onreadystatechange: ReadyState 4");                                                
				 		if (!requestDone ) {			
	                    	ajaxobj.onComplete(ajaxobj);
	                    	// Clean up after ourselves, to avoid memory leaks
	                    	ajaxobj = null;			//TODO: Verify with proper results from network , commented because we are getting 3 callbacks in error scenarios instead of 2
				 		}                   						                                        
				 	break;
				 	
				 	default:
				 		kony.print("onreadystatechange: ReadyState Invalid: " + ajaxobj.readyState);	
				}		                                                                            						
			};
			
			ajaxobj.onComplete =  function(transport) {
				
				// Clear timeout
				window.clearTimeout(transport.timeoutid);
				kony.print("status: " + transport.status + "readystate: " + transport.readyState + "res: " + transport.response);

				this.firstByte = false;
				
				if(this.userCancelled) {
					kony.print(" onComplete: on Abort Mission");
				  	this.onAbort();	
				  	return;
				} 	
					
				if (transport.status == 200) {
					if (transport.responseText && transport.responseText.length > 0) {
						//kony.print(" onComplete: JSON obj: " + transport.responseText);
						rettable = transport.responseText;
						if(IndexJL == 1) 
							rettable = $KU.convertjsontoluaobject(rettable);
						else 
							rettable = JSON.parse(rettable);

						//kony.print(" onComplete: Lua obj: " + JSON.stringify(rettable));
	
					}
					// Empty response
					else {
						kony.print("errcode: 1013, Invalid JSON string");
						rettable = {
							"opstatus": "1",
							"errcode": "1013",
							"errmsg": "Middleware returned invalid JSON string"
						};
					}
				}
				else {
					//5XX - Server Error codes ref: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
					// Windows Mango IE9 returns status code 12200 for network error
				 	if (transport.status == 0 || transport.status == 12200 || (/5+/.test(transport.status.toString()) == true)) {
				 		if(typeof navigator.onLine !== "undefined" && !navigator.onLine){
							kony.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
							rettable = {
								"opstatus": 1,
								"errcode": "1011",
								"errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
							};
						}else{
							kony.print("errcode: 1012, Request Failed");
							rettable = {
								"opstatus": 1,
								"errcode": "1012",
								"errmsg": "Request Failed"
							};
						}
				 	}
				 	else {
				 		//4XX - Client Error codes
				 		if (/4+/.test(transport.status.toString()) == true) {
					 		kony.print("errcode: 1015, Cannot find host");
					 		rettable = {
					 			"opstatus": 1,
					 			"errcode": "1015",
					 			"errmsg": "Cannot find host"
					 		};
					 	} 	
					 	else {
				 			 if (transport.responseText != "") {
				 				kony.print("Status != 200 but response exists");
				 				rettable = transport.responseText;
				 			}
				 			else 
				 				kony.print("Empty response received.");
					 	} 
					}			 		
				}				
				invokecallback(options.callback, 400, rettable, options.info);
			};
			
			// Initalize a callback which will fire 60 seconds from now, cancelling the request (if it has not already occurred).
			ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
			//User setting headers explicitly
            if (typeof(headerobj) == "object") {
                if(options.url.indexOf("/spa") > 0){
                    ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var contentType  = headerobj["Content-Type"];
                    if(typeof contentType != "undefined")
                        delete headerobj["Content-Type"];
                }else{
                    if(typeof headerobj["Content-Type"] == "undefined"){
                        headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                    }
                }
                options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
                if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0){
                    if(typeof contentType != "undefined"){
                        options.httpheaders["Content-Type"]=contentType;
                    }
                  options.paramstr=options.paramstr+"kCustomHeaders="+options.httpheaders;
                }
            }

			
            if("POST".toLowerCase() === (options.type).toLowerCase()){
			// Establish the connection to the server
			ajaxobj.send(options.paramstr);	
			}else{
                ajaxobj.send();
            }
            
			return ajaxobj;
		})();
		kony.print("invokeServiceAsync-> ");
	},
    /* added support for invokeService api as a part of newnetworkapi */
	invokeService: function(posturl, postdata, Callback, info, timeout) {
	
		var status = 0;
		var rettable = null;
		var usertimeout = timeout || 60000; //60 secs is the default value assumed	
		var origin = window.location.protocol + "//" + window.location.host;
		var proxyurl = "";
		var postorigin = "";
		var appmode = $KG["appmode"]; 
		var middlewarecontext = $KI.props.getProperty(null, 'appmiddlewarecontext') || ((typeof appConfig != "undefined") && appConfig && appConfig.middlewareContext) || ((typeof config != "undefined") && config && config.middlewarecontext) || "middleware";
		
		kony.print("invokeServiceAsync<- ");
		if(appmode == constants.APPLICATION_MODE_NATIVE) {
					
			var i = posturl.indexOf(middlewarecontext);	
			if (i != -1) {
				postorigin = posturl.slice(0, i);
			}
			//origin & middleware url are similar so proxy is skipped.
			if($KG["skipproxy"] || ($KI.net.checkOriginandPostOrigin(origin,postorigin) && posturl)) {
				proxyurl = origin + "/" + middlewarecontext + "/MWServlet";		//When skipping proxy the posturl is ignored and url to be hit is as assigned		
			} else {
				proxyurl = origin + "/" + $KG["appid"] + "/spa";
				kony.print("using proxy: URL " + proxyurl);
				
				if (postdata) {
					postdata["_desturl"] = posturl;
				} else {
					postdata = {};
					postdata["_desturl"] = posturl;
					kony.print("Without postdata " + posturl);
				}
			}
			postdata["rcid"] = $KG["rcid"] || "" ;
		}
			
		var headerobj = postdata && postdata["httpheaders"];
		var postdatastr = (postdata && $KI.net.postdataparams(postdata)) || "";
		
		//added for PaaS
		if(posturl.indexOf("/IST") != -1 || posturl.indexOf("/CMS") != -1)
		{
			proxyurl = posturl;
		}		
		
		kony.print("invokeServiceAsync: URL: " + posturl);
		kony.print("invokeServiceAsync: Args are: " + postdatastr);
		kony.print("middleware origin: " + postorigin);
		kony.print("location origin: " + origin);
		
		if(appmode == constants.APPLICATION_MODE_HYBRID || appmode == constants.APPLICATION_MODE_WRAPPER) {
			proxyurl = posturl;
			kony.print("!!!!!!!!!!appmode hybrid/wrapper: " +  proxyurl);
		}
		
		var options = {
			type : "POST",
			url  : proxyurl,
			timeout : usertimeout,
			paramstr : postdatastr,
			callback : Callback,
			info : info	|| null
		};
		
		kony.system.activity.increment();
		
        
        var requestDone = false;   // Keep track of when the request has been succesfully completed		
        var ajaxobj = new XMLHttpRequest();   //Request Object
        ajaxobj.open(options.type, options.url, false);
        ajaxobj.timeoutid = setTimeout(ajaxobj.onTimeout, options.timeout);
        if (typeof(headerobj) == "object") {
            if(options.url.indexOf("/spa") > 0){
                ajaxobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var contentType  = headerobj["Content-Type"];
                if(typeof contentType != "undefined")
                    delete headerobj["Content-Type"];
            }else{
                if(typeof headerobj["Content-Type"] == "undefined"){
                    headerobj["Content-Type"] = "application/x-www-form-urlencoded";
                }
            }
            options.httpheaders = $KI.net.sethttpheaders(ajaxobj, headerobj);
            if(options.httpheaders.length > 0 && options.url.indexOf("/spa") > 0){
                if(typeof contentType != "undefined"){
                    options.httpheaders["Content-Type"]=contentType;
                }
              options.paramstr=options.paramstr+"kCustomHeaders="+options.httpheaders;
            }
        }
			
			// Establish the connection to the server
			ajaxobj.send(options.paramstr);	
        
        // Clear timeout
				window.clearTimeout(ajaxobj.timeoutid);
				kony.print("status: " + ajaxobj.status + "readystate: " + ajaxobj.readyState + "res: " + ajaxobj.response);
					
				if (ajaxobj.status == 200) {
					if (ajaxobj.responseText && ajaxobj.responseText.length > 0) {
						kony.print(" onComplete: JSON obj: " + ajaxobj.responseText);
						rettable = ajaxobj.responseText;
						if(IndexJL == 1) 
							rettable = $KU.convertjsontoluaobject(rettable);
						else 
							rettable = JSON.parse(rettable);

						kony.print(" onComplete: Lua obj: " + JSON.stringify(rettable));
	
					}
					// Empty response
					else {
						kony.print("errcode: 1013, Invalid JSON string");
						rettable = {
							"opstatus": "1",
							"errcode": "1013",
							"errmsg": "Middleware returned invalid JSON string"
						};
					}
				}
				else {
					//5XX - Server Error codes ref: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
                    if (ajaxobj.status == 0 || (/5+/.test(ajaxobj.status.toString()) == true)) {
				 		if(typeof navigator.onLine !== "undefined" && !navigator.onLine){
							kony.print("errcode: 1011, Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity.");
							rettable = {
								"opstatus": 1,
								"errcode": "1011",
								"errmsg": "Device has no WIFI or mobile connectivity. Please try the operation after establishing connectivity."
							};
						}else{
							kony.print("errcode: 1012, Request Failed");
							rettable = {
								"opstatus": 1,
								"errcode": "1012",
								"errmsg": "Request Failed"
							};
						}
				 	}
				 	else {
				 		//4XX - Client Error codes
                        if (/4+/.test(ajaxobj.status.toString()) == true) {
					 		kony.print("errcode: 1015, Cannot find host");
					 		rettable = {
					 			"opstatus": 1,
					 			"errcode": "1015",
					 			"errmsg": "Cannot find host"
					 		};
					 	} 	
					 	else {
				 			 if (ajaxobj.responseText != "") {
				 				kony.print("Status != 200 but response exists");
				 				rettable = ajaxobj.responseText;
				 			}
				 			else 
				 				kony.print("Empty response received.");
					 	} 
					}			 		
				}
	if(typeof $KW !== "undefined") {
         $KW.Utils.removeBlockUISkin();
                    $KW.unLoadWidget();
	}
        
         return rettable;
	},
			
	cancel: function(nwhndl)  {
		kony.print("networkcancel<- ");
		// Ignore nil
		if(nwhndl)
		{
			// Ignore invalid params
			nwhndl.userCancelled = true;
			nwhndl.abort();
			kony.print("Request aborted on user request");
			/*if(nwhndl.transport)
			{
				//nwhndl.transport.userCancelled = true;
				
			}*/
		}
		kony.print("networkcancel-> ");
	},
    checkOriginandPostOrigin: function(origin,postorigin) {
	 	return origin.replace(/([^=]*):(80|443){1}(.*)/,'$1$3') == postorigin.replace(/([^=]*):(80|443){1}(.*)/,'$1$3') ? true : false;
	},
   /**
	*  added isNetworkAvailable, setNetworkCallbacks, getActiveNetworkType methods as part of newnetworkapi.
	*  updated as per api docs.
	*/
    isNetworkAvailable : function(connectionType){
            if(!!connectionType)
			{
			    if(connectionType === constants.NETWORK_TYPE_ANY) {
                    if(typeof navigator.onLine !== "undefined") {
				        return navigator.onLine;
				    } else {
				        return false;
				    }
                } else if(connectionType === constants.NETWORK_TYPE_3G || connectionType === constants.NETWORK_TYPE_WIFI || connectionType === constants.NETWORK_TYPE_ETHERNET){
				    return false;
				} else {
                    throw new Error("Invalid Network Type");
				}
			} else {
                throw new Error("Invalid Network Type");
			}
    },
    setNetworkCallbacks: function(config){
            if( config && config.statusChange)
            {
			    if(typeof window.ononline === "object") {
				    window.addEventListener("online", function(){ config.statusChange(navigator.onLine)}, false); 
				}
				if(typeof window.onoffline === "object") {
				    window.addEventListener("offline",function(){ config.statusChange(navigator.onLine)}, false); 
				}
            }
            else
            {
                throw new Error("Invalid Input : config is not of valid type");
            }
        },
    getActiveNetworkType: function() {
		if(typeof navigator.onLine === "undefined") {
			return constants.NETWORK_TYPE_ANY;
		} else {
			if(navigator.onLine) {
				return constants.NETWORK_TYPE_ANY;
			} else 
				return null;
		}
    }		
};

/* Usage: $KI.props.getProperty(key) / $KI.props.getProperty('appmiddlewarecontext')
 * _konyAppProperties : Global JSON object contains properties from <appid>.properties file
 */
$KI.props = {
	getProperty: function(group, key){
		if( typeof _konyAppProperties != "undefined" && _konyAppProperties  != null && key)
			return _konyAppProperties[key] || null;
	}
};


