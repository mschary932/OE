
/* 
 * System Namespace holds kony provided basic system functionality.
 *
 * Here are some of the functionality that are included under system
 *
 * 1. Timer - Ability to define tasks to be run using timer.  The timer actions will be periodically run automatically by the system
 * 2. BrowserBack - As kony framework uses AJAX as the mechanism for communicating with the server, to handle browser back, the functionality is provided
 * 3. Actions - Specific actions like opening a new URL, alert window are provided under this namespace
 * 4. Timeout - Application time out functionality is provided under this. Auto time out.
 *
 */
kony.system = {};

kony.system.timers = {

timerActions : new Array(),

    TimerAction: function(actionName, frequency)
    {
        this.actionName = actionName;
        this.frequency = frequency;
        this.timer = null;
        // This will tell when was the last time this timer action was checked for execution.
        this.elapsedTimeSinceLastCall = 0;
    },

    registerTimerAction: function(timerAction)
    {
        if (this.timerActions.containsTimerAction(timerAction) === false)
        {
            this.timerActions.push(timerAction);
        }

        
    },

    executeTimerActions: function()
    {
        if (this.timerActions.length > 0)
        {
            for(var i=0; i<this.timerActions.length; i++){
                var timerAction = this.timerActions[i];
                timerAction.timer = setInterval (timerAction.actionName, timerAction.frequency);
            }
        }
    },

    removeTimerAction: function(timerAction)
    {
       var tempActions = new Array();
       if(this.timerActions.length > 0)
       {
            for(var i=0; i<this.timerActions.length; i++){
                if(this.timerActions[i].actionName !== timerAction.actionName)
                {
                    tempActions.push(this.timerActions[i]);
                }
            }

            this.timerActions = tempActions;
       }
    },

    clearTimerAction : function(timerAction)
    {
        if (this.timerActions.length > 0)
        {
            for(var i=0; i<this.timerActions.length; i++){
                timerAction = this.timerActions[i];
                clearTimeout(timerAction.timer);
            }
        }
         
    }
    
}


