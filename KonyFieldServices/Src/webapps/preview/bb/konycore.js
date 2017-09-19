/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if (kony === undefined)
    var kony = {
        mode : "w", //s-standalone or w-web
        runmode: "d", //d-debug or r-release
        version : {
                    verNo: "3.0",
                    verDate: "03/jan/2011",
                    printVersion: function()
                    {
                        //kony.print("Kony Labs Mobile JS Framework \nVersion No: " + this.verNo + "\nVersion Date: " + this.verDate);
                    }
                  },

        globals : {},

        addGlobal : function(key, value)
        {
            this.globals[key] = value;
        },

        getGlobal : function(key)
        {
            return this.globals[key];
        },

        removeGlobal : function(key)
        {
            delete this.globals[key];
        }


    };

var global = this;

/**
 * A Generic Print Statement which checks the mode of the operation and call the native print statements.
 */

kony.print = function()
{
    if (kony.runmode === "d")
    {
        if (kony.mode === "s") print(arguments[0]);
        else
            alert(arguments[0]);
    }
}


kony.constants = {

    KONY_CACHE_ID: "cacheid",

    KONY_NODE_ID: "node",

    KONY_WIDGET_TYPE: "konywidgettype",

    KONY_FORM_ACTION: "action",

    KONY_REGISTERED_EVENT_MAP: "registeredeventmap",

    KONY_EVENT : "event",

    KONY_EVENT_NAME : "eventname",

    KONY_CLICK_EVENT : "click",

    KONY_SELECT_EVENT : "select",

    KONY_ENABLE_TIME_OUT: "enabletimeout",

    REGISTER_TIME_OUT: "registertimeout",

    SELECTED_ITEM : "selecteditem",

    KONY_BLOCK_UI_SKIN: "kblockinskin",

    KONY_IPHONE_PLATFORM:"iphone",

    KONY_ANDROID_PLATFORM:"android",

    KONY_PALM_PLATFORM:"palm",

    KONY_ADV_BB_PLATFORM:"bb",

    KONY_TOUCH_WIDGET_CONTEXT_MAP : "touchwidgetcontextmap",

    PRE_JS_EVENT:"prejsevent",

    POST_JS_EVENT:"postjsevent",

    FORM_ONLOAD_JS:"formonloadjs",

    FORM_UNLOAD_JS:"formunloadjs",
    
    KONY_REGISTERED_WIDGET_LIST : "registeredwidgetlist",
    
    KONY_REGISTERED_TOUCH_ELEMENTS_LIST : "registeredtouchelementslist",
    
    PREVENT_PRE_POST:"preventprepost"

};

kony.data = {

    /**
     * Iterate thru various form elements and include them as a part of the args to the AJAX request
     */
    encodeFormData : function()
    {

        function captureElementData(currentForm, elementType)
        {
            var elementData = [];
            var elements = currentForm.getElementsByTagName(elementType);
            for(var i=0; i<elements.length; i++)
            {
                if (elements[i].name)
                {
                    // Handle CheckBox & Radio Button Data
                    //encodeURIComponent is used to encode a Uniform Resource Identifier (URI) component
                    //by replacing each instance of certain characters by one, two, or three escape sequences
                    //representing the UTF-8 encoding of the character.
                    //SUMA:July22,2011 Added this change as part of bug fixes 25345 and 25099 to prevent the characters truncation after &
                    //as & is not encoded it is being treated as request parametrs and hence chars after that r being ignored
                    if((elements[i].type === "radio" || elements[i].type === "checkbox") && elements[i].checked)
                    {
                        elementData.push(elements[i].name + "=" + encodeURIComponent(elements[i].value));
                    }
                    else if (elements[i].type == "select-multiple")
                    {
                            var selected = new Array();
                            var optionsArray = elements[i].options;
                            var option = null;
                            for(var j=0, size = optionsArray.length; j < size; j++)
                            {
                                option = optionsArray[j];
                                if(option.selected){
                                    selected.push(j);
                                }
                            }
                            elementData.push(elements[i].name + "=" + (selected.toString()));
                    }
                    //SUMA:July22,2011 Added this change as part of bug fixes 25345 and 25099 to prevent the characters truncation after &
                    //as & is not encoded it is being treated as request parametrs and hence chars after that r being ignored
                    else if (elements[i].name && elements[i].type != "submit" && elements[i].type != "radio"  && elements[i].type != "checkbox")
                    {
                         elementData.push(elements[i].name + "=" + encodeURIComponent(elements[i].value));
                    }
                }
            }
            return elementData;

        }

        var konyElement = new kony.dom.Element();
        var currentForm = konyElement.getCurrentForm();
        if (currentForm)
        {
            var args=[];
            var tempArray = captureElementData(currentForm, "input");
            args = args.concat(tempArray);

            tempArray = captureElementData(currentForm, "select");
            args= args.concat(tempArray);

            tempArray = captureElementData(currentForm, "textarea");
            args = args.concat(tempArray);
            //added for textarea
        }
        return args;

    },


    /**
     *  capture generic information like the formid, cacheid,nodeid for inclusion into the request to be sent to
     *  the server.
     */
    encodeGenericData : function()
    {
        var args=[];

        var formid =  document.getElementsByName("formid");
        if(formid)
        {
            args.push("formid=" +  formid[formid.length-1].getAttribute("value"));
        }

        var category = document.getElementsByName("cat");
        if(category && category.length > 0 )
        {
            args.push("cat=" +  category[category.length-1].getAttribute("value"));
        }

        var cacheid = document.getElementsByName("cacheid");
        if(cacheid && cacheid.length > 0)
        {
            args.push("cacheid=" +  cacheid[cacheid.length-1].getAttribute("value"));
        }
        
        var krfid = document.getElementsByName("krfid");
        if(krfid && krfid.length > 0)
        {
            args.push("krfid=" +  krfid[krfid.length-1].getAttribute("value"));
        }

        var node = document.getElementsByName("node");
        if(node && node.length > 0)
        {
            args.push("node=" +  node[node.length-1].getAttribute("value"));
        }

        //Murty Sep, 19 2011 : Added to support phone location when using from segment & share location confirmation in the same page
        var kffi = document.getElementsByName("kffi_mylocation");
        if(kffi && kffi.length > 0)
        {
            args.push("kffi_mylocation=" +  kffi[kffi.length-1].getAttribute("value"));
        }
        return args;
    },




    /**
     *  capture tab widget specific information for inclusion into the request to be sent to
     *  the server.
     */
    encodeWidgetData : function(parentobj,addType,excludeTabView)
    {
        var genericArgs=[];

        genericArgs = this.encodeGenericData();

        if(addType){
            var wttype = parentobj.getAttribute("konywidgettype");
            genericArgs.push("wttype=" + wttype);

            var imggalid = parentobj.getAttribute("id");
            genericArgs.push("wid=" + imggalid);

            genericArgs.push("rtype=" + "01");
            genericArgs.push("kws=" + "true");
        }

        if(!excludeTabView){
            var tabview = document.getElementsByName("tabview");
            if(tabview && tabview.length > 0){
                genericArgs.push("tabview=" +  tabview[tabview.length-1].getAttribute("value"));
            }
        }


        return genericArgs;
    },

    /**
     *  capture widget specific information for inclusion into the request to be sent to
     *  the server.
     */
    encodeGenericWidgetData : function(widget)
    {
        var genericArgs=[];

        genericArgs = this.encodeGenericData();

        var wttype = widget.getAttribute("konywidgettype");
        genericArgs.push("wttype=" + wttype);

        var imggalid = widget.getAttribute("id");
        genericArgs.push("wid=" + imggalid);

        genericArgs.push("rtype=" + "01");
        genericArgs.push("kws=" + "true");

        return genericArgs;
    },
    /* Sumanth: Oct , 2011: Added this fuction to pass hidden fields in case of alert ok or cancel.*/
    encodeHiddenFields : function(args){
    	
    	var inputeles = document.getElementsByTagName("input");
    	if(inputeles && inputeles.length > 0){
    		if(!args){
    			args = {};
    		}
    		var name,ele;
    		for(var i = 0; i < inputeles.length;i++){
    			ele = inputeles[i];
    			//Add only elements which are hidden and name as hidden_ prefix (used for private hiddenfields).
    			if(ele.getAttribute("type") == "hidden"){
    				name = ele.getAttribute("name")
    				if(name && name.indexOf("hidden_") == 0){    				
    					args.push(ele.name+"="+ele.value);
    				}
    			}
    		}
    	}
    	return args;
    }


}

