$KW.Form = {

	initialize: function(){
		kony.events.addEvent("onorientationchange", "Form", this.orientationHandler);
    },
	
    initializeView: function(formId, isForm) {
		
        //Adjusting width/height of the below widgets once the dom is rendered.
		var widgetsSupported = [$KW.Calendar, $KW.HStrip, $KW.Segment, $KW.ScrollBox, $KW.TabPane, $KW.Line, $KW.Switch, $KW.TextField, $KW.DataGrid, $KW.Media, $KW.MenuContainer, $KW.ComboBox, $KW.Slider, $KW.Map, $KW.FlexContainer, $KW.FlexScrollContainer];
        for (var i = 0; i < widgetsSupported.length; i++) {
            if (widgetsSupported[i]) {
                widgetsSupported[i].initializeView && widgetsSupported[i].initializeView(formId);
            }
        }
		if(isForm){
            $KW.Form.resizeForm(formId);
        }
			
	 },
	
    updateView : function(formModel, propertyName, propertyValue, oldPropertyValue)
    {
        switch (propertyName) {
            case "title":
                document.title = propertyValue || $KG.apptitle || $KG.appid;
                formModel.i18n_title = "";
                break;
			  
			case "padding":
				var element = document.getElementById(formModel.id);
				if(!$KG.needScroller)
					element && (element.style[propertyName] = $KU.joinArray(propertyValue, "% ") + "%");
				break;
        }
    },

    orientationHandler: function(formId, orientation) {
		var formModel = $KG.allforms[formId];
		if (formModel) {
			$KW.Form.setFormDimensions(formModel);
			$KW.Form.initializeFlexContainers(formModel);
			var formref = $KU.returnEventReference(formModel.onorientationchange);
			formref && formref.call(formModel,formModel, orientation);
		}
    },
	
	setFormDimensions: function(formModel){
		if(formModel.layouttype != kony.flex.VBOX_LAYOUT){
			var formNode = document.getElementById(formModel.id);
			var scrollerNode = document.getElementById(formModel.id + "_scroller");
			if(formNode && scrollerNode){
				formNode.style.height = scrollerNode.offsetHeight + 'px';
				formNode.style.width = scrollerNode.offsetWidth + 'px';
			}
		}
	},

    generateAppmenu: function(formModel)
    {
		var more_container = document.getElementById('appmenumore_container');
		if(more_container)
			more_container.parentNode.removeChild(more_container);
         if($KG.__appmenu && formModel.needappmenu)
            return $KW["Appmenu"] && $KW["Appmenu"].render($KG.__appmenu);
        else
            return "";
    },
	
	initializeTemplates: function(tempID){
		$KW.touch.computeSnapWidths(tempID, "Segment");
		this.initializeTouchWidgets(tempID);
	},

	initializeTouchWidgets: function(formId, isForm){
        $KW.Scroller.initializeScrollBoxes(formId); //Initializes form scroller and scroll box widgets.
        $KW.Scroller.initializePageViews(formId); //Initializes pageviews
		this.initializeView(formId, isForm); 
    },
	
	initializeFlexContainers: function(formModel){
		if(!formModel)
			return;
		var formId = $KG.needScroller ? formModel.id + "_container" : formModel.id;
		$KW.touch.computeSnapWidths(formId, "Segment"); //This needs to be called before initializing flexContainers to get proper widget frame in flex layout engine	
		if(formModel.layoutType != kony.flex.VBOX_LAYOUT) 
			$KW.FlexContainer.forceLayout(formModel);
		else
			this.initializeAllFlexContainers(formModel);
		
		if(formModel.headers && formModel.headers.length > 0)
			this.initializeAllFlexContainers(formModel.headers[0]);
		if(formModel.footers && formModel.footers.length > 0)
			this.initializeAllFlexContainers(formModel.footers[0]);					
	}, 
	
	initializeAllFlexContainers: function(containerModel){
		var conatinerType = containerModel.wType;
		if(conatinerType == "FlexContainer" || conatinerType == "FlexScrollContainer")
			containerModel.forceLayout();
		var wArray = containerModel.ownchildrenref;
		for(var i=0; i < wArray.length; i++) {
			var widgetModel = wArray[i];				
			var wType = widgetModel.wType;				
			switch(wType) {        
				case "FlexContainer":
				case "FlexScrollContainer":
					widgetModel.forceLayout();
					break;
				case "Segment":
					var segNode = $KU.getNodeByModel(widgetModel);
					segNode && $KW.FlexContainer.adjustFlexContainers(segNode.id, 'FlexContainer');
					if(widgetModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW)
						$KW.touch.computeWidths(segNode, widgetModel);
					break;
			}
		}
	},

    destroyTouchWidgets: function(formId, isNonForm){
	
        if(!isNonForm)
			$KW.Scroller.destroyFormScroller(formId);
		$KW.Scroller.destroyScrollBoxes(formId);
        $KW.Scroller.destroyImageStripStripViews(formId);
        $KW.Scroller.destroyPageViews(formId);
    },
	
	formRendered: function(formId){	
		kony.events.browserback.updateURLWithLocation(formId);
		$KW.Form.enlistSystemTimerActions();
        if($KU.isWindowsPhone && $KU.isIE9)
			window.scrollTo(0, 0);
		else if($KG.nativeScroll)
            window.scrollTo(0, 1);
	},

    resizeForm: function(formId, orientation)
    {
        var formModel = $KG.allforms[formId];
		//setting bodys min-height to viewport height during native scroll. Setting 10px more for windows7.5 for its not giving correct viewport height.
		if($KG["nativeScroll"])
		{
			var viewPortHeight = ($KU.isWindowsPhone && $KU.getPlatform().version == "7.5") ? ($KW.Utils.getViewPortHeight()+10) : $KW.Utils.getViewPortHeight();
			document.body.style.minHeight = viewPortHeight+"px";
		}

		if(kony.appinit.isTablet && kony.appinit.isAndroid && (kony.constants.APPLICATION_MODE_HYBRID || kony.constants.APPLICATION_MODE_WRAPPER)){
			document.body.style.minHeight = (screen.height / window.devicePixelRatio - window.screenTop) + 'px';
		}
		
		if(formModel.resizeForm && $KG["nativeScroll"]){  
			var windowHeight = window.innerHeight || document.body.clientHeight;
			var formNode = document.getElementById(formId);
			var totalHeight, formHeight;
			
			var totalHeight = __MainContainer.clientHeight;
			var formHeight = formNode.clientHeight;
			
			// Persist height
			if(!orientation)
			{
				totalHeight = __MainContainer.__clientHeight = __MainContainer.clientHeight;
				formHeight = formNode.__clientHeight = formNode.clientHeight;
			}
			else
			{
				totalHeight = __MainContainer.__clientHeight;
				formHeight = formNode.__clientHeight;
			}
			
			// Adjust height
			if(totalHeight < windowHeight)
			{
				var bias = windowHeight - totalHeight;
				formHeight = formHeight + bias;
				formNode.style.minHeight = formHeight + "px";

				if($KU.isWindowsPhone && $KU.isIE9)
					setTimeout(function(){window.scrollTo(0, 0)}, 10);
				else
					setTimeout(function(){window.scrollTo(0, 1)}, 10);
			}
		}	
    },

	
	enlistSystemTimerActions: function() {    
	    //Hash change event on window    
	    if ($KU.hashChange) {
	        kony.events.addEventListener(window, 'hashchange', kony.events.browserback.handleBrowserBackEvent);
	    }
	    else {
	        var browserBackAction = new kony.system.timers.TimerAction(kony.events.browserback.handleBrowserBackEvent, 300);
	        kony.system.timers.registerTimerAction(browserBackAction);
	    }
	},

	delistSystemTimerActions: function(){
    	kony.system.timers.clearTimerAction();
	},
	
    addChild : function(formModel, wArray, bVisibility)
	{
        if(($KG["__currentForm"] && formModel.id == $KG["__currentForm"].id) || formModel.wType == 'Popup'){

			var formNode = $KU.getElementById(formModel.id);
			
			
            if(!formNode) 
				return;
				
			var htmlString = "";
			if(wArray.length > 0){
				htmlString = this.renderChildren(formModel, wArray);
			} 
			
			// Add to DOM
			var screenlLevelWidgetModel = $KU.getScreenLevelWidgetModel(formModel);
			//Show first SLW if SLW is present in the form model.
			if(screenlLevelWidgetModel && (screenlLevelWidgetModel.containerheight == null || !(screenlLevelWidgetModel.containerheight >= 0 ))){
				formNode.innerHTML = htmlString;
			}
			else{
				var wrapper = document.createElement("div");
				wrapper.innerHTML = htmlString;
				if(bVisibility)
				{
					formNode.innerHTML = htmlString;
				}
				else
				{
					while(wrapper.children.length > 0){
						formNode.appendChild(wrapper.children[0]);
					}
				}
			}
			(formModel.layouttype != kony.flex.VBOX_LAYOUT) && $KW.FlexContainer.adjustFlexContainer(formModel);
			$KW.Utils.initializeNewWidgets(wArray);
        }    
    },

    addChildAt : function(formModel, widget, index)
	{
        if(($KG["__currentForm"] && formModel.id == $KG["__currentForm"].id) || formModel.wType == 'Popup')
        {
   			var formNode = $KU.getElementById(formModel.id);
			

            if(!formNode) 
				return;
				
			var screenlLevelWidgetModel = $KU.getScreenLevelWidgetModel(formModel);
			var screenlLevelWidgetNode = $KU.getNodeByModel(screenlLevelWidgetModel);
			if(screenlLevelWidgetNode)
				return;
			
			var htmlString = "";
			if(formModel.layouttype == kony.flex.VBOX_LAYOUT)			
				htmlString = $KW.Form.generateWidget(formModel, formModel[widget.id]);
			else	
				htmlString = $KW.FlexContainer.renderChildren(formModel, [formModel[widget.id]], {});	
            
			// Add to DOM
			var outerDiv = document.createElement("div");
            outerDiv.innerHTML = htmlString;
			
			if(screenlLevelWidgetModel)
			{
				formNode.innerHTML = htmlString;
				$KW.Scroller.destroyFormScroller(formNode.id);
				$KW.Utils.initializeNewWidgets([widget]);
				return;
			}
			
			formNode.insertBefore(outerDiv.childNodes[0], formNode.children[index] || null);
			(formModel.layouttype != kony.flex.VBOX_LAYOUT) && $KW.FlexContainer.adjustFlexContainer(formModel);
			$KW.Utils.initializeNewWidgets([widget]);
        }
    },

    DOMremove : function(formModel, widgetref){
        if($KG["__currentForm"] && (formModel.id == $KG["__currentForm"].id || formModel.wType == 'Popup') && widgetref)
        {
			if(formModel.layouttype == kony.flex.VBOX_LAYOUT){
				var node = document.getElementById(formModel.id + "_" + widgetref.id);
				if(node) {
					node = $KU.returnParentChildBloatAdjustedNode(widgetref, node);
					node.parentNode.removeChild(node);
				}
			}
			else{
				var node = $KW.Utils.getWidgetNode(widgetref);
				if(node){
					node = node.parentNode;
					node.parentNode.removeChild(node);
				}
			}
        }
    },
    
    DOMremoveAt: function(formModel, index){
        $KW.Form.DOMremove(formModel, formModel.ownchildrenref[index]);
    },
	
	DOMremoveAll: function(formModel){
		var form = document.getElementById(formModel.id);
		if(form){
			form.innerHTML = "";
		}
	},

	//Form Methods
    add: function() {
        var formmodel = arguments[0];
        if("add" in formmodel) {           
            var widarray = [].slice.call(arguments,1);
            formmodel.add(widarray)
        } 
    },

    addAt: function(formModel, widgetref, index) {
        if(widgetref == null) return;
        formModel.addAt && formModel.addAt(widgetref, index);
    },

    remove: function(formModel, widgetref) {
        formModel.remove && formModel.remove(widgetref);
    },

    removeAt: function(formModel, index){
         if(formModel.removeAt)
            return  formModel.removeAt(index);
    },

    widgets: function(formModel) {
         return formModel.widgets && formModel.widgets();
    },

    scrollToBeginning : function(formModel){       
		var scrollerInstance = $KG[$KG["__currentForm"].id + '_scroller'];
		var top = ($KU.isWindowsPhone && $KU.isIE9) ? 0: 1;
		scrollerInstance ? scrollerInstance.scrollTo(0, scrollerInstance.minScrollY, 500) : $KW.Utils.scrollToElement(null, 500, null, top);
    },
    
    scrollToEnd : function(formModel){ 
        var scrollerInstance = $KG[$KG["__currentForm"].id + '_scroller'];
		scrollerInstance ? scrollerInstance.scrollTo(0, scrollerInstance.maxScrollY, 500) :$KW.Utils.scrollToElement(null, 500, null, document.body.scrollHeight - (!($KU.isWindowsPhone && $KU.isIE9) ? (window.innerHeight || document.body.clientHeight) : 0));
    },
    
    scrollToWidget: function(formref, widgetref){
       $KW.Widget.setfocus(widgetref);
    },

    destroy : function(formID) {
        if(formID && "destroy" in formID) formID.destroy();
    },

    getCurrentForm: function(){
        return $KG["__currentForm"];
    },

    getPreviousForm: function(){
        return $KG["__previousForm"];
    },
	
    //Native Mapping Function
    handleshow : function(formModel) {
        if("show" in formModel) 
            formModel.show();
    }, 
	
	//
	generateWidget: function(formModel, childModel)
	{
		var context = new $KW.WidgetGenerationContext(formModel.id);
		var childType = childModel.wType;
		var htmlString = "";
		
		//Line widget is rendered directly on to a form without any extra table structure if it is a top level element 
		if (childType == "Line" || childType == "HBox" || childType == "ScrollBox" || childType == "TabPane" || childType == "FlexContainer"|| childType == "FlexScrollContainer") 
		{
			context.setTopLevelBox(true);
			htmlString += $KW[childType] && $KW[childType].render(childModel, context);
		}
		else 
		{
			htmlString += "<div class = 'ktable kwt100' style='table-layout:fixed;'>";
			htmlString += "<div class = 'krow kwt100' >";
			// ??
			if(childType == "Image")
				childModel.containerweight = 100;
			var layoutDirection = $KW.skins.getWidgetAlignmentSkin(childModel);
			htmlString += "<div class = 'kcell kwt100 " + layoutDirection + "' " + (formModel.wType == "Popup" ? style="'" + $KW.skins.getChildMarginAsPaddingSkin(childModel) + "'" : "") + ">";
			htmlString += $KW[childType] && $KW[childType].render(childModel, context);
			htmlString += "</div></div></div>";
		}
		return htmlString;
	},
	
/*************************************-----SPA-----***************************************************************/
    render: function(formModel)
    {
        var htmlString = "";
        var formId = formModel.id.trim();
        this.createFormSkeleton(formModel);
		var isForm = (formModel.wType == "Form") ? true: false;
		
        var header_wrapper, form_wrapper, footer_wrapper, appmenu_wrapper;
        
        if($KG.needScroller)
        {
            header_wrapper = $KU.getElementById(formId + "_header");
            footer_wrapper = $KU.getElementById(formId + "_footer");
        }
        else
        {
            header_wrapper = $KU.getElementById("header_container");
            footer_wrapper = $KU.getElementById("footer_container");
        }

        form_wrapper = $KU.getElementById(formId);
        isForm && (appmenu_wrapper = $KU.getElementById("appmenu_container"));

        //Header
        var headerStr = this.generateHeader(formModel, "header");
        //header_wrapper.innerHTML = headerStr; // Moving it to below. TODO: Need to investigate the actual root cause for the support ticket #3242.    

        //removing previous form A11y hint property.
        if($KG["__previousForm"]) {
            var prevformhintid = $KG["__previousForm"].id + "_hint";           
             var hintwraper = document.getElementById(prevformhintid);
            if(hintwraper) {
                document.body.removeChild(hintwraper);
            }
        }  
		
        // Form
        var formStr = this.generateForm(formModel);
        form_wrapper.innerHTML = formStr;
		
        // Footer
        var footerStr = this.generateHeader(formModel, "footer");
        footer_wrapper.innerHTML = footerStr;
		
        // Appmenu
		if(isForm)
		{
			var appmenuStr = this.generateAppmenu(formModel);
			appmenu_wrapper.innerHTML = appmenuStr;
			var appmenuNode = $KU.getElementById("konyappmenudiv");
			if(appmenuNode && !$KG["nativeScroll"] && $KU.isIOS7)
				appmenuNode.style.position = "fixed";
		}
		
        if($KW.Map && $KW.Map.isMainContaineraVailable == false)
			$KW.Map.loadMapScripts();

        header_wrapper.innerHTML = headerStr;  
		
        // Initialize touch widgets in header n footer
        (headerStr && formModel.header) && this.initializeTemplates(formModel.header);
        (footerStr && formModel.footer) && this.initializeTemplates(formModel.footer);
        
		if(isForm)		
		{
			// title
			document.title = ($KI.i18n && $KI.i18n.getI18nTitle(formModel)) || $KG.apptitle || $KG.appid;
			
			if(($KU.isWindowsPhone || $KU.isWindowsTablet) && !$KU.nativeScroll)
				document.documentElement.style.msTouchAction = "none";
			else
				document.documentElement.style.msTouchAction = "auto";
		}
    },
    
    createFormSkeleton: function(formModel)
    {
        // TODO: Currently transitions are not supported in native mode
        var formId = formModel.id;
        var mainContainer = document.getElementById("__MainContainer");
		var isForm = (formModel.wType == "Form") ? true: false;		
		var style = "";
		var className = "";
		var htmlString = "";
		
		if($KG.needScroller)
			className = "absoluteContainer";
		else
			className = formModel.skin || "";
			
		className += " hidden " + (isForm ? "" : "popupcontainer popupmain");

		
		if(!isForm)
		{
			var width = $KW.skins.getMarPadAdjustedContainerWeightSkin(formModel).substr(3);
			style += "width:" + width + "% !important;";
			
			// center header / footer / popup
			/*if(formModel.containerheight && formModel.containerheight == 0)
			{
				var height = parseInt(formModel.containerheight, 10);
				style += "height:" + height + "% !important;";
			}*/
			
		}
	
        // formContainer
        if($KG.needScroller) 
        {
			htmlString += "<div id='" + formModel.id + "_container' class='" + className + "'" + (!isForm && !formModel.ismodal ? "style='" + style + "'" : "") + ">";
		
			if(!isForm)
			{			
				var opacity = 1 - (formModel.transparencybehindthepopup / 100);
				var bgcolor = (formModel.ismodal == true && formModel.popupbgcolor) ? "background-color:" + formModel.popupbgcolor : "";
				htmlString += "<div id='__popuplayer' style='opacity:" +  opacity + ";" + bgcolor + "'" + (formModel.ismodal == false && !(formModel.ptran || formModel.ptranOut) && formModel.context ? "" : " class='absoluteContainer popuplayer'") +  "></div>"
				
				if(!formModel.ismodal){
					style = "z-index:8;width:100%;";
					if(formModel.containerheight)
						style += "height:100%";
				}	
				
				//htmlString += "<div id='" + formModel.id + "_group' class='" + groupCSS + "' style='" + style + "'></div>";
				htmlString += "<div id='" + formModel.id + "_group' style='" + style + ";position: absolute;' kformname='" + formModel.id + "' kwidgettype='Popup'></div>";
			}
			
			htmlString += "</div>";
			
            var div = document.createElement('div');
            div.innerHTML = htmlString;
            mainContainer.appendChild(div.childNodes[0]);
        }
        
        if(!formModel.dockableheader && $KG.needScroller)
            this.generateScroller(formModel);

        this.generateHeaderWrapper(formModel, "header");
        if(formModel.dockableheader == true && $KG.needScroller)
-            this.generateScroller(formModel);
        this.generateFormWrapper(formModel);
        this.generateHeaderWrapper(formModel, "footer");
        isForm && this.generateAppmenuWrapper(formModel);
    },
    
    generateHeaderWrapper: function(formModel, type)
    {
        var isForm = (formModel.wType == "Form") ? true: false;
		if($KG.nativeScroll || $KG.useMixedScroll)
        {
            var container = $KU.getElementById(type + "_container");
            if(container){
                container.parentNode.removeChild(container);
            }
        }
        
        // TODO: Reuse header n footer if already present and in the same docked mode
        var formId = formModel.id;
        var dockable = true;
        if((type == "header" && !formModel.dockableheader) || (type == "footer" && !formModel.dockablefooter))
            dockable = false;
    
        var className = type + "_scroller";
        if($KG["nativeScroll"] || !dockable)
            className += " relativePos";    
        else
            className += " absolutePos";

        var div = document.createElement('div');
        div.setAttribute('id', $KG.needScroller ? formId + "_" + type : type + "_container");
		div.setAttribute("kformname", formId);
		div.className = className;

        var formContainer;
           
        if(!isForm)
			formContainer = document.getElementById(formId + "_group");
		else if($KG.needScroller)
            formContainer = document.getElementById(dockable ? formId + "_container" : formId + "_scrollee");
        else
            formContainer = document.getElementById("__MainContainer");
        
        formContainer.appendChild(div);
    },
    
    generateScroller: function(formModel)
    {
        var htmlString = "";
		var style = "";
        var formId = formModel.id;
        var skin = formModel.skin || "";
        var isForm = (formModel.wType == "Form") ? true: false;

		htmlString += "<div  id='" + formId + "_wrapper'>";

        // TODO: HACK for contnet not visible on droid mixed mode
        if($KU.isAndroid && ($KG["appmode"] == constants.APPLICATION_MODE_HYBRID || $KG["appmode"] == constants.APPLICATION_MODE_WRAPPER))
        {
            style = "style='overflow:visible;'";
        }
        
		var swipeDirection = (formModel.layouttype == kony.flex.VBOX_LAYOUT) ? "vertical" : $KW.stringifyScrolldirection[formModel.scrolldirection];
		htmlString += "<div  id='" + formId + "_scroller' class='form_scroller " + skin + "' kwidgettype='KFormScroller' name='touchcontainer_KScroller' widgetType='form' swipeDirection ='" + swipeDirection + "'" + style + (!isForm ? " kformname='" + formId +  "'" : "") + ">";
		htmlString += "<div id='" + formId + "_scrollee' class='form_scrollee' kwidgettype='KTouchscrollee' style='" + (formModel.layouttype != kony.flex.VBOX_LAYOUT ? "height:100%" : "") + "'>";
		htmlString += "</div></div>";
        
        htmlString += "</div>";
        
        var div = document.createElement('div');
        div.innerHTML = htmlString;
        
        var formContainer;
        if(isForm)
			formContainer = document.getElementById(formId + "_container");
		else
			formContainer = document.getElementById(formId + "_group");

        formContainer.appendChild(div.childNodes[0]);
    },
    
    generateFormWrapper: function(formModel)
    {
        var htmlString = "";
        var formId = formModel.id;
		var isForm = (formModel.wType == "Form") ? true: false;
        var flexStyle = (formModel.layouttype != kony.flex.VBOX_LAYOUT ? ";position:relative;height:100%;" : "");
        // Set position: absolute to enable transitions
        var style = "style='border:none;table-layout:fixed;" + $KW.skins.getPaddingSkin(formModel) + flexStyle + ";'";
        var layoutClass = "";
		
        if($KG.nativeScroll){
            layoutClass = "form_nativeScroller ";
			if($KU.isWindowsPhone && $KU.isIE9)
				layoutClass += " hidden ";
		}	
		
        var fClass = "class='" + "ktable kwt100 " + layoutClass + "'";
        
		if(isForm)
			htmlString += "<form id='" + formId + "' action='javascript:;' " + fClass + " " + style + "></form>";
		else
		{
			htmlString += "<form kwidgettype='Popup' id='" + formId + "' action='javascript:;'" + " class='kwt100' style='z-index:9;" + $KW.skins.getPaddingSkin(formModel) + ((!formModel.context || !formModel.context.dockable) ? "xmax-height:80%;xoverflow:auto;xposition: absolute;" : "overflow-x:hidden;overflow-y:auto;xposition:relative;") + "" + (!formModel.skin ? "background-color:white" : "") + flexStyle + "'>";
        }
		
        var div = document.createElement('div');
        div.innerHTML = htmlString;
        
        if($KG.nativeScroll)
			formContainer = document.getElementById("__MainContainer");
        else
            formContainer = document.getElementById(formId + "_scrollee");
        
        formContainer.appendChild(div.childNodes[0]);
    },
    
    generateAppmenuWrapper: function(formModel)
    {
        // Delete existing appmenu_container. TODO: Can be optimized by not removing in case of custom n native scroll
        var appmenu_container = document.getElementById("appmenu_container");
        if(appmenu_container)
            appmenu_container.parentNode.removeChild(appmenu_container);
        var more_container = document.getElementById('appmenumore_container');
		if(more_container)
			more_container.parentNode.removeChild(more_container);
			
        var div = document.createElement("div");
        div.id = "appmenu_container";
        var parentContainer;
        if(!formModel.dockableappmenu && $KG.needScroller)
            parentContainer = document.getElementById(formModel.id + "_scrollee")
        else
            parentContainer = document.getElementById("__MainContainer");
        parentContainer.appendChild(div);
    },
	
	generateForm: function(formModel)
	{
		var htmlString = "";
		var wArrary = formModel.widgets();		
		if(wArrary.length > 0) 
			return this.renderChildren(formModel, wArrary);
		return htmlString;	 
	},
	
	renderChildren: function(formModel, wArrary){
		var htmlString = "";
		var screenlLevelWidgetModel = $KU.getScreenLevelWidgetModel(formModel);
		//Show first SLW if SLW is present in the form model.
		if(screenlLevelWidgetModel && (screenlLevelWidgetModel.containerheight == null || !(screenlLevelWidgetModel.containerheight >= 0 )))
		{
			return $KW.Form.generateWidget(formModel, screenlLevelWidgetModel);					
		}
		if(formModel.layouttype == kony.flex.VBOX_LAYOUT){
			for(var i=0; i < wArrary.length; i++) {
				var childModel = wArrary[i];
				htmlString += $KW.Form.generateWidget(formModel, childModel);
			}
		}
		else{
			htmlString += $KW.FlexContainer.renderChildren(formModel, wArrary, {});			
		}
		return htmlString;
	},	
	
	generateHeader: function(formModel, type){		
		
		var htmlString = "";
        var headerID = formModel[type];
        
        if(headerID)
            return this.generateTemplate(headerID, type);
        else
            return "";
	},

	// Get the context when rendering datagrid template
    generateTemplate: function(headerID, type, context)
    {
        var headerModel = kony.model.getWidgetModel(headerID) || headerID;
		var htmlString = "",context = context || new $KW.WidgetGenerationContext(headerModel.id),childModel;
		if(headerModel.children){
			if (context && context.template_generator && typeof context.template_generator == "object") {
				return $KW[context.template_generator.wType].render(headerModel,context);
			}
			//htmlString = "<div " + $KW.Utils.getBaseHtml(headerModel, context , type) + ">";
			for (var i = IndexJL; i < headerModel.children.length; i++) 
			{
				childModel = headerModel[headerModel.children[i]];
				context.setTopLevelBox(true);
				htmlString += $KW[childModel.wType].render(childModel, context);
			}
			//htmlString += "</div>" 
		}
        return htmlString;
    },  
	
	checkBackwardCompatibility: function(formModel)
	{
		var isForm = formModel.wType;
		// Backward compatibility
		if((formModel.dockableheader == undefined && formModel.header) || $KG.nativeScroll)
			formModel.dockableheader = true;
		if((formModel.dockablefooter == undefined && formModel.footer) || $KG.nativeScroll)
			formModel.dockablefooter = true;
		if(isForm && ((formModel.dockableappmenu == undefined && formModel.needappmenu) || $KG.nativeScroll))
			formModel.dockableappmenu = true;
		if(($KG.useMixedScroll && formModel.renderinnative == undefined) || $KG.nativeScroll)
			formModel.renderinnative = true;
	},
	
	
	show: function(formModel)
	{
		if($KG["localization"] && !$KG["i18nInitialized"])
			$KI.i18n.setdefaultlocale($KG["defaultlocale"], null, null, $KW.Form.extendShow(formModel));
		else	
			$KW.Form.extendShow(formModel)();
	},
	
	extendShow: function(formModel)
    {		
		return function(){
		
			//Invoke the native show form function to enter
			//into native mode in case form type is kony rich client.
			//form.id is a string as expected by native platform

			function checkformmode(form) {         			  
			  //APPMODE: 1 - native (only SPA mode) 2 - hybrid  3 - wrapper
			  if ($KG["appmode"] == constants.APPLICATION_MODE_HYBRID) {
					//FORMTYPE "1" - SPA , "2" - TC,  NULL - RC
				  if (internal &&  (form.type == constants.FORM_TYPE_NATIVE)) {
					kony.print("checkformmode: nativeformid : " + form.id);			  
					internal.shownativeform(form.id);
					return false;
				  }
				  else {
						if( internal &&  (form.type == constants.FORM_TYPE_DYNAMIC)) {
							kony.print("checkformmode: dynamicformid : " + form.id);	
							internal.showdynamicform(form.id)
							return false;
							
						} else if (form.type == constants.FORM_TYPE_STATIC) {										  
                            kony.print("------shell status: " + internal.isshellinbackground());	

							if(internal && internal.isshellinbackground && internal.isshellinbackground()) {
								kony.print("checkformmode: shellinbackground for form : " + form.id);	
								form.callspaform=true; 
                                //To prevent invoking showspaform in case of backkey event flow in Android
								if(form.isfromBrowserBack) {
                                	form.callspaform=false;
                                }                                                               
 							}
							kony.print("checkformmode: shellinforeground for form : " + form.id);
							return true;
						}
						kony.print("checkformmode: Invalid Form Type");
						return false;
				  }
			  }
			  else
				  return true;           
			};   
			
			if(checkformmode(formModel)) 
            {
                // Backward compatibility
				$KW.Form.checkBackwardCompatibility(formModel);
				$KU.createa11yDynamicElement();
				
				//Check for idletimeout cb expiry. If expired invoked the callback & return
				if(formModel.enabledforidletimeout && $KG["__idletimeout"] && $KG["__idletimeout"].expired && $KG["__idletimeout"].enabled) {
					$KG["__idletimeout"].cb && $KG["__idletimeout"].cb(formModel);
		            $KG["__idletimeout"].cb = null;
					$KG["__idletimeout"].expired = false;
                    $KG["__idletimeout"].enabled = false;
					return;
				}
				
				// Dismiss popup and calendar, if any
				 if($KG["__currentForm"])
				 {
					$KW.Popup && $KW.Popup.dismiss(null,true);
					$KW.unLoadWidget();
				}
				
				var curForm = $KG["__currentForm"];
				if (curForm && curForm.onhide && curForm.id != formModel.id) 
				{
					var curref = $KU.returnEventReference(curForm.onhide);
					curref && curref.call(formModel,formModel);
				}
				
				if (formModel.preshow) {
					var preref = $KU.returnEventReference(formModel.preshow);
					preref && preref.call(formModel,formModel);
				}
				
				if ($KG["__currentForm"]) 
					$KG["__previousForm"] = $KG["__currentForm"];
				
				var rendered = false;
				$KG["__currentForm"] = formModel;
				
				var prevForm = $KG["__previousForm"];
				if (prevForm && prevForm.id == formModel.id) {
					rendered = true;	
				}
				
				//If form.show is called on the same form, just execute only pre show and post events.			
				if (!rendered) 
				{ 
					if($KG["localization"])
					{
						$KI.i18n.translateFormModel(formModel);
						var header = formModel.header;
						header && $KI.i18n.translateFormModel(window[header]);
						var footer = formModel.footer;
						footer && $KI.i18n.translateFormModel(window[footer]);
					}

                    // Destroy previous form scrollers
					if(prevForm) 
					{
                        if(prevForm.retainscrollposition) 
						{
                            var prevFormScroller = $KG[prevForm.id + "_scroller"];
                            // Remember coods
							if(prevFormScroller)
                                prevForm.__y = prevFormScroller.y;
							else
							    prevForm.__y = document.body.scrollTop || document.documentElement.scrollTop;
                        }
                        $KW.Form.destroyTouchWidgets($KG.needScroller ? prevForm.id + "_container" : prevForm.id);
                    }
					// END of old form
                    
                    // TODO:
                    // Override needScroller in case of mixedscroll mode
                    if($KG.useMixedScroll)
                    {
                        if(formModel.renderinnative && ((!formModel.dockableheader && !formModel.dockablefooter && !(formModel.needappmenu && formModel.dockableappmenu)) || (!formModel.header && !formModel.footer && !($KG.__appmenu && formModel.needappmenu))))
                        {
                            $KG.needScroller = false;
                            $KG.nativeScroll = true;
                        }
                        else
                        {
                            $KG.needScroller = true;
                            $KG.nativeScroll = false;                            
                        }
                    }
                        
                    // new form
                    var formId = $KG.needScroller ? formModel.id + "_container" : formModel.id;
                    
                    $KW.Form.render(formModel);	
					$KW.Form.formRendered(formModel.id);
					
					// Initialize current form scrollers					
					$KW.Scroller.initializeFormScroller(formId);
					
					$KW.Form.initializeFlexContainers(formModel);
					
                    $KW.Utils.initializeGestures(formModel);
					//Added below to support gesture events for form widgets itself.
                    $KW.Utils.initializeGestures({"formmodel":formModel});
					$KW.Utils.initializeTemplateGestures();                    
					$KW.Form.initializeTouchWidgets(formModel.id, true);
					$KW.Form.applyTransition($KG["__previousForm"], formModel);
					//23106:  created a wrapper div in index.jsp and removing wrapper on splash screen close, 
					//to avoid blank screen between spalsh screen and home page 
					 var wrapperDiv = document.getElementById('splashDiv');
                     if(wrapperDiv)
							wrapperDiv.parentElement.removeChild(wrapperDiv);
                    if (!kony.system.activity.hasActivity()) {
                        $KW.Utils.removeBlockUISkin();
                        $KW.unLoadWidget();                       
                    }               
                    if (kony.constants.APPSTATE == 0) {
						kony.constants.APPSTATE = 1;
                        // !! Registering events alone doesn''t help?
						kony.events.registerDocumentEvents();
					}
				}
				else
				{
                    var formId = $KG.needScroller ? formModel.id + "_container" : formModel.id;
                    // To reset forms scroll to top
                    $KW.Scroller.destroyFormScroller(formId);
                    $KW.Scroller.initializeFormScroller(formId);
      
                    if($KU.isWindowsPhone && $KU.isIE9)
						window.scrollTo(0, 0);
					else if($KG.nativeScroll)
						window.scrollTo(0, 1);
					
					if (formModel.postshow) {
						var postref = $KU.returnEventReference(formModel.postshow);
						postref && postref.call(formModel,formModel);
					}
				}
				
				$KW.Form.accessibilityTitleCall(formModel);

                //Registering PickerView Events
                var pvs = document.querySelectorAll('[kwidgettype="PickerView"]');
                for(var pi=0; pi<pvs.length; pi++) {
                    var pickerModel = $KU.getModelByNode(pvs[pi]);
                    var picker = pickerModel[pvs[pi].id];
                    if(picker && picker.registerEvents) {
                        picker.picker = document.getElementById(pvs[pi].id);
                        picker.picker && picker.registerEvents(picker);
                        if(pickerModel.selectedkeys) {
                            picker.setSelectedKeys(pickerModel.selectedkeys);
                            pickerModel.selectedkeyvalues = picker.getSelectedKeyValues();
                           
                        }
                    }
                }

				$KW.TPW.renderWidget(formModel.id);
				
				if(formModel.callspaform) {
                    kony.print("@@@@ invoking internal.showspaform : " + formModel.id);
                	internal.showspaform(formModel.id);
               		formModel.isfromBrowserBack = false;
					formModel.callspaform = false;
                }    

				formModel.initialized = true;
			}	
		}
    },
	
	accessibilityTitleCall : function(formModel, isPopup)
	{
		var accessObj  = formModel.accessibilityConfig;
		var title = accessObj ? accessObj.a11yLabel : "";
		title && $KU.changea11yDynamicElement(title);
	},
	
	applyTransition: function(previousForm, currentForm)
	{
		var src, dest;
		
		previousForm && (src =  $KU.getElementById(previousForm.id + "_container") || $KU.getElementById(previousForm.id));
		dest = $KU.getElementById(currentForm.id + "_container") || $KU.getElementById(currentForm.id);
		
		var outTrans, inTrans;
		outTrans = (previousForm && previousForm.outtransitionconfig) ? previousForm.outtransitionconfig.formTransition || previousForm.outtransitionconfig.formtransition : '';
		inTrans = (currentForm.intransitionconfig) ? currentForm.intransitionconfig.formTransition || currentForm.intransitionconfig.formtransition : '';
	
        if (!$KG["disableTransition"] && ((inTrans && inTrans.toLowerCase() !== "none") || (outTrans && outTrans.toLowerCase() !== "none"))) 
		{
			var outTransAnimation, inTransAnimation;
			if(!inTrans || inTrans.toLowerCase() == "none")
				inTransAnimation = $KW.formTransitionsMatrix[outTrans];
			else
				inTransAnimation = $KW.formTransitionsMatrix[inTrans];
				
			if(!outTrans || outTrans.toLowerCase() == "none")
				outTransAnimation = $KW.formEndTransitionsMatrix[inTrans];
			else
				outTransAnimation = $KW.formEndTransitionsMatrix[outTrans];

			if (src) 
			{
                src.style.zIndex = 1;
            }
            if (dest) 
			{
                dest.style.zIndex = 2;
				var ev = (kony.appinit.isFirefox || kony.appinit.isIE10 || kony.appinit.isIE11) ? "animationend" : (vendor + "AnimationEnd");	
				currentForm.__ev = function(srcForm, destForm, currForm, prevForm, ev){                    
                    return function(event){
                        if(!event)
							event = window.event;
						currForm.__ev = "";
                        if(event.type == ev)
						{
							kony.events.removeEventListener(destForm, event.type, arguments.callee);
							this.style[vendor + 'AnimationName'] = "";
						}
						$KW.Form.endTransition(srcForm, destForm, currForm, prevForm);
                    }
                }(src, dest, currentForm, previousForm, ev);
				
				kony.events.addEventListener(dest, ev, currentForm.__ev);
				
				
                // TODO: Add provision for animation duration from IDE
				// src
				if(src)
				{
					src.style[vendor + 'AnimationDuration'] = "0.5s";
					src.style[vendor + 'AnimationName'] = outTransAnimation; 
				}
				// dest
				dest.style[vendor + 'AnimationDuration'] = "0.5s";
				dest.style[vendor + 'AnimationName'] = inTransAnimation;
                
				$KU.removeClassName(dest, "hidden");
                dest.style.display = "";
            }
        }
        else 
		{
            $KU.removeClassName(dest, "hidden");
            dest.style.display = "";
            this.endTransition(src, dest,currentForm, previousForm);
        }
	},
	
	endTransition: function(src, dest, currentForm, previousForm){
		
    	if(src) 
		{
			if(previousForm.__ev)
			{			
				previousForm.__ev();
			}
			src.style.display = "none";
            clearInterval(previousForm.scrollerTimer);
            
            var main = $KU.getElementById("__MainContainer");
            main.removeChild(src);
        }
		
		if($KG.nativeScroll){		
			document.body.className = currentForm.skin || "";
		}
		
        var mapCanvasElement = document.getElementsByName("map_canvas")[0];
        var scriptloaded = $KG["mapScriptLoaded"];
        if (mapCanvasElement && scriptloaded) 
            $KW.Map.setUpInteractiveCanvasMap();
		
		//Retaining scroll position
		if(currentForm.retainscrollposition) 
		{
			var currentFormScroller = $KG[currentForm.id + "_scroller"];
			if(currentFormScroller)
				currentFormScroller.scrollTo(0, currentForm.__y || 1);
			else if($KU.isWindowsPhone && $KU.isIE9)
				window.scrollTo(0, currentForm.__y || 0);			// no anim
			else
				window.scrollTo(0, currentForm.__y || 1);			// no anim
		}
		else if($KG["nativeScroll"]){
			window.scrollTo(0, 0);
		}
		//fix for fw1302, form height need to be calculated before post show to prepare animation frames
		$KW.Scroller.setHeight(currentForm.id);
		if (currentForm.postshow) {
			var postref = $KU.returnEventReference(currentForm.postshow);
			postref && postref.call(currentForm, currentForm);
		}
		if($KG.appbehaviors["recording"] == true) {
            this.parseWidgetDimensions(currentForm, null);
            this.addDomChangeEvents();
        }
			
        
	}, 


    parseWidgetDimensions : function(widgetModel, parentModel, widgetPositions) {
        widgetPositions = widgetPositions || this.getWidgetPosition(widgetModel);		
        this.getPositionValues(widgetPositions,widgetModel, parentModel);
		
		
		if(!widgetModel.children || widgetModel.children.length == 0)
            return widgetPositions;
			
        widgetPositions.Children = []; 
		for (var i = 0; i < widgetModel.children.length; i++) {		
			kony.print("i is :" +i);
			
			var childModel = widgetModel[widgetModel.children[i]];
            var childPositions = {};
            widgetPositions.Children.push(childPositions);
            this.parseWidgetDimensions(childModel, widgetModel,childPositions )
		}
		
        return widgetPositions;
	},
    
    getWidgetPosition : function(widgetModel){
       
        var parentWP = null;
        if(widgetModel.parent){
            parentWP = this.getWidgetPosition(widgetModel.parent);
            if(parentWP && parentWP.Children){
                for (var i = 0; i < parentWP.Children.length; i++) {
                    if(parentWP.Children[i].ID === widgetModel.id){
                        return parentWP.Children[i];
                    }
                }
            }else if(parentWP.ID && !parentWP.Type){
                this.parseWidgetDimensions(widgetModel.parent, null,parentWP );
                return parentWP;
            }
            return null;
        }else{
            return this.getAllWidgets(widgetModel.id);
        }
    },
	
    getAllWidgets : function (widgetid){
        
        if(!$KG.widgetPositions){
            $KG.widgetPositions = {};
        }
        
        if(!$KG.widgetPositions.AllWidgets){
            $KG.widgetPositions.AllWidgets = new Array();
            $KG.widgetPositions.AppName = kony.globals["appid"];
            $KG.widgetPositions.ScreenHeight = $KU.getWindowHeight();
            $KG.widgetPositions.ScreenWidth = $KU.getWindowWidth();
        }
        
        
        for(var index in $KG.widgetPositions.AllWidgets){
            var widget = $KG.widgetPositions.AllWidgets[index];
            if(widget.ID === widgetid){
                return widget;
		     }
        }
        var widget = {"ID":widgetid};
        $KG.widgetPositions.AllWidgets.push(widget);
        return widget;
		
	},
	
    getPositionValues : function(widgetData, childModel, widgetModel) {

        var Info = widgetData || {}

        Info.Type = childModel.name;
        Info.ID = childModel.id;
        Info.Margin = childModel.margin;
        Info.Padding = childModel.padding;

        //	kony.print("widget id is" +childModel.id);
        var cNode = $KU.getNodeByModel(childModel);
        if(cNode == null) return Info;

        Info.Width = cNode.offsetWidth;
        Info.Height = cNode.offsetHeight;


        //kony.print("width is " );
        //kony.print("height is " + cNode.offsetHeight);

        var childPos = $KW.Utils.getPosition(cNode);

        Info.LeftFromScreen = childPos.left;
        Info.TopFromScreen = childPos.top;
        //kony.print("left is " + childPos.left + " top is  "+ childPos.top);

        Info["VisibilityChanged"]= false;

        if(widgetModel) {
            var wNode = $KU.getNodeByModel(widgetModel);
            if(!wNode) return Info;
            var parentPos = $KW.Utils.getPosition(wNode);
            Info.Left = childPos.left - parentPos.left;
            Info.Top = childPos.top - parentPos.top;
        }else{
            Info.Top = 0;
            Info.Left = 0;
        }

        if(!Info["VaryingScreenLefts"]){
            Info["VaryingHeights"] = [Info.Height,Info.Height];
            Info["VaryingLefts"] = [Info.Left,Info.Left];
            Info["VaryingScreenLefts"] = [Info.LeftFromScreen,Info.LeftFromScreen];
            Info["VaryingScreenTops"] = [Info.TopFromScreen,Info.TopFromScreen];
            Info["VaryingTops"] = [Info.Top,Info.Top];
            Info["VaryingWidths"] = [Info.Width,Info.Width];
        }
        Info["VaryingHeights"][0] = Math.min(Info["VaryingHeights"][0],Info.Height);
        Info["VaryingHeights"][1] = Math.max(Info["VaryingHeights"][0],Info.Height);

        Info["VaryingLefts"][0] = Math.min(Info["VaryingLefts"][0],Info.Left);
        Info["VaryingLefts"][1] = Math.max(Info["VaryingLefts"][0],Info.Left);

        Info["VaryingScreenLefts"][0] = Math.min(Info["VaryingScreenLefts"][0],Info.LeftFromScreen);
        Info["VaryingScreenLefts"][1] = Math.max(Info["VaryingScreenLefts"][0],Info.LeftFromScreen);

        Info["VaryingScreenTops"][0] = Math.min(Info["VaryingScreenTops"][0],Info.TopFromScreen);
        Info["VaryingScreenTops"][1] = Math.max(Info["VaryingScreenTops"][0],Info.TopFromScreen);

        Info["VaryingTops"][0] = Math.min(Info["VaryingTops"][0],Info.Top);
        Info["VaryingTops"][1] = Math.max(Info["VaryingTops"][0],Info.Top);

        Info["VaryingWidths"][0] = Math.min(Info["VaryingWidths"][0],Info.Width);
        Info["VaryingWidths"][1] = Math.max(Info["VaryingWidths"][0],Info.Width);


        return Info;
    },



    addDomChangeEvents : function (){
        if(domChangeObserver === null)
            domChangeObserver = new MutationObserver(this.domChangeListener);

        domChangeObserver.observe(document, {attributes: true,
                                             childList: true,
                                             characterData: true,
                                             subtree:true });
    },

    removeDomChangeEvents: function (){
        if(domChangeObserver != null)
            domChangeObserver.disconnect();
    },

    domChangeListener : function (mutations){
        mutations.forEach(function(mutation) {
            var widgetModel = $KU.getModelByNode(mutation.target)
            if(widgetModel && widgetModel.name){
                console.log(mutation.type + ' -- '+ widgetModel.id);
                $KW.Form.parseWidgetDimensions(widgetModel, widgetModel.parent);                
            }
        })
    },	  
	/* - END OF SPA */

/******************************************------------DESKTOP---------************************************************/
	

/*********************************************-----TC--------**************************************************/	
	
};

var domChangeObserver = null;