kony.system.browserback = {

    previousVisitedForms : {},

    currentHash: window.location.hash,

    HASH_PREFIX : "#_",


    sendRequestForPreviouslyVisitedForm : function(previousFormID, currentFormID)
    {
           var domElement = new kony.dom.Element();
           var currentForm = domElement.getCurrentForm();

           var args = kony.data.encodeGenericData();
           if (currentForm)
           {
               // Remove the current form id as the request form.
               args.splice("formid=" + currentFormID, 1);
           }
           
           args.push("formid=" + previousFormID);
           args.push("browser_back_formid=" + previousFormID);

           var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)
           var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
           kony.net.ajax.openReq(ajaxConfig, args, null, this.browserBackResponseHandler);

    },

    /**
     * This response handler is used to handle previous form request incase of <br/> browser back.
     *
     */
    browserBackResponseHandler: function(ajaxResponse,eventSource){
        if((ajaxResponse.requestStatus >= 200 && ajaxResponse.requestStatus < 300 ) || ajaxResponse.requestStatus == 304 )
        {
            if(ajaxResponse.responseText.indexOf("konypopup", 0) != -1)
            {
                // processPopup(ajaxResponse.responseText,eventSource);
                kony.system.action.handlePopupAction(ajaxResponse.responseText, eventSource);
            }/*Sumanth, Oct 11, 2011: Added condition to handle session invalidation in case of browserback after session is invalidated. */
            else if (ajaxResponse.responseText.indexOf("konysecurecall", 0) != -1)
            {
                kony.system.action.handleKonySecureCallAction(ajaxResponse.responseText);
            }
            else
            {
                kony.system.action.handleBrowserBackResponseAction(ajaxResponse.responseText);
            }
        }
        else
        {
            if (ajaxResponse.requestStatus === 500)
            {}

        }
    },
  /** Added to handle hashchange event to support browser back to previous site. 
   * As without this application is not going to previous, because when URLis changed to /p, 
   * it is firing onhashchange which in turn updates it to /p_#formid. This is repeating if we do browser back again.
   */
    handleHashChangeEvent : function(){
    	kony.system.browserback.onhashchange=true;
    	kony.system.browserback.handleBrowserBackEvent();
    },
    /**
     * This is an event called by the timer which periodically verifies if there is a change in the URL. Essentially the location hash
     * As we use AJAX through out, when a user clicks on the browser back, the url's location hash changes to form in history. But the browser
     * still will not reflect the new change as the browsers do not load pages into history when accessed through AJAX calls.
     *
     *
     * There is an interesting learning in this function. When the function is normally called on the kony.system.browserback then the
     * this refers to the current object. But when the same is being done as a call back of a timer function this refers to the
     * global window object. Hence all references to this in this current object are removed and directly kony.system.browserback is
     * used for accessing the variables.
     *
     */
    handleBrowserBackEvent : function()
    {
        /**
         * Browser Back will be called when the following changes
         *
         * if the location.hash value is different from the value stored in the currentHash.
         *
         */

        if (window.location.hash && kony.system.browserback.currentHash && window.location.hash !== kony.system.browserback.currentHash)
        {
            var domElement = new kony.dom.Element();

            var currentForm = domElement.getCurrentForm();

            var bodyElement = domElement.getBody();

            var previousFormID = location.hash.substr(kony.system.browserback.HASH_PREFIX.length);

            // Check if the window.location.hash is already a visited page. This can be found by checking in the preivously visited
            // forms.
            if (kony.system.browserback.previousVisitedForms[location.hash.substr(kony.system.browserback.HASH_PREFIX.length)])
            {
                 //Remove the event listeners to prevent possible mem leak
                 unregisterListeners(currentForm,bodyElement);

                 bodyElement.innerHTML =  kony.system.browserback.previousVisitedForms[location.hash.substr(kony.system.browserback.HASH_PREFIX.length)];

                // kony.system.action.checkFormIdUpdate();
                 
                 window.location.hash = kony.system.browserback.HASH_PREFIX + previousFormID;

                 window.scrollTo(0, 0);

                 //Add the listeners to the new elements
                 //GpsLocation();
                 
                 kony.addGlobal(kony.constants.KONY_REGISTERED_EVENT_LIST, new Array());
                 
                 // Update the location URL
                 kony.system.browserback.updateURLWithLocation();
                 
                 registerWithBrowserForOnLoad();

                 kony.system.browserback.currentHash = window.location.hash;
            }
            else
            {
                kony.system.browserback.updateURLWithLocation();
            }

        }

        /*
         * Sumanth Divvela, Aug 17, 2011: Bug 22438: BB 9800: Device Back button is not working. 
         * This issue is because of location.hash not getting updated on onload event.
         * So, added below statement to update location.hash with currenthash if location.hash is empty.  
         */
        if(!kony.system.browserback.onhashchange && kony.system.browserback.currentHash && !window.location.hash){
        	window.location.hash = kony.system.browserback.currentHash;
        }
    },

    storePreviousForm : function(formid, content)
    {
       /* 
     	* Sumanth Divvela, Sep 6, 2011: Bug 26979: Fixed issue with noscript tag.  
     	*/
		content = kony.system.action.removeNoScriptTag(content);
    	kony.system.browserback.previousVisitedForms[formid] = content;
    },
    
    emptyPreviousForms : function()
    {
        kony.system.browserback.previousVisitedForms = {};
    },

    updateURLWithLocation : function()
    {
        var domElement = new kony.dom.Element();
        /*Sumanth-10/04/13: Popup: Removed popup in browser back*/
        var currentForm = domElement.getElementsByTagName("form");
        if(currentForm && currentForm.length && currentForm.length > 0){
            currentForm = currentForm[0];
        }
        
        var formID = currentForm.getAttribute("id");
        var hashKey = kony.system.browserback.HASH_PREFIX + formID;

        //Retrieve the previousFormID from the window.location hash
        var previousFormID = window.location.hash.substr(kony.system.browserback.HASH_PREFIX.length);

        /**
         * When the new page is downloaded then following statements update the location URL in the browser
         *
         * First an identification is made to see if the page is a new page or not
         * a. Check is made to see if location.hash is present on the browser
         * b. Check is made to see if the location.hash is equal to the hashKey
         * c. Check is made to see if the page is a new page or not
         * d. Check is made to see if the form has been previously visited or not
         *
         */
        /*
		 * Sumanth Divvela Aug 19, 2011: Removed !newpage check from if condition 
		 * as this not need. if !newpage is added then back navigation will have issue navigated 
		 * from non-secure to secure and again to non-secure, now navigating back will have issues.
		 */
        if (window.location.hash && window.location.hash != hashKey
             && !kony.net.ajax.ajaxresponse)
        {

              // Make a request for the previous form
            kony.system.browserback.sendRequestForPreviouslyVisitedForm(previousFormID, formID);
             location.hash = kony.system.browserback.currentHash = kony.system.browserback.HASH_PREFIX+previousFormID;
        }
        else
        {
                window.location.hash = kony.system.browserback.currentHash = hashKey;
                kony.net.ajax.ajaxresponse = false;
        }

    } 
}