/**
 * Profile of the device. This will provide information about which category of the device on which
 * the application is running and also what its image category (size) is.
 *
 * // This should be loaded as a part of the initial page load
 */
kony.device = {
        profile : {
            markup : "",
            deviceWidth : "",
            imageCategory : "",
            deviceId : "",
            userAgent : ""
        }
}

kony.net = {

    HTTP_GET_METHOD : "GET",

    HTTP_POST_METHOD: "POST"

}


kony.net.ajax = {

 /**
 * All ways make sure that on single instance of the AJAX request object is returned.
 *
 */
 XMLHTTPFACTORIES : [
    function () {return new XMLHttpRequest();},
    function () {return new ActiveXObject("Msxml2.XMLHTTP");},
    function () {return new ActiveXObject("Msxml3.XMLHTTP");},
    function () {return new ActiveXObject("Microsoft.XMLHTTP");}],


 AJAXREQUEST : null,

 AjaxConfig: function (url, method, async)
 {
    this.url  = url;
    this.method = method;
    this.async = async;
 },

 AjaxResponse: function(status, responseText)
 {
     this.requestStatus = status;
     this.responseText = responseText;
 },

/**
 * The signatures for the ajax response call back handlers should accept the ajaxRequest object and postResponseHandler
 * function that performs actions once the reponse is received.
 */
 ajaxCallBack : function(ajaxRequest, postResponseHandler,eventSource)
 {
    var response;
    try
    {
        if (ajaxRequest.readyState === 4)
        {
            response = new this.AjaxResponse(ajaxRequest.status, ajaxRequest.responseText);
			/* Sumanth July 28, 2011: Added to check if response from ajax or through browser request. */
            kony.net.ajax.ajaxresponse = true;
            
            //Shanker Jan 8, 2014: Capturing postOnClickJS before handling response for IE [eventSource getting refreshed for IE after responseHandler]
            var postJS = null;
            var targetid = null;
            var userAgentIE = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
            if(userAgentIE && eventSource)
            {
            	var domElement = new kony.dom.Element();
            	var target = kony.ffi.getTarget(eventSource);
    			targetid = domElement.getAttributeValueNS(target, "id");  
    			postJS = domElement.getAttributeValueNS(target, kony.constants.POST_JS_EVENT);
            }
            if (postResponseHandler)
               postResponseHandler(response,eventSource,this);
            else
               this.genericPostResponseHandler(response,eventSource);
           
          //Murty Nov 23, 2011 When there is a post js event associated to any of the widgets execute it after response handled,
            kony.ffi.postJSEvent(eventSource, response, postJS, targetid, userAgentIE);
        }
    }
    catch(e)
    {
        response = new this.AjaxResponse("999", "Error encounterd");
        throw response;
    }
 },

 openReq: function(ajaxConfig, params, preRequestHandler, postResponseHandler,eventSource)
 {
    var ajaxRequest = this.getHTTPRequest();

    if (preRequestHandler)
        preRequestHandler();


    ajaxRequest.onreadystatechange = function() {kony.net.ajax.ajaxCallBack(ajaxRequest, postResponseHandler,eventSource);}

    if (params)
    {
    	//this.appendRandomNumber(ajaxConfig);
        var paramStr = params.join("&");
        if (ajaxConfig.method == this.HTTP_GET_METHOD)
        {
           ajaxConfig.url += "&" + paramStr;
        }
        // kony.print(ajaxConfig.method);
        // kony.print(ajaxConfig.url);
        ajaxRequest.open(ajaxConfig.method, ajaxConfig.url, true);

    }
    else
    {
        ajaxRequest.open(ajaxConfig.method, ajaxConfig.url, true);
    }

    if(paramStr){
        paramStr=paramStr+"&ajax=true";
    }else{
        paramStr="ajax=true";
    }

    ajaxRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajaxRequest.send(paramStr);

 },

 getHTTPRequest: function()
 {
    if (kony.net.ajax.AJAXREQUEST) return kony.net.ajax.AJAXREQUEST;
    var factories = kony.net.ajax.XMLHTTPFACTORIES;
    for(var i=0; i<factories.length; i++)
    {
        try {
                kony.net.ajax.AJAXREQUEST = factories[i]();

        }
        catch (e) {
                continue;
        }
        return kony.net.ajax.AJAXREQUEST;
    }
 },

 genericPostResponseHandler: function(ajaxResponse,eventSource)
 {
    if((ajaxResponse.requestStatus >= 200 && ajaxResponse.requestStatus < 300 ) || ajaxResponse.requestStatus == 304 )
    {

        if (ajaxResponse.responseText.indexOf("konyalert", 0) != -1)
        {
           kony.system.action.handleAlertAction(ajaxResponse.responseText);
        }
        else if (ajaxResponse.responseText.indexOf("konysecurecall", 0) != -1)
        {
            kony.system.action.handleKonySecureCallAction(ajaxResponse.responseText);
        }
        else if(ajaxResponse.responseText.indexOf("konypopup", 0) != -1)
        {
           // processPopup(ajaxResponse.responseText,eventSource);
           kony.system.action.handlePopupAction(ajaxResponse.responseText, eventSource);
        }
        else if (ajaxResponse.responseText.indexOf("konynewwindow", 0) != -1)
        {
            kony.system.action.handleKonyOpenURL(ajaxResponse.responseText);
        }
        else if (ajaxResponse.responseText.indexOf("konyjsonresponseforwidget") != -1)
        {
           kony.system.action.handleJSONResponse(ajaxResponse.responseText, eventSource);
        }
        else if (ajaxResponse.responseText.indexOf("konyhybridcall", 0) != -1)
        {
            konyhybrid.handleKonyHybridCallAction(ajaxResponse.responseText);
        }
        else
        {
            kony.system.action.handleValidResponseAction(ajaxResponse.responseText);
        }
    }
    else
    {   
        kony.widgets.Utils.removeBlockUISkin();
        if(ajaxResponse.requestStatus == 500 && ajaxResponse.responseText.indexOf("WidgetNotExistError:") != -1)
        {
        	kony.system.action.handleValidResponseAction(ajaxResponse.responseText);
        }
    }

 },
	/* Sumanth July 28, 2011: Added to check if response from ajax or through browser request. */
 	ajaxresponse : false
 	,
 	/**
 	 * June 21, 2011 Sumanth Divvela:Added random number to not get content from cache.
 	 */
 	appendRandomNumber : function (ajaxConfig){
 		var href = ajaxConfig.url;
 		if(href){
 	        //Added random number to not get content from cache.
 	        href = href.substring(0, href.lastIndexOf('/'));
 	       ajaxConfig.url = href + '/' + Math.random()*100;
 		}
 	}

}

