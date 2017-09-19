kony.events = {
	widgetEventMap:{},
	hiddenIFrame: null,
	isFrameworkEventsRegistered : false,
	
	KUnloadEvent: function(formId, widgetId, widgetType, widgetEventHandler) {
	    this.kFormID = formId;
	    this.kWidgetID = widgetId;
	    this.kWidgetType = widgetType;
	    this.kEventHandler = widgetEventHandler;
	},

	addEvent: function(kEventType, kWidgetType, kEventHandler) {
	    kony.events.widgetEventMap[kWidgetType] = kony.events.widgetEventMap[kWidgetType] || {};
	    kony.events.widgetEventMap[kWidgetType][kEventType] = kEventHandler;
	},

	getEventHandler: function (eventObject) 
	{
	
		eventObject = eventObject || window.event;
		var targetWidget = eventObject.target || eventObject.srcElement;
		var preventDefault = true;
		var eventData;
	    
	    // Reset the idle Time Out if the app has been set for it.
	    if($KG["__idletimeout"] && $KG["__idletimeout"]["enabled"]) {
	    	var reset = $KI.appevents.resettimer();
			if(reset === false) return;
		}
		
		$KW.Appmenu && $KW.Appmenu.hidemoreappmenuitems();
		

        //hide calendar
        if(targetWidget.getAttribute('w-type') != "Calendar" && targetWidget.getAttribute('kwidgettype') != "Calendar" ){
			$KW.Calendar && $KW.Calendar.__dp.destroyCalendar();
		}
		if(targetWidget.getAttribute('w-type-inactive')){
			return;
		}


        //Hide custom picker
        var othPickers = document.querySelectorAll('div.dw'), picker = null;
        for(var p=0; p<othPickers.length; p++) {
            picker = $KG[othPickers[p].id.replace('_picker', '')];
            picker && picker.hide();
        }

		//Execute click only if it is initiated at the same target without touch move
	    if(!$KG["nativeScroll"] && eventObject.type == "click" && typeof cvox == "undefined" && ($KU.isTouchSupported || $KU.isPointerSupported) && $KG["targetWidget"] && ($KG["moved"] || ($KG["targetWidget"] && targetWidget != $KG["targetWidget"]))) 
		{
			//Fix for 26388: Stopping default event in case of internal page hyperlink for Anchor tag.
			if(targetWidget.tagName == 'A' && (targetWidget.getAttribute('href') && targetWidget.getAttribute('href').charAt(0) == "#")){  
				kony.events.stopPropagation(eventObject);
				kony.events.preventDefault(eventObject); 
			}
			// Reset moved params
			$KG["targetWidget"] = "";
			$KG["moved"] = false;

			var src = eventObject.srcElement;
			// exclusion list
			if((src.getAttribute && src.getAttribute("kwidgettype") == "Calendar") || (src.parentNode && src.parentNode.getAttribute && src.parentNode.getAttribute("kwidgettype") == "Calendar"))
			{
				// do nothing; iOS 4.1 - click is fired b4 touchstart
			}
			else
			{
				return;
			}
		}
			
	    if (targetWidget) 
		{
	        var targetWidgetType = targetWidget.getAttribute(kony.constants.KONY_WIDGET_TYPE);
			
			if(targetWidget.tagName == 'A')
				eventData = [targetWidget.innerText, targetWidget.getAttribute('href')];
				
			if(targetWidget.getAttribute('tpwidgettype'))
			{
				$KW.Popup && $KW.Popup.dismissPopup();
				return;
			}
			else if(!targetWidgetType)
			{ 
				// Case where user clicks on li in seg
				var targetChild = targetWidget.childNodes[0];
				if(targetWidget.getAttribute("index") && targetChild && targetChild.getAttribute("kwidgettype") == "Segment")
				{
					targetWidget = targetChild;
					targetWidgetType = "Segment";
				}
				else
				{
					var thirdPartyWidget = $KU.getParentByAttribute(targetWidget, 'tpwidgettype');
					//Don't proceed if map marker is clicked in windows phone as event sequence is coming wrong and popup is getting closed
					if(targetWidget && targetWidget.tagName == "CANVAS" && ($KU.isIE10 || $KU.isIE11) && thirdPartyWidget && thirdPartyWidget.getAttribute("tpwidgettype") == "googlemap"){
					    return;
					}
					targetWidget = $KU.getParentByAttribute(targetWidget, kony.constants.KONY_WIDGET_TYPE);
					// Case when no ancestor with a kwidgettype could be reached OR thirdparty widgettype is encountered
					if(!targetWidget || thirdPartyWidget)
					{
						$KW.Popup && $KW.Popup.dismissPopup();
						return;
					}
					targetWidgetType = targetWidget.getAttribute(kony.constants.KONY_WIDGET_TYPE);
				}
			}
			
			// Dismiss popup if any
			var pf = $KU.getContainerForm(targetWidget);

			if($KW.Popup && $KW.Popup.dismissPopup(pf))
				return;			
			
			// Quit if disabled
			var widgetModel = $KU.getModelByNode(targetWidget);
			
			if(widgetModel && widgetModel.disabled)
				return;
			
			var widgetEventObj = kony.events.widgetEventMap[targetWidgetType];
			if (widgetEventObj && widgetEventObj[eventObject.type])
			{	
				//#ifdef DESKTOP
				//added below kdisabled check for IE specific versions
				var kdisabled = targetWidget.getAttribute("kdisabled");
				if(kdisabled == "true")
				{
					kony.events.preventDefault(eventObject);
					return;
                }
				//#endif		
				var eventHandler = widgetEventObj[eventObject.type];
				if(targetWidgetType == 'RichText')
				{	
					//prevent default action only when the event is defined in IDE for richtext.
					if(!widgetModel.onclick)
						preventDefault = false;
				}
				var target = eventObject.target || eventObject.srcElement;
				if(!(targetWidgetType == "TextField" || targetWidgetType == "CheckBoxGroup" || targetWidgetType == "TextArea"
                   || targetWidgetType == "RadioButtonGroup"|| (targetWidgetType == "DataGrid" && target.type == "checkbox")))
				{
					if(preventDefault)
					{
						kony.events.stopPropagation(eventObject);
						kony.events.preventDefault(eventObject);
					}
				}
				
				var editableCombos = document.querySelectorAll("div[name='SelectOptions']");
				if(editableCombos){
					for(var i=0; i < editableCombos.length; i++){
						if(editableCombos[i].style.display == "block"){
							if(targetWidget.id != editableCombos[i].parentNode.id)
								editableCombos[i].style.display = "none";
						}	
					}
				}
				
				//	Dispatch event
				//srcelement changed to target for firefox support
				if(targetWidgetType == 'RichText' && eventData) //pass linktext and attributes when user clicks on link in a richtext
					eventHandler(eventObject, targetWidget, eventData);  	
				else
					eventHandler(eventObject, targetWidget, target);                    
	
	            if (!kony.system.activity.hasActivity()) {
					$KW.Utils.removeBlockUISkin();
					$KW.unLoadWidget();
				}
			}
		}
	},

	addEventListener: function(object, type, listener, bCapture){
	
	    if(!object)
			return;
		if (!listener)
	        listener = kony.events.getEventHandler;
		if(!bCapture)
			bCapture = false;

		if (object.addEventListener)
	        object.addEventListener(type, listener, bCapture); //FF, W3C;
	    else if (object.attachEvent) 
            object.attachEvent('on' + type, listener); 		   //IE
	},

	removeEventListener: function(object, type, listener, bCapture){  
	
	    if(!object)
			return;
		if (!listener) 
	        listener = kony.events.getEventHandler;
		if(!bCapture)
			bCapture = false;

		if (object.removeEventListener)
	        object.removeEventListener(type, listener, bCapture); //FF, W3C;
	    else if (object.attachEvent)
			object.detachEvent('on' + type, listener);		   	  //IE
	},	
	
	preventDefault: function(eventObject){  
	    if(!eventObject)
			return;
		
		if (eventObject.preventDefault) 
			eventObject.preventDefault();
		else 
			eventObject.returnValue = false;
	},

	stopPropagation: function(eventObject){        
		if(!eventObject)
			return;
		
		if (eventObject.stopPropagation) 
			eventObject.stopPropagation();
		else 
			eventObject.cancelBubble = true;
	},

	 ontouchstartHandler: function(e) {
        if(($KU.isIE || $KU.isPointerSupported ? e : e.changedTouches) && !$KG["nativeScroll"])
		{
			var target = e.changedTouches ? (e.changedTouches[0].target || e.changedTouches[0].srcElement) : (e.target || e.srcElement);
			if(target.nodeType == 3)
				target = target.parentNode;
			$KG["targetWidget"] = target;
			$KG["moved"] = false;
			if($KU.isIE || $KU.isPointerSupported){ //Disable click event when the user scrolls the page
				var touch = e.touches && e.touches[0] || e;
				$KG.pointX = touch.pageX;
				$KG.pointY = touch.pageY;
			}
		}	
	},
		
	ontouchmoveHandler: function(e) {
		if(!$KG["nativeScroll"]){
			if($KU.isIE || $KU.isPointerSupported){ //In windows phone or tablet, pointer move gets fired when the screen is touched.
				var touch = e.touches && e.touches[0] || e;
				var	deltaX = touch.pageX - $KG.pointX,
				deltaY = touch.pageY - $KG.pointY;			
				if(Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0){				
					$KG["moved"] = true;	
				}	
			}	
			else
				$KG["moved"] = true;			
		}
	},
	
	registerDocumentEvents: function() {
		
	    var main = ($KU.isWindowsPhone && $KU.isIE9) ? document : document.getElementById("__MainContainer");
	    kony.events.addEventListener(main, 'click');
	    kony.events.addEventListener(main, 'change');
	    kony.events.addEventListener(main, 'keydown');
	    kony.events.addEventListener(main, 'keyup');
		if($KG["useNativeScroll"])
		{
			kony.events.addEventListener(main, 'touchstart', function(){});
			kony.events.addEventListener(main, 'touchmove', function(){});
		}
		else
		{			
			if($KU.isTouchSupported){ 
				kony.events.addEventListener(main, 'touchstart', kony.events.ontouchstartHandler);
				kony.events.addEventListener(main, 'touchmove', kony.events.ontouchmoveHandler);
			}			
			else if($KU.isPointerSupported){
				kony.events.addEventListener(main, 'MSPointerDown', kony.events.ontouchstartHandler);
				kony.events.addEventListener(main, 'MSPointerMove', kony.events.ontouchmoveHandler);
			}			
		}
	    kony.appinit.initializeWidgets();
		kony.events.orientationregistration();
		kony.events.addEventListener(window, 'unload', kony.events.unregisterListeners);
		kony.events.isFrameworkEventsRegistered = true;
	},

	
	unregisterListeners: function(formID) {
	    var main = $KU.isWindowsPhone ? document : document.getElementById("__MainContainer");
	    kony.events.removeEventListener(main,'click');
		kony.events.removeEventListener(main,'touchstart');
		kony.events.removeEventListener(main,'touchmove');
	    kony.events.removeEventListener(main,'change');
	    kony.events.removeEventListener(main,'keydown');
	    kony.events.removeEventListener(main,'keyup');
	    kony.events.removeEventListener(main,'touchstart');
	    //Remove Hash change event on window if exists.
	    if($KU.hashChange){
	    	kony.events.removeEventListener(window,'hashchange');
	    }
	
	    // Remove any timers registered to avoid any leaks and early calls of timer.
	    $KW.Form.delistSystemTimerActions();
	},
		
	/**
	 *  This event is fired when there is an orientation change in the device. As a part of the orientation change
	 *  if some widget has registered for the orientation change event, the widget is informed about this event
	 *  along with the current orientation direction (Landscape or Potrait)
	 */
	 
	windowOrientationChange: function()
	{
		var winNewWidth = $KU.getWindowWidth();
    	var winNewHeight = $KU.getWindowHeight();
		var event = window.event;
		// compare the new height and width with old one. To prevent browser like ie8 repeated resize events
		
		var orientation = $KU.detectOrientation();
		if(orientation != undefined && orientation == $KG["__orientation"] && event && event.type == 'resize'){	
			//Removing input focus when the keypad is dismissed through device back button
			window.clearTimeout(kony.events.resizeTimeoutId);
			kony.events.resizeTimeoutId = setTimeout(function(){
				if($KG.activeInput && !$KG["nativeScroll"] && winNewHeight > $KG['__viewportHeight']){
					/*if($KU.isAndroid && $KG.activeInput.getAttribute('type') == "password"){
						$KG.activeInput.style.position = 'relative';
						$KG.activeInput.style.top = "-10000px";
						$KG.activeInput.style.webkitTransform = 'translate3d(0, 10000px, 0)';
					}*/
					if($KG.appbehaviors.disableScrollOnInputFocus == true)
						$KG.activeInput.blur();
					$KU.onHideKeypad();
				}
				else{
					$KU.adjustScrollBoxesOnResize();
				}	
				$KG['__viewportHeight'] = winNewHeight;
			}, $KU.orientationDelay);		
			return;
		}
		else
			$KG["__orientation"] = orientation;
		if($KG["__currentForm"])	
		{
			if($KU.isOrientationSupported && $KU.isAndroid){
				if(event && event.type == 'resize')
					return;				
			}
			//To get devices' innerHeight(for showLoadingScreen calculations)	20/11/2013			
			$KU.getInnerHeight($KU.orientationDelay); 			
			$KU.setActiveInput();
			$KG['__viewportHeight'] = winNewHeight;	
			//Added to make sure multiple resize events are not fired, if orientation/resize are done immediatly.
            window.clearTimeout(kony.events.orientationTimeoutId);
	        kony.events.orientationTimeoutId = setTimeout(function()
			{
	            // Retrieve the list of events registerd
	            var eventList = kony.events.widgetEventMap || {};
	            for (var k in eventList) 
				{
	                var widgetType = eventList[k];
					var eventHandler = widgetType["onorientationchange"] || widgetType["onresize"];
					eventHandler && eventHandler($KG["__currentForm"].id, $KG["__orientation"]);
	            }
				
				$KW.Form.resizeForm($KG["__currentForm"].id, true);
				
	        }, $KU.orientationDelay);		
		}
	},
	
	orientationregistration : function() {
		$KG["__orientation"] = $KU.detectOrientation();
		$KG["__oldWindowWidth"] = $KU.getWindowWidth();
		$KG["__oldWindowHeight"] = $KU.getWindowHeight();
		var orientationEvent = ($KU.isOrientationSupported && !$KU.isAndroid) ? "orientationchange" : "resize";
		kony.events.addEventListener(window, orientationEvent, kony.events.windowOrientationChange);
		if($KU.isOrientationSupported  && $KU.isAndroid)
			kony.events.addEventListener(window, "orientationchange", kony.events.windowOrientationChange);	
	},
	
    /**
     * Returns true if any box event is executed else returns false.
     **/
	
	executeBoxEvent: function(wModel, rowdata, containerModel, isSection) {
        if(rowdata && containerModel) { //Then widgetModel is inside a container widget
            var rowModelData = null, widgetNode = null
              , clickHandler = null, eventReference = null
              , parentModel = wModel, extendedModel = null;

            var templateModel = $KW.Utils.getTemplateByContainerModelAndRowData(containerModel, rowdata, isSection);

            while(parentModel) {
                var widgetData = rowdata[containerModel.widgetdatamap[parentModel.id]];
				rowModelData = $KU.cloneObj(widgetData);
                if(rowModelData) {
                    if(typeof rowModelData === 'string') {
                        rowModelData = (parentModel.wType === 'Image') ? {"src": rowModelData} : {"text": rowModelData};
                    }
                    if(!IndexJL) {
                        for(var p in rowModelData) {
                            if(rowModelData.hasOwnProperty(p) && p !== p.toLowerCase()) {
                                rowModelData[p.toLowerCase()] = rowModelData[p];
                            }
                        }
						
						if(containerModel.wType == 'Segment'){
							context = {sectionIndex: containerModel.currentIndex[0], rowIndex: containerModel.currentIndex[1], widgetInfo: widgetData};
						}
                    }
                    clickHandler = rowModelData.onclick || parentModel.onclick;
                    if(clickHandler && rowModelData.enable !== false) {
                        extendedModel = $KU.extend(rowModelData, parentModel);
                        eventReference = $KU.returnEventReference(extendedModel.onclick);
                        if(eventReference && extendedModel.blockeduiskin) {
                            $KW.Utils.applyBlockUISkin(extendedModel);
                        }
                        widgetNode = $KU.getNodeByModel(extendedModel);
                        (!extendedModel.containerID && extendedModel.wType != "Segment") && $KW.HBox.setProgressIndicator(widgetNode);
                       eventReference && (context ? eventReference.call(extendedModel, extendedModel, context) : eventReference.call(extendedModel, extendedModel));

                        return true;
                    }
                } else if(parentModel.onclick) {
                    eventReference = $KU.returnEventReference(parentModel.onclick);

                    if(eventReference && parentModel.blockeduiskin) {
                        $KW.Utils.applyBlockUISkin(parentModel);
                    }
                    widgetNode = $KU.getNodeByModel(parentModel);
                    (!parentModel.containerID && parentModel.wType != "Segment") && $KW.HBox.setProgressIndicator(widgetNode);
                    eventReference && eventReference.call(parentModel, parentModel);

                    return true;
                }

                parentModel = parentModel.parent;
                if(!parentModel) return false;
            }
        } else {
			var formId = wModel.pf;
			var form = window[formId] || $KG.__currentForm;
	        var pModel = wModel.parent;
			while(pModel) {			
				if ( pModel.onclick || (pModel.parent && formId == pModel.parent.id)) {
					if(pModel.onclick){
						var onclickref = $KU.returnEventReference(pModel.onclick);
						pModel.blockeduiskin  && $KW.Utils.applyBlockUISkin(pModel); 
						var widgetNode = $KU.getNodeByModel(pModel);				
						(!pModel.containerID && pModel.wType != "Segment") && $KW.HBox.setProgressIndicator(widgetNode);
	                   onclickref  && onclickref.call(pModel,pModel);
	                    return true;
					}
					return false;
				}
				pModel = pModel.parent;
	        }          
	        return false;
	    }
    },

	browserback: {
	
	    currentHash: window.location.hash,
	
        HASH_PREFIX: '#_',
	    	    
		handleBrowserBackEvent : function(){
		   // Reset the idle Time Out if the app has been set for it.
		    if($KG["__idletimeout"] && $KG["__idletimeout"]["enabled"]) 
		    $KI.appevents.resettimer();
		    //Browser Back will be called when the following changes
		    //if the location.hash value is different from the value stored in the currentHash.
		    if ((window.location.hash || window.location.hash ==="") && kony.events.browserback.currentHash && window.location.hash !== kony.events.browserback.currentHash){
		        $KI.window.dismissLoadingScreen();
		        $KW.Calendar && $KW.Calendar.__dp.destroyCalendar();
		        var formModel = $KG["__currentForm"];
		        var ondeviceback = $KU.returnEventReference(formModel.ondeviceback);
		        if(ondeviceback)
		        {
		            // am going nowhere
		            //location.hash = kony.events.browserback.HASH_PREFIX + formModel.id;
		            kony.events.browserback.updateURLWithLocation(formModel.id);
		            ondeviceback.call();
		            return;
		        }
		        var previousFormID = window.location.hash.substr(kony.events.browserback.HASH_PREFIX.length);
		        var popup = document.querySelector("form[kwidgettype='Popup']");
				popup && $KW.Popup.dismiss();
		        if(previousFormID === "" || popup){
					previousFormID = formModel.id;
		        }
		        kony.events.browserback.updateURLWithLocation(previousFormID);
		        //window.location.hash = kony.events.browserback.HASH_PREFIX + previousFormID;
		        var previousFormModel = window[previousFormID];
		        if(previousFormModel && previousFormModel.wType == "Form" && previousFormID !== formModel.id) {
		            previousFormModel["isfromBrowserBack"] =true; 
		            $KW.Form.show(previousFormModel);
		        }
		    }
		},
		
		// This condition is valid when the location hash is being changed when the
	    // developer invokes form.show. Every time form.show is invoked the form is constructed.
	    updateURLWithLocation : function(formID){
	      
	        if (formID){
	            window.location.hash = kony.events.browserback.currentHash = this.HASH_PREFIX + formID;
	        }
	    }
	}
};

//
window.onload = function() {
  setTimeout(function(){window.scrollTo(0, 1);}, 100);
}