kony.system.timeout = {

    /**
     * This function registers for application time out.  First it verifies if the application requires timeout and that too on the page.
     * where the time out has been enabled.
     */
    checkIfAppRequiresTimeOut : function()
    {
    	 if (!kony.globals[kony.constants.KONY_ENABLE_TIME_OUT])
         { 
	    	 var konyElement = new kony.dom.Element();
	         var enableTimeOut = konyElement.getElementByIDNS(kony.constants.KONY_ENABLE_TIME_OUT);
	         if(enableTimeOut !=null)
	         {
	             var registerTimeOut = konyElement.getAttributeValueNS(enableTimeOut, kony.constants.REGISTER_TIME_OUT);
	             if(registerTimeOut && registerTimeOut === "true")
	             {
	                 var timeoutperiod=konyElement.getAttributeValueNS(enableTimeOut, "tim");
	                 timeoutperiod=timeoutperiod*60;
	                 kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] = {"enable":true, "timeoutperiod": timeoutperiod, "elapsedTime": 0};
	
	             }
	             else
	             {
	                 kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] = false;
	             }
	         }
         }
    },

    checkForTimeOutandRaiseEvent: function()
    {
    	var konyElement = new kony.dom.Element();
   	 	var enableTimeOut = konyElement.getElementByIDNS(kony.constants.KONY_ENABLE_TIME_OUT);    	 
        var registerTimeOut = konyElement.getAttributeValueNS(enableTimeOut, kony.constants.REGISTER_TIME_OUT);
        
        if (kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] && kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] !== false && registerTimeOut)
        {
              var timeoutParams = kony.globals[kony.constants.KONY_ENABLE_TIME_OUT];
              if (timeoutParams)
              {
                  timeoutParams["elapsedTime"] += 30;
                  if (timeoutParams["elapsedTime"] >= timeoutParams["timeoutperiod"])
                  {
                      kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] = false;

                      var domElement = new kony.dom.Element();

                      var postData = kony.data.encodeFormData();
                      postData.push("konyidleevent=x");
                      
                      /**
                       * Divvela Sumanth: July 5, 2011: on idletimeout making previous forms array empty, 
                       * to avoid form display on back button after idletimeout. 
                       */
                      kony.system.browserback.emptyPreviousForms();
                      
                      var currentForm = domElement.getCurrentForm();
                      var action = domElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)

                      var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
                      kony.net.ajax.openReq(ajaxConfig, postData, null, null);
                  }
              }

        }
    },

    clearIdleTimeout : function (){
        kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] = false;
    },
   
    resetElapsedTime : function()
    {
        if (kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] && kony.globals[kony.constants.KONY_ENABLE_TIME_OUT] !== false)
        {
           var timeoutParams = kony.globals[kony.constants.KONY_ENABLE_TIME_OUT];
           if (timeoutParams){
                timeoutParams["elapsedTime"] = 0;
           }
        }
    }
    
}