kony.dom = {

    Element : function()
    {
        this.DOM = window.document || null;

        this.getBody = function ()
        {
            var element = this.DOM.getElementsByTagName("body");
            if (!element)
                return null;
            else
                return element[0];
        };

        this.getCurrentForm = function()
        {
            var forms = this.getElementsByTagName("form");
            if (forms)
            {
                return forms[forms.length -1];
            }
        };
        /**
         * returns nth form in body.
         */
        this.getForm = function(n)
        {
            var forms = this.getElementsByTagName("form");
            if (forms && forms.length >= n)
            {
                return forms[n-1];
            }
        };

        this.getCurrentPlatform = function()
        {
            var currentPlatform=this.DOM.getElementByNameNS("cat");
            var platform=null;
            if(currentPlatform){
                platform=currentPlatform.getAttribute("value");
            }
            return platform;
        };

        this.getElementByNameNS = function(elementName)
        {
             var element = this.DOM.getElementsByName(elementName);
             if (element && element.length > 0)
             return element[0];
        }

        this.getElementByIDNS =  function(elementID)
        {
            var element  = this.DOM.getElementById(elementID);
            if (!element) return null;
            else
                return element;
        };

        this.getElementsByTagName = function(elementName)
        {
            var elements = this.DOM.getElementsByTagName(elementName);
            if (!elements)
            {
                return null;
            }
            else
                return elements;
        };

        this.getHiddenField = function(hiddenFieldID)
        {
            var hiddenElement = this.DOM.getElementsByName(hiddenFieldID);

            return hiddenElement[0];
        };

        this.getAttributeValue = function(elementID, attributeID)
        {
            var element = this.DOM.getElementById(elementID);
            if (element)
            {
                var attributeVal = element.getAttribute(attributeID);
                if (attributeVal)
                    return attributeVal
                else
                    return null;
            }
            return null;
        };

        this.getAttributeValueNS = function(element, attributeID)
        {
            if (element && element.getAttribute)
            {
                    var attributeVal = element.getAttribute(attributeID);
                    if (attributeVal)
                        return attributeVal
                    else
                        return null;
            }
            return null;
        };

        this.getParent = function(node, localName)
        {
            while (node && (node.nodeType != 1 || node.localName.toLowerCase() != localName))
                node = node.parentNode;
            return node;
        };

        this.getEventTarget = function(eventElement)
        {
            var t = eventElement.target || eventElement.srcElement;
            return (t.nodeType == this.DOM.TEXT_NODE)?t.parentNode:t;
        };

        this.addHiddenField = function(formID, elementID, elementVal)
        {
            formID = formID || this.getCurrentForm();

            if (formID)
            {
                var hiddenElement = this.DOM.createElement("input");
                hiddenElement.setAttribute("type","hidden");
                hiddenElement.setAttribute("name",elementID);
                hiddenElement.setAttribute("value",elementVal);
                formID.appendChild(hiddenElement);
            }
        };

        this.setAttributeValueNS = function(element, attributeID, attributeVal)
        {
            if (element)
            {
                    var attributeVal = element.getAttribute(attributeID);
                    if (attributeVal)
                        element.removeAttribute(attributeVal);
                    element.setAttribute(attributeID, attributeVal)
            }
        };

        /* Name : R.Venkat Rajeshwar Rao
         * Date: 1/06/2011
         * Reason: Added this method to get the topmost Div parent element for any element click inside
         * or on the div as the top most element contains the information about the event...
         *
         */
        this.getDivParent=function(node)
        {
            if(node.getAttribute("kwttype")=="divParent")
            {
                return node;
            }
            else
            {
            	//Shanker Jan 8, 2014: Added condition check for IS parentNode null
                while ((node && node.parentNode) && (node.parentNode.getAttribute("kwttype")!="divParent") ){ 
                    node = node.parentNode;
                }//alert("Return" + node.getAttribute("konywidgettype"));
                return node.parentNode;
            }
        }

    }

}

