/* 
 * Widget: Switch
 */
 
$KW.Switch = {
		
	initialize: function(){
		            
     	kony.events.addEvent("click", "Switch", this.eventHandler);
        kony.events.addEvent("onorientationchange", "Switch", this.adjustSwitchWidth);    
    },
	
	initializeView: function(formId){
        this.adjustSwitchWidth(formId, true);
        this.adjustSwitchHeight(formId);
    },
	
	updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){
        var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
			
        switch (propertyName) {        
            case "selectedindex": 				
            if($KU.isIOS7)
            this.adjustSwitch(widgetModel, element, "all 0.4s ease-in-out");
            else
               	this.adjustSwitch(widgetModel, element, "all 0.125s ease-in-out");
               	break;
        }
    },
    addA11YAttribute : function ( switchModel, switchDiv, forceAriaLabel ) {
        if ( !switchModel.accessibilityConfig || forceAriaLabel ) {
            if ( switchModel.leftsidetext && switchModel.selectedIndex === 0 ) {
                switchDiv.setAttribute('aria-label', switchModel.leftsidetext);
            } else if(switchModel.rightsidetext) {
                switchDiv.setAttribute('aria-label', switchModel.rightsidetext);
            }
        }
    },
    render: function(switchModel, context){
	 	
		var computedSkin = $KW.skins.getWidgetSkinList(switchModel, context);
        var marginpadding = $KW.skins.getMarginSkin(switchModel, context)+" "+$KW.skins.getPaddingSkin(switchModel);
        var lText = switchModel.leftsidetext || "ON";
        var rText = switchModel.rightsidetext || "OFF";
        var substituteAccessAttr = "";
	    if ( switchModel.accessibilityConfig == undefined ) {
	        if ( switchModel.leftsidetext && switchModel.selectedIndex === 0 ) {
	            substituteAccessAttr = " aria-label='" + switchModel.leftsidetext + "' ";
	        } else if(switchModel.rightsidetext) {
	            substituteAccessAttr = " aria-label='" + switchModel.rightsidetext + "' ";
	        }
		}
        if($KU.isIOS7){
            lText = "";
            rText = "";
        }
		switchModel.selectedindex = (switchModel.selectedindex ==  IndexJL ) ? IndexJL : IndexJL+1;		
		if(kony.appinit.isIE9 || kony.appinit.isIE8){
			var htmlString = "<div" + $KW.Utils.getBaseHtml(switchModel, context) + "class='ktable kwt100 switch " + computedSkin + "' style='"+marginpadding+";position:relative'>" + 
				"<div class='krow kwt100 switchRow'>" + 
	            	"<div class='kcell kwt50 " + (switchModel.skin ? (switchModel.skin + "on"): "on konycustomcss") + "' id='" + switchModel.id + "_on'>" + lText + "</div>" + 
	            	"<div class='switchThumb thumb kwt50' id='" + switchModel.id + "_thumb' style='left:" + (["40%","0%"][switchModel.selectedindex]) + "''></div>" + 
	            	"<div class='kcell kwt50 " + (switchModel.skin ? (switchModel.skin + "off"): "off konycustomcss") + "' id='" + switchModel.id + "_off'>" + rText + "</div>" + 
	            "</div>" + 
	        	"</div>";
		}else{
                    if($KU.isIOS7){
                        var switchStyle = [
                            "",
                            "background-image : none",
                            "height   : 31px;",
                            "padding  : 0",
                            "position : relative",
                            "width    : 51px",
                            "-webkit-border-radius: 15.5px;",
							"background-size:100%",
							"display : inline-block;",
                            ""].join(";");
                        var thumbStyle  = [
                            "",
                            "border     : 0",
                            "background : #FFF",
                            "height     : 28px",
                            "position   : relative",
                            "width      : 28px",
                            "top        : 1.5px",
                            "z-index    : 3",
                            "-webkit-border-radius:14px",
                            "-webkit-box-shadow:1px 1px 3px 0 rgba(0,0,0,0.3)",
                            ""].join(";");
                        var onStyle     = [
                            "",
                            "display:none",
                            ""].join(";");
                        var thumbSpanStyle = [
                            "",
                            "display:none",
                            ""].join(";");
                        var offStyle    = [
                            "",
                            "background       : #FFF",
                            "background-image : none",
                            "border   : 1px solid #ccc",
                            "height   : 31px",
                            "left     : 0",
                            "margin   : 0",
                            "padding  : 0",
                            "position : absolute",
                            "top      : 0",
                            "width    : 51px",
                            "z-index  : 2",
                            "-webkit-border-radius:15.5px",
                            ""].join(";");
                            var htmlString = "<div role='option' aria-selected='" + [ 'true' , 'false' ][switchModel.selectedIndex] + "' " + substituteAccessAttr + $KW.Utils.getBaseHtml(switchModel, context) + "class='switch " + computedSkin + " " + (switchModel.skin ? switchModel.skin + "on" : "") + "' style='" + marginpadding + switchStyle + (!switchModel.skin ? ";background: #4FD065" : "")+ "'>" + 
                            "<div  id='" + switchModel.id + "_on' style='" + onStyle + "'>" + lText + "</div>" + 
                            "<div class='thumb' id='" + switchModel.id + "_thumb' style='" +
                            thumbStyle + "'>" + "<span style='" +
                            thumbSpanStyle + "'></span></div>" +
                            "<div  id='" + switchModel.id + "_off' style='" +
                            offStyle + "'>" + rText + "</div>" +
                            "</div>";
                    } else {
			var htmlString = "<div role='option' aria-selected='" + [ 'true' , 'false' ][switchModel.selectedIndex] + "' " + substituteAccessAttr + $KW.Utils.getBaseHtml(switchModel, context) + "class='switch " + computedSkin + "' style='"+marginpadding+"'>" + 
	            "<div aria-hidden='true' class='" + (switchModel.skin ? (switchModel.skin + "on"): "on konycustomcss") + "' id='" + switchModel.id + "_on'>" + lText + "</div>" + 
	            "<div aria-hidden='true' class='thumb' id='" + switchModel.id + "_thumb'> <span></span></div>" +
	            "<div aria-hidden='true' class=' " + (switchModel.skin ? (switchModel.skin + "off"): "off konycustomcss") + "' id='" + switchModel.id + "_off'>" + rText + "</div>" + 
	        	"</div>";
		    }
		}
        return htmlString;
    },
	
	adjustSwitchWidth:function(formId, attachEvent){
	
        var switches = document.querySelectorAll("#" + formId + " div[kwidgettype='Switch'], div[class~='popupmain'] div[kwidgettype='Switch']");
        for(var i=0; i<switches.length; i++){
		 	var switchModel = $KU.getModelByNode(switches[i]);
			$KW.Switch.adjustWidth(switchModel, switches[i], attachEvent); 				 	
        }		
	},
	
	adjustWidth: function(switchModel, switchNode, attachEvent){
		if(!(kony.appinit.isIE9 || kony.appinit.isIE8)){
                    if($KU.isIOS7) {
                        var paddingLeft = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingLeft)*.01));
                        var paddingRight = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingRight)*.01));
				switchModel.cWidth = Math.floor(switchNode.clientWidth);
				switchModel.sWidth = switchModel.cWidth + (switchNode.clientWidth % 2) + 6;
                        $KW.Switch.adjustSwitch(switchModel, switchNode, "none");	//Don't apply transition during form.show
                    } else {
			switchNode.children[0].style.marginRight = "-6px";
			switchNode.children[2].style.marginLeft = "-6px";
			var paddingLeft = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingLeft)*.01));
			var paddingRight = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingRight)*.01));
				switchModel.cWidth = (Math.floor((switchNode.clientWidth)-(paddingLeft+paddingRight)) / 2);
				switchModel.sWidth = switchModel.cWidth + (switchNode.clientWidth % 2) + 6;
				switchNode.children[0].style.width = (switchModel.sWidth - 1) + "px"; //ON div 1px border was showing up so subtracting that
				switchNode.children[2].style.width = switchModel.sWidth + "px"; //OFF div
				switchNode.children[1].childNodes[1].style.width = switchModel.cWidth + "px"; //Span in Thumb div
			$KW.Switch.adjustSwitch(switchModel, switchNode, "none");	//Don't apply transition during form.show 	
			
			if ($KU.isIE11) {
			    for( var i = 0; i < switchNode.children.length; i++ ) {
			        switchNode.children[i].style.flex = 'none';
			    }
			}

		  }
		}
		else
		{
			//adjust left and width of thumb, when padding for switch div is present.
			switchModel.isParse = false;
			if(parseInt(switchNode.style.paddingLeft)>0)
			{
				switchModel.isParse = true;
				var leftValue = 0;
				var rightValue = 0;
				if(! switchModel.paddingInPixel)
				{
					leftValue = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingLeft)*.01));
					rightValue = Math.ceil(switchNode.offsetWidth*(parseInt(switchNode.style.paddingRight)*.01));
				}
				switchNode = switchNode.firstChild;
				switchNode.children[1].style.left = switchNode.offsetLeft;
				switchModel.leftValue = switchNode.offsetLeft;
			}
			if(!switchModel.isParse) switchNode = switchNode.firstChild;
			switchNode.children[1].style.width = switchNode.children[0].offsetWidth;
		}
	},
	
	toggleSwitch: function(model){		
        var switchDiv = $KU.getNodeByModel(model);
		var kdisabled = switchDiv.getAttribute("kdisabled");
		if (switchDiv && kdisabled != "true")
		{
			this.applyTrans(switchDiv, $KU.isIOS7 && "all 0.4s ease-in-out" || "all 0.125s ease-in-out");
		 	if (model.selectedindex == IndexJL) {
		 		model.selectedindex = IndexJL+1;
		 		if(kony.appinit.isIE9 || kony.appinit.isIE8){
					this.animateSwitch(model, switchDiv);
		 		}else{
					var paddingLeft = 0;
					if(! model.paddingInPixel)	paddingLeft = Math.ceil(switchDiv.offsetWidth*(parseInt(switchDiv.style.paddingLeft)*.02));
                                         if($KU.isIOS7) {
                                         switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + 1.5 +"px,0" + translateClose;
                                         switchDiv.children[2].style[vendor + 'Transform'] = "scale(1)";
                                         } else {
		 			switchDiv.children[0].style[vendor + 'Transform'] = translateOpen + (-(model.cWidth + paddingLeft+ 8)) + "px,0" + translateClose;
		 			switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + (-model.cWidth) + "px,0" + translateClose;
		 			switchDiv.children[2].style[vendor + 'Transform'] = translateOpen + (-model.cWidth) + "px,0" + translateClose;
					}
				}
			}
		 	else {
		 		model.selectedindex = IndexJL;
		 		if(kony.appinit.isIE9 || kony.appinit.isIE8){
					if(parseInt(switchDiv.style.paddingRight)>0)
					{
						var switchNode = switchDiv.firstChild;
						model.orgwidthVal = switchNode ? switchNode.offsetLeft+switchNode.firstChild.offsetWidth :[0,50][model.selectedindex];
						model.orgwidthVal = (model.orgwidthVal)-(model.orgwidthVal%10);
					}
					model.widthVal = [0,50][model.selectedindex];
					$KI.timer.schedule(model.id, this.toogleSwitchIE(model, model.selectedindex), .05, true);
		 		}else{
					var paddingRight = 0;
					if(! model.paddingInPixel)	paddingRight = Math.ceil(switchDiv.offsetWidth*(parseInt(switchDiv.style.paddingRight)*.01));
		 			switchDiv.children[0].style[vendor + 'Transform'] = translateOpen + "0,0" + translateClose;
					if($KU.isIOS7){
						switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + 21.5 + "px,0" + translateClose;
						switchDiv.children[2].style[vendor + 'Transform'] = "scale(0.01)";
		 			} else {
		 			switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + "0,0" + translateClose;
		 			switchDiv.children[2].style[vendor + 'Transform'] = translateOpen + paddingRight+"px,0" + translateClose;
					}
		 		}
		 	}
		 	var modelref = $KU.returnEventReference(model.onslide || model.onslidercallback);
			switchDiv.setAttribute("aria-selected", [ true, false ][ model.selectedIndex ]); //toggle aria-selected attribute
			$KW.Switch.addA11YAttribute( model, switchDiv);                           // add left || right-side-text
		 	modelref && modelref.call(model,model);
		}		
	},
	toogleSwitchIE: function(model, val)
	{
		return function()
		{
			var bClearInterval = false;
			var switchDiv = $KU.getNodeByModel(model);
			switchDiv = switchDiv.firstChild;
			if ( val )
			{
				if(model.orgwidthVal) 
				{
					model.orgwidthVal1 -= Math.floor(model.orgwidthVal/5);
					switchDiv.children[1].style.left = model.orgwidthVal1+model.widthVal+"px";
					if ( model.orgwidthVal1 >= 0 || model.orgwidthVal1 <= 5)
					{
						bClearInterval=true;
						switchDiv.children[1].style.left = model.widthVal+"px";
						model.orgwidthVal = null;
						model.orgwidthVal1 = null;
					}
				}
				else
				{
					model.widthVal -= 10;
					switchDiv.children[1].style.left = model.widthVal+"%";
					if ( model.widthVal ==0 ) bClearInterval=true;
				}
			}
			else
			{
				if(model.orgwidthVal) 
				{
					model.widthVal += model.orgwidthVal/5;
					switchDiv.children[1].style.left = model.widthVal+"px";
					if ( model.widthVal == model.orgwidthVal )
					{
						bClearInterval=true;
						model.orgwidthVal = null;
						model.orgwidthVal1 = null;
					}
				}
				else
				{
					model.widthVal += 10;
					switchDiv.children[1].style.left = model.widthVal+"%";
					if ( model.widthVal == 50 ) bClearInterval=true;
				}
			}
			if ( bClearInterval )
			{
				$KI.timer.cancel(model.id);
			}
		}
	},
	adjustSwitch: function(model, switchDiv, trans){        
        if(kony.appinit.isIE9 || kony.appinit.isIE8){
            this.animateSwitch(model, switchDiv);
            return;
        }
		this.applyTrans(switchDiv, trans);
        if (model.selectedindex == IndexJL) {
            switchDiv.children[0].style[vendor + 'Transform'] = translateOpen + "0,0" + translateClose;
            $KU.isIOS7 && (switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + "21.5px,0" + translateClose) ||
            (switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + "0,0" + translateClose);
            $KU.isIOS7 && ( switchDiv.children[2].style[vendor + 'Transform'] = "scale(0.01)"
            ) ||
            (switchDiv.children[2].style[vendor + 'Transform'] = translateOpen + "7px,0" + translateClose);
        }
        else {
        	if(! model.paddingInPixel)	var paddingLeft = Math.ceil(switchDiv.offsetWidth*(parseInt(switchDiv.style.paddingLeft)*.02));
            switchDiv.children[0].style[vendor + 'Transform'] = translateOpen + (-(model.cWidth + paddingLeft +6)) + "px,0" + translateClose;
            $KU.isIOS7 && (switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + 1.5 + "px,0" + translateClose) ||
            (switchDiv.children[1].style[vendor + 'Transform'] = translateOpen + (-model.cWidth) + "px,0" + translateClose);
            $KU.isIOS7 && ( switchDiv.children[2].style[vendor + 'Transform'] = "scale(1)"
            ) ||
            (switchDiv.children[2].style[vendor + 'Transform'] = translateOpen + (-model.cWidth) + "px,0" + translateClose);
        }
	},
	
    animateSwitch: function (model, switchDiv) {
        model.widthVal = [0,50][model.selectedindex];
        if(parseInt(switchDiv.style.paddingLeft)>0) {
            var switchNode = switchDiv.firstChild;
            model.widthVal = switchNode.offsetLeft;
            model.orgwidthVal =  parseInt(switchNode.children[1].style.left);
            model.orgwidthVal = (model.orgwidthVal)-(model.orgwidthVal%10);
            model.orgwidthVal = model.orgwidthVal - model.widthVal;
            model.orgwidthVal1 = model.orgwidthVal;
        }
        $KI.timer.schedule(model.id, this.toogleSwitchIE(model, model.selectedindex), 0.05, true);
    },

    applyTrans: function(switchDiv, trans){
    	if(!(kony.appinit.isIE9 || kony.appinit.isIE8)){        	
        	switchDiv.children[1].style[vendor + 'Transition'] = trans;
        	switchDiv.children[0].style[vendor + 'Transition'] = trans;
        	switchDiv.children[2].style[vendor + 'Transition'] = trans;        
        }
    },
	
        eventHandler: function(eventObject, target){		
            var switchModel = $KU.getModelByNode(target);
            $KW.Switch.toggleSwitch(switchModel);
        },

    adjustThumbHeight: function(node,event) {
		if(kony.appinit.isIE9 || kony.appinit.isIE8){
        	node = node.firstChild;
        }
		event.target.naturalHeight = event.target.naturalHeight || event.target.height;
		node.children[0].style.height = node.children[2].style.height = (event.target.naturalHeight+ "px");
		node.children[1].childNodes[1].style.height = ((event.target.naturalHeight -2)+ "px");
    },

    adjustSwitchHeight: function(formId) {
		
		var switches = document.querySelectorAll("#" + formId + " div[kwidgettype='Switch']");	 
		for(var i=0; i<switches.length; i++){
			var switchModel = $KU.getModelByNode(switches[i]);
			$KW.Switch.adjustHeight(switchModel, switches[i]);
		};
    },
	
	adjustHeight: function(switchModel, switchNode){
		if(!(kony.appinit.isIE9 || kony.appinit.isIE8))
		{
			if($KU.isIOS7){ return; }
			switchNode.children[0].style.minHeight = "27px";
			switchNode.children[2].style.minHeight = "27px";
		}
		if(switchNode.style.padding && (kony.appinit.isIE9 || kony.appinit.isIE8))
		{
			var switchDiv = switchNode.firstChild;
			var topValue = switchDiv.offsetTop;
			switchDiv.children[1].style.top = (topValue)+"px";
		}
		if(switchModel.skin)
			var skinBackground = $KU.getCSSPropertyFromRule((switchModel.skin + 'on'), 'background-image');
		if(skinBackground){			
			var imageSwitchOn = skinBackground.replace(/url\(([^\)]*)\)/,'$1');
			$KU.imagePreloader(imageSwitchOn, function(node) {
				return function(e){
					kony.events.preventDefault(e);
					$KW.Switch.adjustThumbHeight(node,e);					
				}}(switchNode));
		}
	}
}