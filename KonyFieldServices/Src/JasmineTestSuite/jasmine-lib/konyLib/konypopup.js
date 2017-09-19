$KW.Popup = {

    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){
    
        switch (propertyName) {
			case "ismodal":
			case "transparencybehindthepopup":
            	var opacity = 1 - (widgetModel.transparencybehindthepopup/100);
                var popuplayer = document.getElementById('__popuplayer');
                var popupcontainer = document.getElementById(widgetModel.id + '_container');
				if(popuplayer) {
					if(kony.appinit.isIE7 || kony.appinit.isIE8)
						popuplayer.style.filter = "alpha(opacity=" + (opacity * 100) + ")";
					else
						popuplayer.style.opacity = opacity;
				}
				if(propertyName == "ismodal" && popupcontainer)
					$KW.Popup.modalPopupWorker(widgetModel, popupcontainer);
            break;

        }
        
    },

	render: function(popupModel){
        
        if ($KG["localization"]) {
            //$KI.i18n.saveFormModel(popupModel);
            $KI.i18n.translateFormModel(popupModel);
        }
		
		var popupId = popupModel.id;
		
		if(popupModel.enableScroll)
		{
			$KW.Form.checkBackwardCompatibility(popupModel);
			$KW.Form.render(popupModel);
			// Initialize popup scrollers
            var popupId = $KG.transitAll ? (popupId + "_container") : ($KG.needScroller ? popupId + "_scroller" : popupId);
			if(popupModel.containerheight || popupModel.containerheight === 0){
				$KU.setScrollHeight(popupModel);
			}
            $KW.Scroller.initializeFormScroller(popupId);
			var popupElement = document.getElementById(popupId);
            $KW.Popup.updateZIndex(popupElement);
			return;
		}
		
		var opacity = 1 - (popupModel.transparencybehindthepopup/100);
		/*
		 * Commented 4.1 merge code temporarly
		opacity = (popupModel.ismodal == false) ? 0 : opacity;
		*/
		var bgcolor = (popupModel.ismodal && popupModel.popupbgcolor) ? "background-color:"+ popupModel.popupbgcolor : "";
        var cwtSkin = $KW.skins.getMarPadAdjustedContainerWeightSkin(popupModel);
        var htmlString = "";
        htmlString = "<div id='__popuplayer' style='opacity:" +  opacity + ";" + bgcolor + "'" + (!popupModel.ismodal && !(popupModel.ptran || popupModel.ptranOut) && popupModel.context ? "" : " class='popuplayer absoluteContainer'") + "></div>";
		htmlString += "<div id='" + popupId + "_group' style='z-index:9;position: absolute;' class='" + cwtSkin + "' kformname='" + popupId + "' kwidgettype='Popup'>"; 
		if(popupModel.header){
			htmlString += "<div id='header_container' kformname='" + popupId + "'>";
			htmlString += $KW.Form.generateHeader(popupModel , "header");
			htmlString += "</div>";
		}
		htmlString += "<form id='" + popupId + "' class='" + (popupModel.skin || "") + "' style='" + $KW.skins.getPaddingSkin(popupModel)
					  + (!popupModel.skin ? ";background-color:white" : "") + "'>";
        
		// Iterate through each child widget
        if(popupModel.children){			
			for (var i=0; i<popupModel.children.length; i++) 
			{
				htmlString += $KW.Form.generateWidget(popupModel, popupModel[popupModel.children[i]]);
			}			
		}
		
		htmlString += "</form>";
		if(popupModel.footer){
			htmlString += "<div id='footer_container' kformname='" + popupId + "'>";
			htmlString += $KW.Form.generateHeader(popupModel , "footer"); 	
			htmlString += "</div>";
		}
		htmlString += "</div>";
        
        var popup = document.createElement("div");
        popup.id = popupId + "_container";
		
        popup.className = "popupmain popupcontainer absoluteContainer";
        popup.style.visibility = "hidden";
        popup.innerHTML = htmlString;
        
		$KW.Popup.updateZIndex(popup);

        $KW.Popup.modalPopupWorker(popupModel,popup);

        var main = $KU.getElementById("__MainContainer");
        if (!main) {
			var mainClass = $KG["stickyScroll"] ? "main_container" : "";
			htmlString = "<div id='__MainContainer' class='" + mainClass + "'></div>";
            document.body.innerHTML = htmlString;
            main = $KU.getElementById("__MainContainer");
        }
        main.appendChild(popup);
		
		if($KG["nativeScroll"])
		{
			// if not contexted
			// Save coods
			if(!popupModel.context)
			{
				/*if($KU.iOS4)*/
				{
				
					popup.__scrollTop = document.body.scrollTop;
					// Reposition popup to top
					//window.scrollTo(0, 1);
					setTimeout(function(){window.scrollTo(0, 1)}, 1);
					// hide form, header, footer
					if(opacity == 1)
					{
						var header = document.getElementById("header_container");
						var footer = document.getElementById("footer_container");
						var appmenu = document.getElementById("appmenu_container");
						var form = document.getElementById($KG["__currentForm"].id);
						header && (header.style.display = "none");
						footer && (footer.style.display = "none");
						appmenu && (appmenu.style.display = "none");
						form && (form.style.display = "none");
					}
				}
				/*
				else
					popup.style.position = "fixed !important";
				*/
			}
			
			// cover the entire portion
			var mainContainerHeight = document.getElementById("__MainContainer").clientHeight;
			var __popuplayer = popup.children[0]; //document.getElementById("__popuplayer");
			if(mainContainerHeight < (window.innerHeight || document.body.clientHeight))
			{
				if(opacity == 1 /*&& $KU.iOS4*/ && !popupModel.context)
					popup.style.height = (window.innerHeight || document.body.clientHeight) + "px";
				if(popupModel.ismodal)
					__popuplayer.style.height = (window.innerHeight || document.body.clientHeight) + "px";
			}
			else
			{
				if(opacity == 1 /*&& $KU.iOS4*/ && !popupModel.context)
					popup.style.height = mainContainerHeight + "px";
				if(popupModel.ismodal)
					__popuplayer.style.height = mainContainerHeight + "px";
			}
		}
		
		// Fix for android bleeding bug
		popup.setAttribute("dummy", "");
		popup.children[0].setAttribute("dummy", "");
		popup.children[1].setAttribute("dummy", "");
	},
	
	//Assume a popup is opened n times and closed n times, then zIndex is increased n times!!
	updateZIndex: function (element) {
		if(element)
		{
			$KW.Popup.zIndex = $KW.Popup.zIndex || 10;
			element.style.zIndex = ++$KW.Popup.zIndex;
		}
    },

    modalPopupWorker: function(popupModel,popup) {
    	if(popupModel.ismodal == false || ($KU.isWindowsPhone && $KU.isIE9))
    	{
    		popup.onclick = function(eventObject)
    		{
				eventObject = eventObject || window.event;
				var src = eventObject.target || eventObject.srcElement;
    			if(src.id == "__popuplayer")
    			{
					if(!popupModel.ismodal)
    					$KW.Popup.dismiss(popupModel, true);
    				//if($KU.isWindowsPhone)
    				{
    					kony.events.stopPropagation(eventObject);
						kony.events.preventDefault(eventObject);
    				}
    				
    			}
    		};
    	}
    	else {
    		popup.onclick = null;
    	}
    },

    show: function(popupModel){
	
		var formElem = "";
		if($KG.__currentForm){
			formElem = document.getElementById($KG.__currentForm.id);
			formElem && formElem.setAttribute('aria-hidden', true);
		}
		
		/* Close calendar if any */
		$KW.Calendar && $KW.Calendar.__dp.destroyCalendar();
		
        !kony.system.activity.hasActivity() && $KW.Utils.removeBlockUISkin();

        var popupContainer = $KU.getElementById(popupModel.id + "_container");
        if(popupContainer){
            this.dismiss(popupModel);
        }

		var containerHeight = (popupModel.containerHeight || popupModel.containerHeight === 0) ? parseInt(popupModel.containerheight, 10) : null;
		if(popupModel.header || popupModel.footer)
		{
			if(!containerHeight)
				popupModel.containerheight = "80";
		}
		if(popupModel.layouttype != kony.flex.VBOX_LAYOUT)
			popupModel.containerheight = "80"; //Setting as dummy
			
		if(containerHeight != null && containerHeight >= 0 && !$KU.isBlackBerryNTH && !($KU.isWindowsPhone && $KU.isIE9))
			popupModel.enableScroll = true;
		else
			popupModel.enableScroll = false;
		
		// Render popup
        this.render(popupModel);
		$KW.Form.initializeFlexContainers(popupModel);
		
		var popupContainer = $KU.getElementById(popupModel.id + "_container");
		if($KU.getPlatformName() == "androidtablet")
			popupContainer.style[vendor + 'Transform'] = 'translate3d(0,0,0)';	//To prevent z-index reordering by transform.
		/*var context = popupModel.context;
		if(context && context.widget && context.isenabled && !popupModel.enableScroll) 
		{
			var widget = context.widget;
			var elem = $KU.getNodeByModel(widget);

			if(elem && $KU.getPosition(elem).top == 0 ) {
				popupContainer.style.top = elem.offsetHeight + "px";
			}
		}*/
		
		$KW.TPW.renderWidget(popupModel.id);
		popupelem = popupContainer.children[1];

		if(!$KG["disableTransition"] || $KU.isBlackBerryNTH)
		{
			// Initialize scrollboxes in popup
			$KW.Form.initializeTouchWidgets(popupModel.id)
		}
		else
		{
			popupelem.parentNode.style.visibility = "visible";
			$KW.Form.initializeView(popupModel.id);
		}
        //Added gesture initialization to support touch events to popup and its elements.
        $KW.Utils.initializeGestures(popupModel);
        $KW.Utils.initializeGestures({"formmodel":popupModel});
		
		//Setting marginTop to center the popup
		if(!popupModel.context)  
		{
			// Popup positioned to top center for WP analogous to alert
			if($KU.isWindowsPhone && $KU.isIE9)
			{
				popupelem.style.left = Math.floor((100 - Math.floor((popupelem.offsetWidth * 100) / popupelem.parentNode.offsetWidth)) / 2) + "%";
				popupContainer.style.top = 0;
				window.scrollTo(0,1);
			}
			else
			{
				this.adjustPosition(popupModel, popupelem);
			}			

        }
		
		if(!popupModel.containerHeight && popupModel.containerHeight != 0 && !popupModel.ismodal){
			var scroller = $KU.getElementById(popupModel.id + "_scroller");
			scroller && (scroller.style.overflow = 'visible');
			popupContainer.style.height = 'auto';
		}	
		
		if((!$KG["disableTransition"] || $KU.isBlackBerryNTH))
		{
			this.applyTransition(popupModel, popupelem);
		}  
		
		$KW.Form.accessibilityTitleCall(popupModel, true);
		$KW.Form.accessibilityTitleCall(popupModel, true);		
		formElem && window.setTimeout(function(){formElem.setAttribute('aria-hidden', false);},2000);
    },
	
	adjustPosition: function(popupModel, popupelem){
		var elem = popupModel.ismodal ? popupelem : popupelem.parentNode;
		var contentNode = ((popupModel.containerheight || popupModel.containerheight == 0) ?  $KU.getElementById(popupModel.id + '_group') : $KU.getElementById(popupModel.id + '_scroller')) || popupelem;
		var top = Math.floor((100 - Math.floor((contentNode.offsetHeight * 100) / (window.innerHeight || document.body.clientHeight))) / 2) + "%";
		var left = Math.floor((100 - Math.floor((contentNode.offsetWidth * 100) / (window.innerWidth || document.body.clientWidth))) / 2) + "%";
		// Ignore -ve top margins
		if(parseInt(top, 10) < 0)
			elem.style.top = 0;
		else
			elem.style.top = top;
			
		elem.style.left = left;	
		
	},
	
	dismiss: function(model, flag){
        //model is undefined when the popup is dismissed from form.show
		//var popupelemMain = model ? $KU.getElementById(model.id + "_container") : document.querySelector("div[class='popupcontainer']"); 
		var popupelemMain = model ? $KU.getElementById(model.id + "_container") : document.querySelector("div[class~='popupmain']");
        if(popupelemMain) 
		{
			var popupelem = popupelemMain.children[1];
			if(!model)
				model = window[popupelem.id]; //Getting model for onhide event
            
			if (flag) 
                $KW.Popup.domremove(popupelem.id);
            else 
			{
				if((model.ptranOut && model.ptranOut.toLowerCase() != "none") && (!$KG["disableTransition"]|| $KU.isBlackBerryNTH))
                    this.applyTransition(model, popupelem, true);
                else 
                    $KW.Popup.domremove(popupelem.id);
            }
            var hideref = $KU.returnEventReference(model.onhide || model.onHide);
			hideref && hideref.call(model, model);
        }
    },
	
	domremove: function(id)
	{
        var popupelem = $KU.getElementById(id);
		if (popupelem) 
		{
			id = id.split("_")[0];
			var popupModel = $KG.allforms[id];
			
			if(popupModel.enableScroll)
			{
				$KW.Form.destroyTouchWidgets($KG["transitAll"] ? (popupModel.id + "_container") : ($KG.needScroller ? popupModel.id + "_scroller" : popupModel.id));
			}
			popupelem = $KU.getElementById(id + "_group");
			$KW.Form.destroyTouchWidgets(popupModel.id, true);
			
			var popupelemMain = popupelem.parentNode;
			var opacity = popupelemMain.children[0].style.opacity;
			popupelemMain.parentNode.removeChild(popupelemMain);

			if($KG["nativeScroll"] && !popupModel.context)
			{
				if(opacity == 1)
				{
					var header = document.getElementById("header_container");
					var footer = document.getElementById("footer_container");
					var appmenu = document.getElementById("appmenu_container");
					var form = document.getElementById($KG["__currentForm"].id);
					header && (header.style.display = "");
					footer && (footer.style.display = "");
					appmenu && (appmenu.style.display = "");
					form && (form.style.display = "");
				}
				var scrollTop = popupelemMain.__scrollTop;
				scrollTop && setTimeout(function(scrollTop){return function(){window.scrollTo(0, scrollTop)}}(scrollTop), 1);
				delete popupelemMain.__scrollTop;
			}
		}
    },	
    
    applyTransition: function(model, popupelem, endTrans){
    
        var transitionDuration = (model.transitionduration && model.transitionduration >= 0) ? model.transitionduration : 1;
		
		/*if(endTrans && !model.ismodal)
		{
			popupelem.parentNode.style.height = "";
		}*/
		
		var popupHeight = popupelem.offsetHeight;
		var popupWidth = popupelem.offsetWidth;
		var transtype = !endTrans ? (model.ptran) : (model.ptranOut);
		model.height = Math.floor(popupHeight + (Math.abs($KU.getWindowHeight() - popupHeight) / 2)); //height to travel for transitions
		model.width = Math.floor(popupWidth + ((popupelem.parentNode.offsetWidth - popupWidth) / 2));
		
		if(transtype == "rightCenter"){
			model.width = popupelem.parentNode.offsetWidth + popupWidth;
		}
		
		if(transtype == "bottomCenter"){
			model.height = $KU.getWindowHeight() + popupHeight;
		}
		
		var orientationEvent = ($KU.isOrientationSupported && !$KU.isAndroid) ? "onorientationchange" : "onresize";
		kony.events.addEvent(orientationEvent, "popup", $KW.Popup.adjustPopupDimensions.bind(null, model, popupelem));
		popupelem.style[vendor + 'AnimationDuration'] = transitionDuration + "s";
		
		
		this.setAnchorPosition(model, popupelem, endTrans);

		var konyStyleSheetIndex = $KW.Utils.getKonyStyleSheetIndex(document.styleSheets);
		var lastSheet = document.styleSheets[konyStyleSheetIndex];
				
		
		if(transtype)
		{
			var event = "AnimationEnd";
			if(kony.appinit.isFirefox || $KU.isIE10 || $KU.isIE11)
				event = event.toLowerCase();
			else
				event = vendor + event;
			kony.events.addEventListener(popupelem, event, $KW.Popup.animationEnd(model.id, !!endTrans));
		}
		else
		{
			if(!model.ismodal)
				popupelem.parentNode.style.height = "auto";
		}
		
		switch (transtype) 
		{
			
            case 'topCenter':
            case 'bottomCenter':
	            var topY = (transtype == "topCenter") ? ("-" + model.height) : model.height;
                if (endTrans)
				{
                    lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "endanimation { from { -" + vendor + "-transform: translateY(0px); } to {-" + vendor + "-transform: translateY( " + topY + "px);} }", lastSheet.cssRules.length);
                    popupelem.style[vendor + 'AnimationName'] = model.id + "endanimation";
                }
                else 
				{    
                    lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "animation { from { -" + vendor + "-transform: translateY( " + topY + "px); } to {-" + vendor + "-transform: translateY(0px);} }", lastSheet.cssRules.length);
                    popupelem.style[vendor + 'AnimationName'] = model.id + "animation";
                }
                break;
                
            case 'leftCenter':
            case 'rightCenter':
				var rightX = (transtype == "leftCenter") ? ("-" + model.width) : model.width;
	            if (endTrans) 
				{
                    lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "endanimation { from { -" + vendor + "-transform: translateX( 0px); } to {-" + vendor + "-transform: translateX(" + rightX + "px);} }", lastSheet.cssRules.length);
					popupelem.style[vendor + 'AnimationName'] = model.id + "endanimation";
				}
	            else
				{
	                lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "animation { from { -" + vendor + "-transform: translateX( " + rightX + "px); } to {-" + vendor + "-transform: translateX(0px);} }", lastSheet.cssRules.length);
					popupelem.style[vendor + 'AnimationName'] = model.id + "animation";
				}
                break;
            case 'fadeAnimation':
	            if (endTrans){
                    popupelem.style[vendor + 'AnimationName'] = $KW.formEndTransitionsMatrix[transtype];
				}
	            else 
	                popupelem.style[vendor + 'AnimationName'] = $KW.formTransitionsMatrix[transtype];
                break;
			case 'slidedown':
	            if (endTrans) 
				{
                    lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "endanimation { from {height:" + popupHeight + "px;} to {height:0px;} }", lastSheet.cssRules.length);
	                popupelem.style[vendor + 'AnimationName'] = model.id + "endanimation";
	            }
	            else 
				{
					popupelem.style.overflow = "hidden";
					lastSheet.insertRule("@-" + vendor + "-keyframes " + model.id + "animation { from {height:0px;} to {height:" + popupHeight + "px;} }", lastSheet.cssRules.length);
	                popupelem.style[vendor + 'AnimationName'] = model.id + "animation";
	            }
                break;
        }
		
		popupelem.parentNode.style.visibility = "visible";
    },
	
	setAnchorPosition: function(model, popupelem, endTrans)
	{
		var context = model.context;		
        if (context && context.widget) 
		{
            if(model.enableScroll && !model.ismodal)
				popupelem = popupelem.parentNode;
			var widget = context.widget;
			var elem;
			if(widget.wType == "Form")
				elem = document.getElementById(widget.id);
			else
				elem = $KU.getNodeByModel(widget);
            if (elem && widget.wType != "Form") {
				var scroller = $KU.getElementById(model.id + "_scroller");
				var popupHeight = model.enableScroll && model.ismodal ? scroller.offsetHeight : popupelem.offsetHeight;
				var popupWidth = popupelem.offsetWidth;
				var transtype = !endTrans ? (model.ptran) : (model.ptranOut);
                var pos = $KU.getPosition(elem);
				if(!$KG.relativeScroll && !$KG.nativeScroll){
					var currentForm = $KG.__currentForm;
					var scrollerInstance = $KG[currentForm.id + "_scroller"];
					if(scrollerInstance){
						var top = scrollerInstance.scrollToElement(elem, '', true);
						if(top){
							top = Math.abs(scrollerInstance._offset(elem).top) - Math.abs(top);
							pos.top = top;
						}
					}
				}	
				var elmViewportTop = pos.top;
				var elmViewportBottom;
				var anchorPos = $KU.getAnchorPosition(model,popupelem);
				
                if (context["anchor"] == "bottom") 
				{
                    popupelem.style.left = anchorPos.leftPos + 'px';
					elmViewportBottom = elmViewportTop + elem.clientHeight; //Top + Height
					if($KG.nativeScroll)
					{
						// Native sroll has always room to fit
						popupelem.style.top = elmViewportBottom + "px"; 
						model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportBottom) : (popupHeight + elmViewportBottom); 
					}
					else
					{
					
					if(context["isenabled"] == true && elmViewportTop == 0){
						popupelem.style.top = 0;
						model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportBottom) : (popupHeight + elmViewportBottom); 
					}
					else if ((window.innerHeight || document.body.clientHeight) == elmViewportBottom) { //If the anchored widget is at viewport bottom
						popupelem.style.bottom = "0px"; 
						model.height = (transtype == "bottomCenter") ? popupHeight : (popupHeight + elmViewportBottom); //Else topCenter
					}
					else if((window.innerHeight || document.body.clientHeight) - elmViewportBottom > popupHeight){ //If the popup has enough space at the anchored widget bottom
						popupelem.style.top = elmViewportBottom + "px"; 
						model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportBottom) : (popupHeight + elmViewportBottom); 
					}
					else if(elmViewportTop > popupHeight){ //Move it to top if there is no space at bottom 
						popupelem.style.top = (elmViewportTop - popupHeight) + "px"; 
						model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportTop) : (popupHeight + elmViewportTop); 
					}
					else
					{//Center the popup if there is no room to fit at top/bottom
                        popupelem.style.top = Math.floor((100 - Math.floor((popupHeight * 100) / popupelem.parentNode.offsetHeight)) / 2) + "%";
						popupelem.style.left = Math.floor((100 - Math.floor((popupWidth * 100) / popupelem.parentNode.offsetWidth)) / 2) + "%";
						
					}
					}					
				}
				if (context["anchor"] == "top")
				{
					popupelem.style.left = anchorPos.leftPos + 'px';
					// extreme top
					if(!elmViewportTop)
					{
						popupelem.style.top = 0;
					}
					else if(elmViewportTop > popupHeight)
					{
						popupelem.style.top = (elmViewportTop - popupHeight) + "px"; 
						model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportTop) : (popupHeight + elmViewportTop); 
					}
					else {  //Center the popup if there is no room to fit at top/bottom
                        popupelem.style.top = Math.floor((100 - Math.floor((popupHeight * 100) / popupelem.parentNode.offsetHeight)) / 2) + "%";    
						popupelem.style.left = Math.floor((100 - Math.floor((popupWidth * 100) / popupelem.parentNode.offsetWidth)) / 2) + "%";
					}		
				}
				if (context["anchor"] == "left" || context["anchor"] == "right")
				{
					popupelem.style.top = anchorPos.topPos + 'px';
					popupelem.style.left = anchorPos.leftPos + 'px';				
				}
            }
            else if (elem && widget.wType == "Form") {
				if(!$KG.relativeScroll && !$KG.nativeScroll){
					var pos = $KU.getPosition(document.getElementById(elem.id+"_scroller"));
				}else{
					var pos = $KU.getPosition(elem);
				}
				var elmViewportTop = pos.top;
				var elmViewportBottom = elmViewportTop + pos.height;
				var scroller = $KU.getElementById(model.id + "_scroller");
				var popupHeight = scroller.offsetHeight;//model.enableScroll && model.ismodal ? scroller.offsetHeight : popupelem.offsetHeight;
				var popupWidth = scroller.offsetWidth; //popupelem.offsetWidth;
				var transtype = !endTrans ? (model.ptran) : (model.ptranOut);
                
                if (context["anchor"] == "bottom") 
				{
                    popupelem.style.top = window.innerHeight - popupHeight+"px";
					popupelem.style.left = "0px";
					model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportBottom) : (popupHeight + elmViewportBottom)
				}
				
				if (context["anchor"] == "top")
				{
					popupelem.style.top = "0px";
					popupelem.style.left = "0px";
					model.height = (transtype == "bottomCenter") ? (popupHeight + (window.innerHeight || document.body.clientHeight) - elmViewportTop) : (popupHeight + elmViewportTop); 
				}
				if (context["anchor"] == "left")
				{
					popupelem.style.top = "0px";
					popupelem.style.left = "0px";
				}
				
				if(context["anchor"] == "right"){
					popupelem.style.top = "0px";
					popupelem.style.right = "0px";
				}
			}
				popupelem.style.position = "absolute";
            }
		
		if(!model.ismodal)
		{
			var popupContainer = $KU.getElementById(model.id + "_container");
			if(popupContainer && !(model.containerHeight)){
				popupContainer.style.height = "auto";
			}
		}
	},
    
	adjustPopupDimensions: function(model, popupelem)
	{
		if(!document.getElementById(popupelem.id))
			return;
			
		// popup_group
		/*if(popupelem.id.split("_")[1] == "group")
		{
			var height = parseInt(model.containerheight, 10);
			var width = $KW.skins.getMarPadAdjustedContainerWeightSkin(model).substr(3);
			var style = "width:" + width + "% !important;" + "height:" + height + "% !important;";
			if(width != 100)
			{
				var marginLeft = (window.innerWidth || document.body.clientWidth) * width / (2 * 100);
				style += "left:50%;margin-left:-" + marginLeft + "px;";
			}
			if(height != 100)
			{
				var marginTop = (window.innerHeight || document.body.clientHeight) * height / (2 * 100);
				style += "top:50%;margin-top:-" + marginTop + "px;";
			}
			style += "visibility:visible;"
			
			if(model.ismodal)
				popupelem.style.cssText = style;
			else
				popupelem.parentNode.style.cssText = style;
		}
		else if(!model.context){
			$KW.Popup.adjustPosition(model, popupelem);
		}*/
		var popupContainer = $KU.getElementById(model.id + "_container");
		$KW.ScrollBox.adjustDimensionsByNode(model, model.ismodal ? popupContainer.childNodes[1] : popupContainer);
		if(!model.context){
			$KW.Popup.adjustPosition(model, popupelem);
		}

		$KW.Popup.setAnchorPosition(model, popupelem);
		
		// updating __popuplayer height on orientation
		if($KG["nativeScroll"] && model.ismodal)
		{
			var __popuplayer = popupelem.previousSibling;
			var mainContainerHeight = document.getElementById("__MainContainer").clientHeight;
			if(mainContainerHeight < (window.innerHeight || document.body.clientHeight))
				__popuplayer.style.height = (window.innerHeight || document.body.clientHeight) + "px";
			else
				__popuplayer.style.height = mainContainerHeight + "px";
		}
		var scrollInstance = $KG[model.id + "_scroller"];
		scrollInstance && scrollInstance.refresh();
	},
	
    animationEnd: function(id, endTrans){
    
        return function(){
		
			var event = "AnimationEnd";
			if(kony.appinit.isFirefox || $KU.isIE10 || $KU.isIE11)
				event = event.toLowerCase();
			else
				event = vendor + event;
			kony.events.removeEventListener(popupelem, event, arguments.callee);
			var popupelem = $KU.getElementById(id);
			var model = $KG.allforms[id];
			
			if(popupelem)
				if(endTrans)
					$KW.Popup.domremove(id);
				else
					if(!model.ismodal)
						popupelem.parentNode.style.height = "auto";
			
			popupelem.style[vendor + 'AnimationName'] = "";
							
			//Removing the key frames
            var className = endTrans ? id + "endanimation" : id + "animation";
			var styleSheetIndex = $KW.Utils.getKonyStyleSheetIndex(document.styleSheets);
			var lastSheet = document.styleSheets[styleSheetIndex];
            var index = lastSheet.cssRules.length - 1;
            if(lastSheet.cssRules[index] && lastSheet.cssRules[index].name == className){
				if(lastSheet.deleteRule)
					lastSheet.deleteRule(index);
				else
					lastSheet.removeRule(index);
			}
        };
    },
  
    setcontext: function(popupModel, context){
	
        if (popupModel instanceof Object && context instanceof Object) {
            popupModel.context = context;
        }
    },
      
    add: function() {
        var formmodel = arguments[0];
        if("add" in formmodel) {           
            var widarray = [].slice.call(arguments,1);
            formmodel.add(widarray)
        } 
    },

    addAt: function(popupModel,widgetref, index) {
       if(widgetref == null) return;
       popupModel.addAt &&  popupModel.addAt(widgetref, index);
    },

    widgets: function(popupModel) {
        if(popupModel.widgets) return popupModel.widgets();
    },

    remove : function(popupModel,widgetref){
       popupModel.remove && popupModel.remove(widgetref);
    },
    
    removeAt : function(popupModel,index){
		popupModel.removeAt && popupModel.removeAt(index);
    },
    
    scrollToBeginning : function(popupModel){  
		if(!popupModel)
			return;
		// Only scrollable popups can be scrolled
		var scrollerInstance = $KG[popupModel.id + '_scroller'];
		var top = ($KU.isWindowsPhone && $KU.isIE9) ? 0: 1;
		scrollerInstance ? scrollerInstance.scrollTo(0, scrollerInstance.minScrollY, 500) : $KW.Utils.scrollToElement(document.getElementById(popupModel.id) || null, 500, null, top);
    },
    
    scrollToEnd : function(popupModel){       
		if(!popupModel)
			return;
		// Only scrollable popups can be scrolled
		var scrollerInstance = $KG[popupModel.id + '_scroller'];
		if(scrollerInstance){
			scrollerInstance.scrollTo(0, scrollerInstance.maxScrollY, 500);
		}else{
			var bottom = document.body.scrollHeight - (!($KU.isWindowsPhone && $KU.isIE9) ? (window.innerHeight || document.body.clientHeight) : 0);
			$KW.Utils.scrollToElement(document.getElementById(popupModel.id) || null, 500, null, bottom);
		}
    },
	
    scrollToWidget: function(popupref, widgetref){
		$KW.Widget.setfocus(widgetref, popupref);
    },

    handleshow : function(popupModel) {
        if("show" in popupModel) 
            popupModel.show();
    },

    destroy: function(model){
    	if("destroy" in model)
	   		 model.destroy(model);
    },
	
	dismissPopup: function(pf)
	{
		if(!pf || window[pf].wType != "Popup")
		{
			var popup = document.querySelector("div.popupcontainer");
			if(popup)
			{
				var popupId = popup.id.split("_")[0];
				if(window[popupId] && window[popupId].wType == "Popup")
				{
					if(!window[popupId].ismodal){
						$KW.Popup.dismiss(null, true);
						return true;
					}	
				}
			}
		}
		return false;		
	}
}