kony.ffi = {
    formOnLoad: function(currentForm){
        try{
            var onLoadJS = currentForm.getAttribute(kony.constants.FORM_ONLOAD_JS);
            if(onLoadJS && window[onLoadJS])
                return window[onLoadJS](currentForm.getAttribute("id"));
        }catch(e){
            console.log(e);
        }
        return true;
    },

    formUnLoad: function(currentForm){
        var domElement = new kony.dom.Element();
        var currentForm = domElement.getCurrentForm();
        try{
            var unLoadJS = currentForm.getAttribute(kony.constants.FORM_UNLOAD_JS);
            if(unLoadJS && window[unLoadJS])
                return window[unLoadJS](currentForm.getAttribute("id"));
        }catch(e){
            console.log(e);
        }
        return true;
    },
    
    getTarget: function(eventSource) {
    	var domElement = new kony.dom.Element();
    	var target = domElement.getEventTarget(eventSource);	     
	    var targetWidgetType = domElement.getAttributeValueNS(target, kony.constants.KONY_WIDGET_TYPE);
	    var preLuaJS = null;
	    if(targetWidgetType === "Kbox" && domElement.getDivParent(target) )
	    	target = domElement.getDivParent(target); //hbox & vbox
	    else if(targetWidgetType.indexOf("seg_K") != -1 || targetWidgetType === "Ksegment"){
	    	preLuaJS = domElement.getAttributeValueNS(target, kony.constants.PRE_JS_EVENT);
	    	if(!preLuaJS)
	    		target = kony.widgets.Segment.segmentParent(target); //segment
	    }
	    return target;
    },
    
    preJSEvent: function(eventSource) {
		 var domElement = new kony.dom.Element();
	     eventSource = eventSource || window.event; 
	     var target = kony.ffi.getTarget(eventSource);	     
	     var targetid = domElement.getAttributeValueNS(target, "id");
	     var preLuaJS = domElement.getAttributeValueNS(target, kony.constants.PRE_JS_EVENT);
	     
	    if(preLuaJS && window[preLuaJS])
	        return window[preLuaJS](eventSource, targetid);
	    return true;        
    },

    postJSEvent: function(eventSource, response, postJS, targetid, userAgentIE) {
    	//Shanker Jan 8, 2014: Added new params for IE to execute postOnClick
    	if(userAgentIE){
    		if(postJS && window[postJS]) 
    	        return window[postJS](eventSource, targetid, response);   
    	}else{
    		if(eventSource){
        		var domElement = new kony.dom.Element();
        		var target = kony.ffi.getTarget(eventSource);
        		targetid = domElement.getAttributeValueNS(target, "id");
        		postJS = domElement.getAttributeValueNS(target, kony.constants.POST_JS_EVENT);
        		if(postJS && window[postJS])
        	        return window[postJS](eventSource, targetid, response);    	    
        	}
    	}
    	return true;        
    }
}

kony.events = {};

kony.events.KEvent = function (eventType, widgetType, widgetEventHandler)
{
        this.kEventType =  eventType;       // "click","change","touchstart","keydown"
        this.kWidgetType = widgetType;      // Widget Types of kony. kButton, kCheckbox etc
        this.kEventHandler = widgetEventHandler;
}

kony.events.KUnloadEvent = function(widgetId, widgetType, widgetEventHandler)
{
    this.kWidgetID = widgetId;
    this.kWidgetType = widgetType;
    this.kEventHandler = widgetEventHandler;
}


kony.widgets = {};

kony.widgets.KWidgetManager = {};

kony.widgets.KWidgetManager.supportWidget = function (widget)
{
    var WidgetList = kony.getGlobal(kony.constants.KONY_REGISTERED_WIDGET_LIST);
    
    if(!WidgetList){
    	
        WidgetList = new Array();
        kony.addGlobal(kony.constants.KONY_REGISTERED_WIDGET_LIST,WidgetList);
    }
    WidgetList.push(widget);
};

/**
 * A new prototype has been added into the array to check if the array contains a particular value.
 *
 */
Array.prototype.contains = function(val){
    var len = this.length;
    if (len == 0)
        return false;
    else
    {
        for (var i=0;i<len;i++)
        {
            if (this[i]==val)
                return true;
        }
    }
    return false;
}

Array.prototype.containsWidgetType = function(val){
    var len = this.length;
    if (len == 0)
        return false;
    else
    {
        for (var i=0;i<len;i++)
        {
            if ((this[i].kWidgetType == val.kWidgetType) && (this[i].kEventType == val.kEventType))
                return true;
        }
    }
    return false;
}