kony.system.action = {

    /**
     * Handle Alert Action - Performs handling of alerts both confirmation and normal alerts.
     * one change to be done in the future is to convert it into the JSON format to make sure that this logic can
     * be avoided
     */
    handleAlertAction: function(alertActionMessage)
    {
        var alertType = alertActionMessage.substring(alertActionMessage.indexOf("type")+5,alertActionMessage.indexOf("msg"));
        var alertMsg = alertActionMessage.substring(alertActionMessage.indexOf("msg")+5,alertActionMessage.indexOf("title") - 2);
        var newKrfid = alertActionMessage.substring(alertActionMessage.indexOf("krfid")+7,alertActionMessage.indexOf("/>")-2)

       // var title = alertActionMessage.substring(alertActionMessage.indexOf("title")+6,alertActionMessage.length - 3);
        var konyElement = new kony.dom.Element();
        var currentForm = konyElement.getCurrentForm();

            //Suma:Sep7,2011 Updating crfid in form from the csrfid of popup as in advanced page doesnt get submitted when popup is raised 
            //var newKrfid = alertElement[0].getAttribute('krfid')
            if(newKrfid){
                var prevKrfi = document.getElementsByName("krfid");
                if(prevKrfi && prevKrfi.length > 0){
                    prevKrfi[0].setAttribute("value", newKrfid);
                }
            }
        
        var postData = kony.data.encodeGenericData();

        /**
         * Sumanth: Oct 4, 2011: Added to include private hidden fields
         *  to alert event request.
         */
        postData = kony.data.encodeHiddenFields(postData);

        if(alertType.indexOf("confirmation") != -1)
        {
             // Raise the confirmation Alert
             var answer=confirm(alertMsg);

             if (answer)
             {
                 postData.push("alert_confirm_yes" + "=Yes");
             }
             else
             {
                 postData.push("alert_confirm_no" + "=No");
             }

             var action = konyElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)
             var ajaxConfig = new kony.net.ajax.AjaxConfig(action, kony.net.HTTP_POST_METHOD, true);
             kony.net.ajax.openReq(ajaxConfig, postData, null, null);
        }
        else
        {
             alert(alertMsg);

             postData.push("alert_confirm_yes" + "=Yes");

             var infoAlertAction = konyElement.getAttributeValueNS(currentForm, kony.constants.KONY_FORM_ACTION)
             var reqConfig = new kony.net.ajax.AjaxConfig(infoAlertAction, kony.net.HTTP_POST_METHOD, true);
             kony.net.ajax.openReq(reqConfig, postData, null, null);

        }
    },

    handleKonySecureCallAction: function(response)
    {
        //alert("In KonySecureCall " + response);
        var len1 = response.indexOf("url=", response.indexOf("konysecurecall", 0));
        var len2 = response.indexOf("[---]",len1);
        var url = response.substring(len1 + 5, len2);
		
        var newKrfid;
        if(response.indexOf("postmethodparams")==-1)
		newKrfid = response.substring(response.indexOf("krfid")+7,response.indexOf("/>")-2)
        else
		newKrfid=response.substring(response.indexOf("krfid")+7,response.indexOf("postmethodparams")-2)
		
		if(newKrfid){
                var prevKrfi = document.getElementsByName("krfid");
                if(prevKrfi && prevKrfi.length > 0){
                    prevKrfi[0].setAttribute("value", newKrfid);
                }
            }
        
        var params;
        if(!(response.indexOf("postmethodparams")==-1))
           {
           
           params=response.substring(response.indexOf("postmethodparams")+18);
           params = params.substring(0, params.indexOf("/>")-1);
           var obj =JSON.parse(params);
           var form1=document.createElement("form");
           var paramHidden = null;
        	   for(i=0;obj[i]!=undefined;i++)
        		   {
                       
        		     paramHidden = document.createElement("input");
                     paramHidden.name=obj[i][0];
                     paramHidden.value=obj[i][1];
                     paramHidden.type="hidden"
        		     form1.appendChild(paramHidden);
        		   }
        	  
        	   document.body.appendChild(form1);
               form1.action=url;
               form1.method="post";
        	   form1.submit();
           
           }
        /*
         * Sumanth, Oct 4, 2011: To fix issue of redirection to url
         * which is already redirected previously. Example: doing
         * signout twice in same window.
         */
        else
        	{
        var newURL = url;
        var len3 = url.lastIndexOf("#");
        if (len3 > 0)
            newURL = url.substring(0, len3);
        
        var href = window.location.href;
        var len4 = href.lastIndexOf("#");
        if (len4 > 0)
            href = href.substring(0, len4);
        
        if (href == newURL) {
            if (len3 > 0 && len3 < url.length) {
                randomNo = Math.floor((Math.random() * 1000)) + 1;
                url = url.substring(0, len3) + "&rid=" + randomNo
                        + url.substring(len3, url.length);
            }
        }
		
		
        window.location.href = url;
        kony.widgets.Utils.removeBlockUISkin();
    }},

    handleKonyOpenURL: function(response)
    {
        var len1 = response.indexOf("url=", response.indexOf("konynewwindow", 0));
        var len2 = response.indexOf("[---]",len1);
        var url = response.substring(len1 + 5, len2);
		
		var newKrfid = response.substring(response.indexOf("krfid")+7,response.indexOf("/>")-2)
		
		if(newKrfid){
                var prevKrfi = document.getElementsByName("krfid");
                if(prevKrfi && prevKrfi.length > 0){
                    prevKrfi[0].setAttribute("value", newKrfid);
                }
            }
		
        kony.widgets.Utils.removeBlockUISkin();
		
		
        window.open(url);
    
   
    },

    handleJSONResponse : function (response, eventSource)
    {

        var evaluatedResponse =  eval('(' + response + ')');

        if (evaluatedResponse)
        {
            if (evaluatedResponse.konyjsonresponseforwidget.indexOf("imggal") > -1 ){
                  kony.widgets.ImageGallery.handleImageGalleryResponse(evaluatedResponse, eventSource);
            }
            else if (evaluatedResponse.konyjsonresponseforwidget.indexOf("hstrip") > -1){
                  kony.widgets.HorizontalImageStrip.handleHorizontalStripResponse(evaluatedResponse, eventSource);
            }
        }
    },

    handlePopupAction: function(response, eventSource)
    {

         var konyElement = new kony.dom.Element();
         var bodyElement = konyElement.getBody();
         var currentForm = konyElement.getCurrentForm();

         var formid = konyElement.getAttributeValueNS(currentForm, "id");

          //Remove the event listeners to prevent possible mem leak
         unregisterListeners(currentForm,bodyElement);
         var nocache = konyElement.getAttributeValueNS(currentForm, "nocache");
         if(!nocache || nocache == "false")
         	kony.system.browserback.storePreviousForm(formid, bodyElement.innerHTML);

         // Retrieve the popup Attributes.
         var j = response.indexOf("konypopup");
         var k = response.indexOf("/>",j);
         var popup = kony.widgets.Popup.Util.loadXMLString(response.substring(j-1,k+2));
         var popupElement = popup.getElementsByTagName('konypopup');

         if(popupElement && popupElement[0].getAttribute('dismiss') == 'true'){
            //Suma:Sep7,2011 Updating crfid in form from the csrfid of popup as in advanced page doesnt get submitted when popup is raised 
            var newKrfid = popupElement[0].getAttribute('krfid')
            if(newKrfid){
                var prevKrfi = document.getElementsByName("krfid");
                if(prevKrfi && prevKrfi.length > 0){
                      prevKrfi = prevKrfi[0];
                }else{
                    prevKrfi = document.createElement('input');
                    prevKrfi.setAttribute("type", "hidden")
                    eleform.appendChild(prevKrfi);
                }
                prevKrfi.setAttribute("value", newKrfid);
            }
            //Close popup.
            kony.widgets.Popup.Util.closePopup();
            
            // Update the location URL
            kony.system.browserback.updateURLWithLocation();
            
        }else{
            response = response.substring(k+2);

           // bodyElement.innerHTML = response;

          //  this.checkFormIdUpdate();
            //window.scrollTo(0, 0);

           // registerWithBrowserForOnLoad();
            
            /* 
             * Sumanth Divvela, Sep 6, 2011: Bug 26979: Fixed issue with noscript tag.  
             */
            response = this.removeNoScriptTag(response);

            kony.widgets.Popup.Util.showPopup('popup',response,popupElement[0],eventSource);
            
            // Update the location URL
            kony.system.browserback.updateURLWithLocation();
            
            registerWithBrowserForOnLoad();
        }
     },

    /**
     * This response action is used for back button click case,
     * to update hashkey before adding listners to body to avoid infinte
     * loop of previous form requests for prvious form is not in UI state
     * (example: incase of idletimeout or invalidate session.)
     *
     */
    handleBrowserBackResponseAction: function(response)
    {
         var konyElement = new kony.dom.Element();
         var bodyElement = konyElement.getBody();
         var currentForm = konyElement.getCurrentForm();
         var formid = konyElement.getAttributeValueNS(currentForm, "id");

          //Remove the event listeners to prevent possible mem leak
         unregisterListeners(currentForm,bodyElement);
         
         var nocache = konyElement.getAttributeValueNS(currentForm, "nocache");
         if(!nocache || nocache == "false")
         	kony.system.browserback.storePreviousForm(formid, bodyElement.innerHTML);

         /* 
          * Sumanth Divvela, Sep 6, 2011: Bug 26979: Fixed issue with noscript tag.  
          */
         response = this.removeNoScriptTag(response);
         
          bodyElement.innerHTML = response;
        
         window.scrollTo(0, 0);
         //After updatation of body get latest form id.
         currentForm = konyElement.getCurrentForm();
         formid = konyElement.getAttributeValueNS(currentForm, "id");            
          window.location.hash = kony.system.browserback.currentHash = kony.system.browserback.HASH_PREFIX + formid;
         //Add the listeners to the new elements
         kony.addGlobal(kony.constants.KONY_REGISTERED_EVENT_LIST, new Array());
         
         // Update the location URL
         kony.system.browserback.updateURLWithLocation();
         
         registerWithBrowserForOnLoad();
    },

    handleValidResponseAction: function(response)
    {
         var konyElement = new kony.dom.Element();
         var bodyElement = konyElement.getBody();
         var currentForm = konyElement.getCurrentForm();
         var formid = konyElement.getAttributeValueNS(currentForm, "id");

          //Remove the event listeners to prevent possible mem leak
         unregisterListeners(currentForm,bodyElement);

         var nocache = konyElement.getAttributeValueNS(currentForm, "nocache");
         if(!nocache || nocache == "false")
         	kony.system.browserback.storePreviousForm(formid, bodyElement.innerHTML);

         response =  this.removeNoScriptTag(response);

         bodyElement.innerHTML = response;
        
        
         window.scrollTo(0, 0);

         //Add the listeners to the new elements
         //GpsLocation();
         kony.addGlobal(kony.constants.KONY_REGISTERED_EVENT_LIST, new Array());
         
         // Update the location URL
         kony.system.browserback.updateURLWithLocation();
         
         registerWithBrowserForOnLoad();
    },

    /**
     * This function is used to handle a specific bug identified in the andorid browser. In some scenarios
     * even though the inner HTML is changed the formid hidden value still displays previous form id.
     */
    checkFormIdUpdate: function(currentForm)
    {

     var konyElement = new kony.dom.Element();        
        var frmHiddenField =  document.getElementsByName("formid");
        if(frmHiddenField)
        {
            frmHiddenField = frmHiddenField[frmHiddenField.length-1];
            if(currentForm.getAttribute("id") != frmHiddenField.getAttribute("value"))
            {
            	frmHiddenField.setAttribute("value", currentForm.getAttribute("id"));
            }         
        }        
    },
    
    /**
     * This function is used to remove noscript tag from ajax response, to avoid noscript message to be displayed. 
     */
    removeNoScriptTag: function(xmlDoc){
    	 if(xmlDoc){
    	     try{
    	        if(xmlDoc.indexOf('<noscript') > 0){
    	            xmlDoc = xmlDoc.replace(xmlDoc.substring(xmlDoc.indexOf('<noscript'),xmlDoc.indexOf('</noscript>')+11),'');
    	     }
    	     }catch(e){}
    	 }
    	 return xmlDoc;
    }
    
}