Array.prototype.containsTimerAction = function(val){
    var len = this.length;
    if (len == 0)
        return false;
    else
    {
        for (var i=0;i<len;i++)
        {
            if ((this[i].actionName == val.actionName))
                return true;
        }
    }
    return false;
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}


var CURRENT_TOUCH_PHASE = null;

kony.events.KEventManager = {};

kony.events.supportedTouchEventTypes =  ["swipe", "tap", "longpress", "doubletap", "vscroll", "hvscroll"];

kony.events.touchSupported = ("ontouchstart" in window);

// Anonymous function to initialize the event manager states.
(function()
{


    /**
     *  This event is fired when there is an orientation change in the device. As a part of the orientation change
     *  if some widget has registered for the orientation change event, the widget is informed about this event
     *  along with the current orientation direction (Landscape or Potrait)
     *
     */
    kony.events.KEventManager.updateOrientation = function()
    {
        var orientation = window.orientation;
        switch(orientation)
        {
            case 0:orientation = "portrait";break; // portrait
            case 180:orientation = "portrait";break; // portrait
            case 90:orientation = "landscape";break; // landscape
            case -90:orientation = "landscape";break; // landscape
        }

        //progress indicator for segment widget
        var selNode=kony.getGlobal("selected_item");
        if(selNode)
        {
            var linkNode=document.getElementById(selNode);
            if(linkNode)
                kony.widgets.Segment.setProgressIndicator(linkNode);
        }

         setTimeout( function () {
          // Retrieve the list of events registerd
         var EventMap = kony.events.KEventManager.getRegisteredEvents();
         var eventHandler;
         for(var widget in EventMap)
         {  
             eventHandler = EventMap[widget]["onorientationchangeHandler"];
            if (eventHandler)
            {
                eventHandler(orientation);
            }
         }
         }, 100);


    }


    kony.events.KEventManager.registerEvent = function (kEvent)
    {
        var EventMap = kony.getGlobal(kony.constants.KONY_REGISTERED_EVENT_MAP);

        EventMap[kEvent.kWidgetType] = EventMap[kEvent.kWidgetType] || {};
        if(!EventMap[kEvent.kWidgetType][kEvent.kEventType+"Handler"])
        	EventMap[kEvent.kWidgetType][kEvent.kEventType+"Handler"]= kEvent.kEventHandler;                

    };


    /**
     * Seperate Event Register for the touch events. This is needed because for each of the widget that has registered
     * for touch, the touch start, end and move events need to be registered.
     */
    kony.events.KEventManager.registerTouchEvent = function(kEvent)
    {
       kony.events.KEventManager.registerEvent(kEvent);
    	
       var elements =  document.getElementsByName("touchcontainer_"+kEvent.kWidgetType);
       if (elements && elements.length != 0)
       {    	   
    	   //This is list is for unregistering swipe listners at form unload.
    	   var touchElementsList = kony.getGlobal(kony.constants.KONY_REGISTERED_TOUCH_ELEMENTS_LIST);    	   
    	   if(!touchElementsList){
    		   touchElementsList = new Array();  
    		   kony.addGlobal(kony.constants.KONY_REGISTERED_TOUCH_ELEMENTS_LIST,touchElementsList);   
    	   } 
    	   
    	   
           for(var i=0; i<elements.length; i++)
           {    
        	   touchElementsList.push(elements[i]);
                if(kony.events.touchSupported)
                {
                    elements[i].addEventListener("touchstart", kony.events.KEventManager.touchStartEvent, false);
                    elements[i].addEventListener("touchmove", kony.events.KEventManager.touchMoveEvent, false);
                    elements[i].addEventListener("touchend", kony.events.KEventManager.touchEndEvent, false);
                }
                else
                {
                    elements[i].addEventListener("mousedown", kony.events.KEventManager.touchStartEvent, false);
                    elements[i].addEventListener("mousemove", kony.events.KEventManager.touchMoveEvent, false);
                    elements[i].addEventListener("mouseup", kony.events.KEventManager.touchEndEvent, false);
                }
           }
            return true;
       }else{
            return false;
       }

    };
    
    

    /**
     * Seperate Event Register for the touch events. This is needed because for each of the widget that has registered
     * for touch, the touch start, end and move events need to be registered.
     */
    kony.events.KEventManager.unregisterTouchEvent = function()
    {
       var touchElements = kony.getGlobal(kony.constants.KONY_REGISTERED_TOUCH_ELEMENTS_LIST); 	
       if (touchElements && touchElements.length != 0)
       {
           for(var i=0; i<touchElements.length; i++)
           {        	 
                if(kony.events.touchSupported)
                {
                	touchElements[i].removeEventListener("touchstart", kony.events.KEventManager.touchStartEvent, false);
                	touchElements[i].removeEventListener("touchmove", kony.events.KEventManager.touchMoveEvent, false);
                	touchElements[i].removeEventListener("touchend", kony.events.KEventManager.touchEndEvent, false);
                }
                else
                {
                	touchElements[i].removeEventListener("mousedown", kony.events.KEventManager.touchStartEvent, false);
                	touchElements[i].removeEventListener("mousemove", kony.events.KEventManager.touchMoveEvent, false);
                    touchElements[i].removeEventListener("mouseup", kony.events.KEventManager.touchEndEvent, false);
                }
           }
            return true;
       }else{
            return false;
       }
    };
    

    /**
     * Touch Start Event
     */
    kony.events.KEventManager.touchStartEvent = function(touchEvent)
    {

        // Reset the idle Time Out if the app has been set for it.
        kony.system.timeout.resetElapsedTime();

        //kony.print("Hello World in Touch Start");

        var konyElement = new kony.dom.Element();
        var touches = touchEvent.touches;
        if (touches)
        {

            if (touches.length !== kony.widgets.touch.TOUCH_FINGERS)
                return;

           /**
            * For now we are considering only single touch events.
            */
            var touch = touches[0];

            var target = konyElement.getEventTarget(touchEvent);
            target = kony.widgets.touch.getTouchParent(target);
            var imgs = target.parentNode;
            target = target.parentNode.parentNode;
            //alert(target.id);

            var targetWidgetType = konyElement.getAttributeValueNS(target, "konywidgettype");


           /**
            * Create the touch context with the touch parameters given by the touch start event.
            * Store the context in the touch Context Map against the touch Identifier.
            */
            var touchContext = new kony.widgets.touch.TouchContext(touch);
            touchContext.updateTargetWidgetDetails(target.id, targetWidgetType);
            touchContext.updateCurrentTouchPhase(kony.widgets.touch.TouchContext.STATE_START);
           /**
            * Add the touch context to the globals.
            */
            kony.addGlobal(touch.identifier, touchContext);
         }
    },


    /**
    * Handle touch Move event.
    *
    */
    kony.events.KEventManager.touchMoveEvent = function(event)
    {

        // Reset the idle Time Out if the app has been set for it.
        kony.system.timeout.resetElapsedTime();


        var touches = event.touches;
        if (touches)
        {
            event.preventDefault();

           /**
            * For now we are considering only single toouch events.
            */
            var touch = touches[0];

            // Retreive the touch context associated with this touch identifer. the touch identifier will remain
            // unique from touch start to end for a given finger.
            var touchContext = kony.getGlobal(touch.identifier);

            if (touchContext.currentTouchPhase === kony.widgets.touch.TouchContext.STATE_END || touchContext.currentTouchPhase === kony.widgets.touch.TouchContext.STATE_CANCEL)
                return;

            if(touchContext)
            {
                touchContext.updateMovement(touch);
                touchContext.updateCurrentTouchPhase(kony.widgets.touch.TouchContext.STATE_MOVE);
                var type = touchContext.resolveEventType();                
                if(type === kony.widgets.touch.TouchContext.SWIPE)
                {
                    // Retrieve the list of events registerd
                    var eventsMap = kony.events.KEventManager.getRegisteredEvents();
                   
                	var eventHandler;
                    if (eventsMap[touchContext.targetWidgetType] && (eventHandler = eventsMap[touchContext.targetWidgetType]['swipeHandler'])) 
                    {
                            if (eventHandler)
                            {
                                 //cancelTouch(event);
                                kony.addGlobal(touch.identifier, touchContext);
                                eventHandler(event, touchContext);
                            }
                            else
                            {
                                kony.addGlobal(touch.identifier, touchContext);
                               // cancelTouch(event, touchContext);
                            }
                    }
                }
            }
        }
    }


   /**
    *  Handle the touch End Event.
    *
    */
    kony.events.KEventManager.touchEndEvent = function(event)
    {


        // Reset the idle Time Out if the app has been set for it.
        kony.system.timeout.resetElapsedTime();
        var touches = event.changedTouches;
        if (touches)
        {
            var touch = touches[0];

            // Retreive the touch context associated with this touch identifer. the touch identifier will remain
            // unique from touch start to end for a given finger.
            var touchContext = kony.getGlobal(touch.identifier);

            if (touchContext)
            {

                // Retrieve the list of events registerd
            	var eventsMap = kony.events.KEventManager.getRegisteredEvents();

                // If there was no touch move fired between touch start & end and the touchContext event type is still undefined.
                // Update the otouch end and resolve the event type.
                if (!touchContext.touchMove && touchContext.type === kony.widgets.touch.TouchContext.UNDEFINED_EVENT)
                {
                    touchContext.updateCurrentTouchPhase(kony.widgets.touch.TouchContext.STATE_END);
                    //CURRENT_TOUCH_PHASE = kony.widgets.touch.TouchContext.STATE_END;
                    touchContext.updateTouchEnd(touch);
                    var type = touchContext.resolveEventType();
                    if(type === 0)
                    {
                    	var eventHandler;
                        if (eventsMap[touchContext.targetWidgetType] && (eventHandler = eventsMap[touchContext.targetWidgetType]['swipeHandler'])) 
                        {
                        		if (eventHandler)
                                {
                                   // cancelTouch(event, touchContext);
                                    eventHandler(event, touchContext);
                                }
                                else
                                {
                                    // cancelTouch(event, touchContext);
                                }                            
                        }
                    }
                }
                if (touchContext.touchMove)
                {
                    touchContext.updateCurrentTouchPhase(kony.widgets.touch.TouchContext.STATE_END);
                    // Raise Swipe Event on the widget
                    type = touchContext.resolveEventType();
                	var eventHandler;
                    if (eventsMap[touchContext.targetWidgetType] && (eventHandler = eventsMap[touchContext.targetWidgetType]['swipeHandler'])) 
                    {
                            if (eventHandler)
                            {
                               // cancelTouch(event, touchContext);
                                eventHandler(event, touchContext);
                            }
                            else
                            {
                                // cancelTouch(event, touchContext);
                            }
                    }

                }else{
                    if (type === kony.widgets.touch.TouchContext.TAP)
                    {
                        //alert('TAP');
                        var tcheader = document.getElementById("tcheader");
                        if(tcheader)
                          tcheader.innerHTML += "TAP Event<br>";
                        cancelTouch(event);
                    }
                }
            }
        }
    },

    kony.events.KEventManager.getEventHandler = function (eventSource)
    {
        eventSource = eventSource || window.event; //For IE where window.event is global object

        var konyElement = new kony.dom.Element();
        var targetWidget = konyElement.getEventTarget(eventSource);

        // Reset the idle Time Out if the app has been set for it.
        kony.system.timeout.resetElapsedTime();


        // Retrieve the widget Type.
        var targetWidgetType = konyElement.getAttributeValueNS(targetWidget, kony.constants.KONY_WIDGET_TYPE);
        //if enter/go button presseed stop propogation
        if(targetWidgetType ==='Kcalendar' && (eventSource.keyCode == 10 || eventSource.keyCode == 13))
        {
            if (eventSource.stopPropagation)
                eventSource.stopPropagation();
            if (eventSource.preventDefault)
            	eventSource.preventDefault();
        	return;
        }
        
        var eventsMap = kony.events.KEventManager.getRegisteredEvents();
        var eventHandler;
        if (eventsMap[targetWidgetType] && (eventHandler = eventsMap[targetWidgetType][eventSource.type+'Handler'])) 
            {
                //Murty Nov 23, 2011 When there is a pre js event associated to any of the widgets execute first,
                //depends on result continue calling lua event
                var isContinue = kony.ffi.preJSEvent(eventSource);                                
                if(!isContinue){
                	if (eventSource.stopPropagation) //some of the widgets like button submitting though return from here, hence stopping propogation
                        eventSource.stopPropagation();
                    if (eventSource.preventDefault)
                    	eventSource.preventDefault();
                	return;
                }
                var hasHandledEvent = eventHandler(eventSource);

               if(!((targetWidgetType == "Ktextfield")||(targetWidgetType == "Kcheckboxgroup")||(targetWidgetType == "Kradiobuttongroup"))){

                    //Added condition to avoid stoping event propagation for touch events
                    //if there is know touch event associated to segment, image gallery and hstrip
                    if((targetWidgetType == "Ksegment")
                        ||(targetWidgetType == "KTouchhstrip")
                        ||(targetWidgetType == "KTouchimggal")){
                    if(hasHandledEvent || eventsMap[targetWidgetType][eventSource.type+'clickHandler']){
                            if (eventSource.stopPropagation)
                                eventSource.stopPropagation();
                            if (eventSource.preventDefault)
                                eventSource.preventDefault();
                            else
                                eventSource.returnValue = false;
                        }
                    }else{
                        if (eventSource.stopPropagation)
                            eventSource.stopPropagation();
                        if (eventSource.preventDefault)
                            eventSource.preventDefault();
                        else
                            eventSource.returnValue = false;
                    }
                }
            }

    };


    kony.events.KEventManager.getRegisteredEvents = function()
    {
        var EventMap = kony.getGlobal(kony.constants.KONY_REGISTERED_EVENT_MAP);
        return EventMap;
    };

    kony.events.KEventManager.addEventListener = function(object,type,listener)
    {
        if(!listener){
            listener = kony.events.KEventManager.getEventHandler;
        }
        if(object.addEventListener)
        {
            object.addEventListener(type,listener,false);  //FF, W3C;
        }
        else if(object.attachEvent)
        {
            object.attachEvent('on'+type,listener);  //IE
        }
        else
            alert(typeof window.attachEvent);
    }

    kony.events.KEventManager.removeEventListener = function(object,type,listener)
    {
       if(!listener){
            listener = kony.events.KEventManager.getEventHandler;
       }
       if(object.removeEventListener)
        {
            object.removeEventListener(type,listener,false);  //FF, W3C;
        }
        else if(object.attachEvent)
        {
            object.detachEvent('on'+type,listener);  //IE
        }
        else
            alert(typeof window.attachEvent);
    }

    if (!kony.getGlobal(kony.constants.KONY_TOUCH_WIDGET_CONTEXT_MAP))
    {
        kony.addGlobal(kony.constants.KONY_TOUCH_WIDGET_CONTEXT_MAP, {});
    }


})();



/**
 * This is a temporary function for initializing the widgets like button
 *
 */
function enlistSupportedWidgets()
{
	//Register only available widget events.
	var widgetsSupported = kony.getGlobal(kony.constants.KONY_REGISTERED_WIDGET_LIST);

   	if(widgetsSupported)
   	{
       	//RegisterWidgets will be called only once in a javascript state.
       	var registerWidgets = false;   
       	var EventMap = kony.getGlobal(kony.constants.KONY_REGISTERED_EVENT_MAP);   
       	if (!EventMap)
   		{   			
           EventMap = {};
           kony.addGlobal(kony.constants.KONY_REGISTERED_EVENT_MAP, EventMap);
           registerWidgets = true;
   		}

   		for(var i=0; i<widgetsSupported.length; i++)
   		{
       		if(widgetsSupported[i].loadHandler)
           		widgetsSupported[i].loadHandler();
          
           	if(registerWidgets){           
      			widgetsSupported[i].registerWidget();
   			}

           	if(widgetsSupported[i].registerTouchWidget){
           		widgetsSupported[i].registerTouchWidget();
           	}
       }
	}       
}


/**
 * This functions should be generated based on if there is arequirement for any timers or not
 */
function enlistSystemTimerActions()
{
    var timeOutAction = new kony.system.timers.TimerAction(kony.system.timeout.checkForTimeOutandRaiseEvent, 30000);
    kony.system.timers.registerTimerAction(timeOutAction);
 
    /**
     * Sumanth, Oct 11, 2011: Enable idletimeout check should happen only one time. i.e on form load.
     */
    kony.system.timeout.checkIfAppRequiresTimeOut();

    //Hash change event on window
    if(kony.supports.HashChange){
     kony.events.KEventManager.addEventListener(window,'hashchange',kony.system.browserback.handleHashChangeEvent);
     
     setTimeout (kony.system.browserback.updateURLWithLocation, 300);
     
    }else{
    	var browserBackAction = new kony.system.timers.TimerAction(kony.system.browserback.handleBrowserBackEvent, 300);
    	kony.system.timers.registerTimerAction(browserBackAction);
	}
}