kony.system.cookie = {
		createCookie : function (name,value,days,path) {
		    if (days) {
		        var date = new Date();
		        date.setTime(date.getTime()+(days*24*60*60*1000));
		        var expires = "; expires="+date.toGMTString();
		    }
		    else var expires = "";
		    path=path?path:"/";
		    document.cookie = name+"="+value+expires+"; Version=1; path="+path;
		},

		readCookie : function (name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ')
		            c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0)
		            return c.substring(nameEQ.length,c.length);
		    }
		    return null;
		},

		eraseCookie : function (name) {
		    createCookie(name,"",-1,"/");
		}
}


kony.supports = {
    Touch : ("ontouchstart" in window),
    HashChange : ("onhashchange" in window)
    
}
    //Suma:August 17,2011 Added theme based support to dynamically load the CSS relevant to the theme.
//We are checking for all style tags in the head and finding the tag related to the theme and dynamically updating with the new theme based CSS
kony.system.themes = {

themeActions : new Array(),
        
executeDynamicCSSLoad: function (theme,themeurl)
    {
       var konyElement = new kony.dom.Element();
       var allsuspects=konyElement.getElementsByTagName("style");
       var allsuspects1=konyElement.getElementsByTagName("link");
	   
       var imgcat = theme.getAttribute("imagecat");
       for(var i=0; i< allsuspects.length; i++){
            if(imgcat != null && imgcat.length > 0)
            {
                    var url = allsuspects[i].firstChild.wholeText;
                    var urlArray = url.split("/");
                    var len = url.indexOf("kony");

                    if(url.substring(len).indexOf(imgcat) != -1)
                    {
                            var len2 = url.indexOf(".css");
                            if(url.indexOf(imgcat) != -1)
                            {
                                if(imgcat.indexOf("kony") == -1 && imgcat != "retina")
                                {
                                    var imgcat = url.substring(len,len2-3)+imgcat;
                                }
                                else if(imgcat.indexOf("kony") == -1 && imgcat == "retina")
                                {
                                    var imgcat = url.substring(len,len2-6)+imgcat;
                                }
                                var len3 = urlArray[0].indexOf("http");
                                if(themeurl)								
									var newURL = themeurl;
                                else if(theme && typeof (theme.value) != "undefined")								
									var newURL = urlArray[0].substring(len3) + "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme.value + "/" + imgcat+".css?ver=1.0.0";				
								else
									var newURL = urlArray[0].substring(len3) + "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme + "/" + imgcat+".css?ver=1.0.0";				
                                if(newURL != null)
                                {
                                    var newCSS = document.createElement('link');
                                    newCSS.setAttribute("newtheme", "hello");
                                    newCSS.setAttribute("rel", "stylesheet");
                                    newCSS.setAttribute("type", "text/css")
                                    newCSS.setAttribute("href", newURL)
                                    if(allsuspects1.length)
                                    {
                                        for(var j=0;j<allsuspects1.length;j++)
                                        {
                                            if(allsuspects1[j].getAttribute("newtheme")=="hello")
                                            {
                                                allsuspects1[j].parentNode.removeChild(allsuspects1[j]);
                                                break;
                                            }
                                        }
                                    }
                                    allsuspects[i].parentNode.appendChild(newCSS);
                                    break;									
                                }

                            }
                    }
            }
        }
        if(newURL == null)
        {
                for(var i=0; i< allsuspects.length; i++){
                    if(allsuspects[i].id == "theme" || document.getElementById('theme'))
                    {
                    	if(themeurl)	
						{						
							var newURL = themeurl;	
							for(var j=1; j< allsuspects1.length; j++){
								if(allsuspects1[j].href.indexOf("kony") != -1)
								{
										if(allsuspects1[j].href.indexOf(theme.value) == -1)
										{
											allsuspects1[j].parentNode.removeChild(allsuspects1[j]);
										}
										break;
								}
						   }
						}
						else
						{ 					
	                       var url = "";
						   if(document.getElementById('theme').href) {
						    url = document.getElementById('theme').href;
						   } else {
						     url = allsuspects[i].firstChild.wholeText;
						   }
						   
						   for(var j=1; j< allsuspects1.length; j++){
								if(allsuspects1[j].href.indexOf("kony") != -1)
								{
										if(allsuspects1[j].href.indexOf(theme.value) == -1)
										{
											allsuspects1[j].parentNode.removeChild(allsuspects1[j]);
										}
										break;
								}
						   }
	
	                       var urlArray = url.split("/");
	                       var len3 = urlArray[0].indexOf("http");
	
	                       if(urlArray.length == 6)
						    {
								if(theme && typeof (theme.value) != "undefined")
									var newURL = urlArray[0].substring(len3)+ "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme.value + "/" + urlArray[5];
								else
									var newURL = urlArray[0].substring(len3)+ "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme + "/" + urlArray[5];
							}
	                       if(urlArray.length == 7)
						    {
								if(theme && typeof (theme.value) != "undefined")
									var newURL = urlArray[0].substring(len3)+ "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme.value + "/" + urlArray[6];
								else
									var newURL = urlArray[0].substring(len3)+ "/" + urlArray[1] + "/" + urlArray[2] + "/" + urlArray[3] + "/" + urlArray[4] + theme + "/" + urlArray[6];
							}
						}
                       if(newURL != null)
                        {
                            var newCSS = document.createElement('link');
                            newCSS.setAttribute("id", "theme");
                            newCSS.setAttribute("rel", "stylesheet");
                            newCSS.setAttribute("type", "text/css")
                            newCSS.setAttribute("href", newURL)
                            allsuspects[i].parentNode.appendChild(newCSS);
                            break;
                        }
                    }
                }    
         }   
				
    }  
}