/**
 * This functionsis used to remove registered timers at unload of form.
 */
function delistSystemTimerActions()
{
    kony.system.timers.clearTimerAction();
    
    kony.system.timeout.clearIdleTimeout();
}


/**
 * This is a dummy function to be used for registering any 3rd party functions that need to be executed in a timer.
 */
function enlistCustomTimerActions()
{

}




/**
 *  As a part of the application start up, some of the actions are performed. These actions include
 *
 *  1. GPS Location
 *  2. Chart widget Launch
 *
 */
function enlistForSystemStartupActions()
{
    if (kony.gps){
            if(kony.gps.checkIfAppRequiresGPS() === true)
            {
                kony.gps.invokeGPSToGetLatLon();
            }
    }
    if (kony.widgets.Calendar)
    {
        if(kony.widgets.Calendar.Inlineview)
        {
            //kony.widgets.Calendar.Inlineview.checkCalendarwidget();
        }
    }
    //Suma:August 17,2011 Added theme based support to dynamically load the CSS relevant to the theme.
    var konyElement = new kony.dom.Element();
    var theme = konyElement.getElementByIDNS("CURRENT_THEME");    
    if(theme && theme.value != null)
    {
		var themeurl = theme.getAttribute("url")
		if(themeurl)
			kony.system.themes.executeDynamicCSSLoad(theme,themeurl);
		else
		{
			if(isStartUp == true)
			{
				isStartUp = false;
				return;
			}
			kony.system.themes.executeDynamicCSSLoad(theme,"");
		}
    }
}




function registerWithBrowserForOnLoad()
{
    var konyElement = new kony.dom.Element();
    var currentForm = konyElement.getCurrentForm();

	//Sumanth, Oct 18, 2011: Added check for formid hidden field in response form.
    kony.system.action.checkFormIdUpdate(currentForm);

    //Form events
    kony.events.KEventManager.addEventListener(currentForm,'mousedown');
    kony.events.KEventManager.addEventListener(currentForm,'click');
    kony.events.KEventManager.addEventListener(currentForm,'change');
    kony.events.KEventManager.addEventListener(currentForm,'keydown');
    kony.events.KEventManager.addEventListener(currentForm,'keyup');
    //kony.events.KEventManager.addEventListener(currentForm,'touchstart');
    
    //Body events
   /* var bodyElement = konyElement.getBody();
    if (bodyElement)
    {
        kony.events.KEventManager.addEventListener(bodyElement,'touchmove');
    }*/

    enlistSupportedWidgets();

    enlistForSystemStartupActions();

    enlistSystemTimerActions();

    kony.system.timers.executeTimerActions();

    //kony.timerActions = setInterval("kony.system.timers.executeTimerActions()", 300);

    /*if (kBody)
    {
        kBody.addEventListener('click', konyEventManager.getEventHandler(), false);
    }*/
      
     //Murty Aug 30, 2011: Added JS FFI functionality
    kony.ffi.formOnLoad(currentForm);

    if (typeof konyhybrid != "undefined")
    {
        var hybridElement = document.getElementsByTagName('konyhybridcall');
        if (hybridElement.length > 0)
            konyhybrid.callnativeplatformjs(hybridElement);
    }
}

function unregisterListeners(currentForm,bodyElement)
{

    registerWithBrowserForUnLoad();

    //Form events
    kony.events.KEventManager.removeEventListener(currentForm,'click');
    kony.events.KEventManager.removeEventListener(currentForm,'change');
    kony.events.KEventManager.removeEventListener(currentForm,'keydown');
    kony.events.KEventManager.removeEventListener(currentForm,'keyup');
   // kony.events.KEventManager.removeEventListener(currentForm,'touchstart');
    kony.events.KEventManager.removeEventListener(currentForm,'mousedown');

    kony.events.KEventManager.unregisterTouchEvent();
    
    //Remove Hash change event on window if exists.
    if(kony.supports.HashChange){
    	kony.events.KEventManager.removeEventListener(window,'hashchange');
    }

    // Remove any timers regstered to avoid any leaks and early calls of timer.
    delistSystemTimerActions();
    /*
    var mapelem = document.getElementById("map_canvas");
    if(mapelem) {
        GUnload();   //To avoid memory leaks in case of map widget
    }*/
}

function informWidgetsOfOrientationChange()
{
    var konyElement = new kony.dom.Element();
    var currentForm = konyElement.getCurrentForm();

    kony.events.KEventManager.updateOrientation(currentForm);

    
}


function registerWithBrowserForUnLoad()
{
    //Murty Sep 06, 2011 : Added JS FFI functionality
    registerUnLoadFFI();

    clearTimeout(kony.timerActions);

    var domElement = new kony.dom.Element();
    var currentForm = domElement.getCurrentForm();

    // Form widget unloading should be done here.
    var blurDiv = domElement.getElementByIDNS("blurDiv"); //document.getElementById("blurDiv");
    if(blurDiv !=null)
    {
        blurDiv.parentNode.removeChild(blurDiv);
    }


    /**
     *  This calls the unload event on the selected widget.
     */
    var selectedItem = kony.getGlobal(kony.constants.SELECTED_ITEM);
    if (selectedItem)
    {
         var selectedWidget = domElement.getElementByIDNS(selectedItem.kWidgetID);
         var widgetEventHandler = selectedItem.kEventHandler;

         widgetEventHandler(selectedWidget)
    }

    // Remove the selected Item from globals.
    kony.removeGlobal(kony.constants.SELECTED_ITEM);



}

//Murty Aug 30, 2011: Added JS FFI functionality
function registerUnLoadFFI(){
    kony.ffi.formUnLoad();
}


(function()
{

    // Detect whether device supports orientationchange event, otherwise fall back to
	// the resize event.
	var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    if(window.addEventListener)
    {
        window.addEventListener('load', registerWithBrowserForOnLoad, false);
        window.addEventListener(orientationEvent, informWidgetsOfOrientationChange, false);
        window.addEventListener('unload', registerUnLoadFFI, false);

        //FF, W3C;
       // window.addEventListener('load', GpsLocation,false);

    }
    else if(window.attachEvent)
    {
        window.attachEvent('onload',konyEventManager);  //IE
        window.attachEvent('onorientationchange', informWidgetsOfOrientationChange,false);
    }
    else
         window.onload = konyEventManager;

}());



var e = "";

kony.version.printVersion();


kony.device.init = function (){
    var domElement = new kony.dom.Element();
    //var deviceDetails = domElement.getElementByIDNS("deviceDetails");
}


