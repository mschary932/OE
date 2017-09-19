/*
 * Widget : Author D: Maruthi Siva Krishna
 */ 
$KW.Slider = {
	
    initialize: function(){
    		kony.events.addEvent("onorientationchange", "Slider", $KW.Slider.changeOrientation);			
    },
	
    initializeView: function(formId){
	    
        var sliderNodes = document.querySelectorAll("#" + formId + " img[kwttype ='kSlider']");
        for (var i=0; i<sliderNodes.length; i++){	
			this.attachSliderEvents(sliderNodes[i]);
        }
		
        var sliderouterNodes = document.querySelectorAll("#" + formId +" div[kwttype ='kSlider']");						
        for (var i=0; i<sliderouterNodes.length; i++){
			kony.events.addEventListener(sliderouterNodes[i], "click", $KW.Slider.slideClick);
        }		
    },
	
	attachSliderEvents: function(sliderNode){
	
		kony.events.addEventListener(sliderNode, "touchstart",  $KW.Slider.sliderStart);
		kony.events.addEventListener(sliderNode, "mousedown",  $KW.Slider.sliderStart);		

	},
	
    updateView : function(widgetModel, propertyName, propertyValue, oldPropertyValue){		
	
        var element = $KU.getNodeByModel(widgetModel);
		if(!element)
			return;
			
        switch (propertyName){ 	
            case "text":
                element.value = propertyValue;
                break;
            case "isvisible":
                element.value = propertyValue;
                break;				
				
            case "leftskin":			
                widgetModel.leftskin = propertyValue;		
                $KU.removeClassName(element , oldPropertyValue);
                $KU.addClassName(element, propertyValue);				
                break;
            case "rightskin":			
                widgetModel.rightskin = propertyValue;	
                $KU.removeClassName(element.parentNode , oldPropertyValue);
                $KU.addClassName(element.parentNode, propertyValue);					
                break;
            case "thumbimage":			
                element.childNodes[0].src = $KU.getImageURL(propertyValue);					
                element.childNodes[0].setAttribute("thumbimage", $KU.getImageURL(propertyValue));
                break;
            case "focusthumbimage":			
                element.childNodes[0].setAttribute("focusimage", $KU.getImageURL(propertyValue));
                break;	
			case "selectedvalue":
				$KW.Slider.sliderUpdate(element, propertyValue);
			break;     
			case "containerweight":
				//var slidewidth = element.style.width;
				//this.render(widgetModel, widgetModel.context);
				this.imgLoad(element.firstChild);				
			break;
			case "minlabel":
				var minLabelNode = document.getElementById(element.id+"_minLabel");
				if(minLabelNode)
					minLabelNode && (minLabelNode.innerHTML = propertyValue);
				else
					$KW.Slider.addMinMaxLabel(element.id, propertyValue, "");
			break;			
			case "maxlabel":
				var maxLabelNode = document.getElementById(element.id+"_maxLabel");
				if(maxLabelNode)
					maxLabelNode && (maxLabelNode.innerHTML = propertyValue);
				else
					$KW.Slider.addMinMaxLabel(element.id, "", propertyValue);
			break;
			case "minlabelskin":
				var minLabelNode = document.getElementById(element.id+"_minLabel");
				$KU.removeClassName(minLabelNode , oldPropertyValue);
                $KU.addClassName(minLabelNode, propertyValue);
			break;
			case "maxlabelskin":
				var maxLabelNode = document.getElementById(element.id+"_maxLabel");
				$KU.removeClassName(maxLabelNode , oldPropertyValue);
                $KU.addClassName(maxLabelNode, propertyValue);
			break;
        }		
    },
    
    addMinMaxLabel: function(id,minlabeltext,maxlabeltext){   
    	var htmlString = '<label id="'+id+'_minLabel" style="float: left; "class="" >'+minlabeltext+'</label>';
		htmlString += '<label id="'+id+'_maxLabel" style="float: right; "class="" >'+maxlabeltext+'</label>';
    	var divDynamic = document.createElement('DIV');
		divDynamic.innerHTML = htmlString;
		document.getElementById(id+"_outer").parentNode.appendChild(divDynamic);		
    },
    
    render: function(sliderModel, context){
        if(!sliderModel.buiskin) sliderModel.buiskin = sliderModel.blockeduiskin;
        
        var htmlString = "";
        sliderModel.thickness = sliderModel.thickness || $KU.isIDevice && 2 || 5;
        var sliderleftskin = sliderModel.leftskin || sliderModel.leftSkin || "konysliderleft";
        var sliderrighttskin = sliderModel.rightskin || sliderModel.rightSkin || "konysliderright";
		var hideSkin =  $KW.skins.getVisibilitySkin(sliderModel);
        var diff = sliderModel.max - sliderModel.min;
		
        var thumbimage  = $KU.getImageURL(sliderModel.thumbimage) ||$KU.getImageURL("slider.png") ;
        var focusthumbimage  = $KU.getImageURL(sliderModel.focusthumbimage) || $KU.getImageURL("sliderfocus.png")  ;
        var minlabeltext =  sliderModel.minlabel || "";
        var maxlabeltext =  sliderModel.maxlabel || "";
		sliderModel.view = sliderModel.view || "default" ;
		sliderModel.orientation = sliderModel.orientation || "horizontal" ;
		
		if(sliderModel.orientation == "horizontal")
		{			
			htmlString += '<div' + " tabindex='0'" + 'style=" '+ $KW.skins.getMarginSkin(sliderModel, context)+'" class = "'+$KW.skins.getMarAdjustedContainerWeightSkin(sliderModel, 100) + hideSkin + '">';
			htmlString += '<div min= "'+ sliderModel.min+'" max="'+sliderModel.max+'" diff ="'+diff+'" step ="'+sliderModel.step +'" kwttype ="kSlider" ';
			htmlString += 'id="'+sliderModel.pf+"_"+sliderModel.id+'_outer" class="'+ sliderrighttskin +'"  style=" height: '+sliderModel.thickness+'px;"';        
			htmlString += ' kformname="'+sliderModel.pf+'">';
			
			htmlString += '<div role="slider" aria-valuenow="' + sliderModel.selectedvalue +'" '+' align="left"'+ $KW.Utils.getBaseHtml(sliderModel, context)+' class="'+ sliderleftskin+'"';		
			htmlString += 'style= "vertical-align:middle;  position: relative; ">';
			
			htmlString += '<img onload = "$KW.Slider.imgLoad(this, false)" kwttype ="kSlider" kformname="'+sliderModel.pf+'" id ="'+sliderModel.pf+"_"+sliderModel.id+'_image" src ="'+thumbimage+'" thumbimage="'+thumbimage+'" focusimage ="'+focusthumbimage+'"style="  position: relative;  vertical-align:top;" ></img>';

			htmlString += '</div></div>';    
			if(sliderModel.isvisible && (sliderModel.minlabel || sliderModel.maxlabel)) {
					htmlString += '<div>';
					htmlString += '<label id="'+sliderModel.pf+"_"+sliderModel.id+'_minLabel" style="float: left; "class="'+sliderModel.minlabelskin+'" >'+minlabeltext+'</label>';
					htmlString += '<label id="'+sliderModel.pf+"_"+sliderModel.id+'_maxLabel" style="float: right; "class="'+sliderModel.maxlabelskin+'" >'+maxlabeltext+'</label>'
					htmlString += '</div>';
			}
			
			htmlString += '</div>';		
        }
		else{
			htmlString += '<div style="margin: 5%; width:90%;" class="' + hideSkin + '">';
			//htmlString += '<div style=" '+ $KW.skins.getMarginSkin(sliderModel, context)+' class = "'+$KW.skins.getMarAdjustedContainerWeightSkin(sliderModel, 100)+' ">';
			htmlString += '<div min= "'+ sliderModel.min+'" max="'+sliderModel.max+'" diff ="'+diff+'" step ="'+sliderModel.step +'" kwttype ="kSlider" ';
			htmlString += 'id="'+sliderModel.pf+"_"+sliderModel.id+'_outer" class="'+ sliderrighttskin +'"  style="height: 150px; width: '+sliderModel.thickness+'px;"';        
			htmlString += ' kformname="'+sliderModel.pf+'">';
			
			htmlString += '<div  align="left"'+ $KW.Utils.getBaseHtml(sliderModel, context)+' class="'+ sliderleftskin+'"';	
			htmlString += 'style= "vertical-align:middle;  position: relative; ">';
	
			htmlString += '<img onload = "$KW.Slider.imgLoad(this, false)" kwttype ="kSlider" kformname="'+sliderModel.pf+'" id ="'+sliderModel.pf+"_"+sliderModel.id+'_image" src ="'+thumbimage+'" thumbimage="'+thumbimage+'" focusimage ="'+focusthumbimage+'"style="  position: relative;  vertical-align:top;"></img>';
				
			htmlString += '</div></div>';        
			
			if(sliderModel.isvisible) {
					htmlString += '<div style="margin-top: 15px;" >';
					htmlString += '<label id="'+sliderModel.pf+"_"+sliderModel.id+'_minLabel" style="float: left; "class="'+sliderModel.minlabelskin+'" >'+minlabeltext+'</label>';
					htmlString += '<label id="'+sliderModel.pf+"_"+sliderModel.id+'_maxLabel" style="float: right; "class="'+sliderModel.maxlabelskin+'" >'+maxlabeltext+'</label>'
					htmlString += '</div>';
				}
			
			htmlString += '</div>';
		}		
		sliderModel.context = context;
        return htmlString;
    },
    
    completeMove : function(event) {
      //console.log("in slider move"+ event.type);
        if(!event)
			event = window.event;
		kony.events.preventDefault(event);
        var nodeid = kony.globals["__activeSlider"];
        var count = nodeid.split("_");
        nodeid = count[0]+"_"+count[1];
		
  		 
        var node = document.getElementById(nodeid);
        var sliderModel = $KU.getModelByNode(node);
        var touch = event.touches && event.touches[0] || event;
        var imgNode = node.firstChild;
        var outerNode = node.parentNode;		
        imgNode.src = imgNode.getAttribute("focusimage");			
	
	
		if(sliderModel.orientation =="horizontal")
		{
		
			var imgoffset =imgNode.offsetWidth/2;	
			//for all browsers pagex, where as ie8, ie7 we are getting clientx position
			var move = (touch.pageX || touch.clientX)-imgoffset; 			
			var cwidth = outerNode.offsetWidth;		
			var bodyoffset = $KW.Utils.getPosition(outerNode).left -imgoffset;

			
			if(move < (bodyoffset))
				move =  bodyoffset;
			if( move>=(cwidth+bodyoffset) )	
			{			
				move = cwidth+bodyoffset;
			}						 
		   
			var nearstep = Math.round((move-bodyoffset)/sliderModel.stepwidth);
			if(nearstep*sliderModel.step <= (sliderModel.max-sliderModel.min)) {
				sliderModel.selectedvalue = sliderModel.min+(nearstep*sliderModel.step);	
				var slidemovement = Math.round(nearstep*sliderModel.stepwidth);
				node.style.width = (imgoffset+slidemovement)+"px";
				imgNode.style.left = (slidemovement-imgoffset)+"px";
			}
			else {
				//below code added for JSPFQA4849
				sliderModel.selectedvalue = sliderModel.max;
				node.style.width = (cwidth+imgoffset)+"px";
				imgNode.style.left = (cwidth+ imgoffset)+"px";							
			}				
		}
		else
		{
			var imgoffset =imgNode.offsetHeight/2;	
			var move = (touch.pageY || touch.clientY)-imgoffset; 
			
			var cwidth = outerNode.offsetHeight;		
			var bodyoffset = $KW.Utils.getOffset(outerNode).top -imgoffset;
			
			if(move < (bodyoffset))
				move =  bodyoffset;
			if( move>=(cwidth+bodyoffset) )	
			{			
				move = cwidth+bodyoffset;
			}						 
		   
			var nearstep = Math.round((move-bodyoffset)/sliderModel.stepwidth);
			if(nearstep*sliderModel.step <= (sliderModel.max-sliderModel.min)) {
				sliderModel.selectedvalue = sliderModel.min +(nearstep*sliderModel.step);	
				var slidemovement = Math.round(nearstep*sliderModel.stepwidth);
				node.style.height = (imgoffset+slidemovement)+"px";
				imgNode.style.top = (slidemovement -imgoffset)+"px";
			}
		
		}

		 
		if(sliderModel.view != "progress") {	 
			var sliderhandler = $KU.returnEventReference(sliderModel.onslide);
			if(sliderhandler)
			{
				sliderhandler.call(sliderModel,sliderModel,sliderModel.selectedvalue);
			}
		}			
		
    },
	
    sliderStart : function(event) {
		//console.log("in slider start"+ event.type);
        if(!event)
			event = window.event;
		var target = event.target || event.srcElement;
        kony.globals["__activeSlider"] = target.parentNode.id;
		 var sliderModel = $KU.getModelByNode(target.parentNode);

		if(sliderModel.disabled!= true){
			kony.events.addEventListener(document, "mousemove",  $KW.Slider.completeMove);		
			kony.events.addEventListener(document, "mouseup",  $KW.Slider.completeEnd);
			
			kony.events.addEventListener(document, "touchmove",  $KW.Slider.completeMove);	
			kony.events.addEventListener(document, "touchend",  $KW.Slider.completeEnd);
			kony.events.preventDefault(event);
		}
    },	
	
    completeEnd : function(event) {
      // console.log("in complete end"+ event.type);
		if(!event)
			event = window.event;
		var target = event.target || event.srcElement;	
		kony.events.removeEventListener(document, "mousemove",  $KW.Slider.completeMove);
		kony.events.removeEventListener(document, "touchmove",  $KW.Slider.completeMove);
		
        $KW.Slider.sliderEnd(event);
    },
	

    slideClick : function(event) {	
        //console.log("in slide click"+ event.type);
        if(!event)
			event = window.event;
		var target = event.target || event.srcElement;
        kony.globals["__activeSlider"] = target.id;
        
		// if knob, do nothing
		if(!target.firstChild)
			return;
        var sliderModel = $KU.getModelByNode(target.firstChild) || $KU.getModelByNode(target);
		
        if(sliderModel.disabled!= true && sliderModel && sliderModel.view != "progress") {
		console.log(target.id);
            kony.events.addEventListener(target, "click",  $KW.Slider.completeMove);	
           // $KW.Slider.sliderEnd(event);	
        }	
    },
	
    sliderEnd : function(event) {		
		//console.log("in slider end"+ event.type);
		
        if(!event)
			event = window.event;
		var nodeid = kony.globals["__activeSlider"];		
        if(nodeid == undefined)	return;
        var count = nodeid.split("_");
        nodeid = count[0]+"_"+count[1];		
        var node = document.getElementById(nodeid);
        if(node == undefined) return;
        

		kony.events.removeEventListener(document, "mouseup",  $KW.Slider.completeEnd);
		kony.events.removeEventListener(document, "touchend",  $KW.Slider.completeEnd);
        var sliderModel = $KU.getModelByNode(node);
	
        if(sliderModel.view != "progress") {	
            var sliderhandler = $KU.returnEventReference(sliderModel.onselection);
            if(sliderhandler)
            {
                sliderhandler.call(sliderModel,sliderModel);
            }
        }
		
		var imgNode = node.firstChild;		
        imgNode.src = imgNode.getAttribute("thumbimage");	   
        return;
		
    },


	changeOrientation : function(target) {	

        var sliderNodes = document.querySelectorAll("img[kwttype ='kSlider']");			
        for (var i=0; i<sliderNodes.length; i++){				
			$KW.Slider.imgLoad(sliderNodes[i]);
        }
	},
	
    imgLoad: function(target) {
	
        var slider = target.parentNode.parentNode;
        var sliderModel = $KU.getModelByNode(target.parentNode);
		if(!sliderModel)
			return;
			
		if($KU.isAndroid && window.event && window.event.type == "load" && slider.offsetWidth == 0)
			return;
		
		if(sliderModel.view == "progress") {
			target.style.display ="none";		
		}

		var noofsteps = (sliderModel.max-sliderModel.min)/sliderModel.step;
		
		if(sliderModel.orientation =="horizontal")
		{
			var imght = target.offsetHeight-sliderModel.thickness;	
			var imgwt = target.width;		
			target.style.top = (-(imght)/2)+"px";	
			if(sliderModel.view == "progress")
				target.parentNode.style.width = 0+"px";
			else
				target.parentNode.style.width = (imgwt/2) +"px";
				
			target.parentNode.style.height = sliderModel.thickness +"px";
			var sliderwidth = slider.offsetWidth;
			var parentNode = slider.parentNode;	
			var height = parentNode.offsetHeight;
			if($KU.isFlexWidget(sliderModel) && height > imght){
				slider.style.position = 'relative';
				slider.style.top = (height - (slider.offsetHeight/2)) / 2 + 'px'; 
				slider.style.marginTop = slider.style.marginBottom = '';
			}
			else{
				slider.style.marginTop    = (imght/2) + "px";
				slider.style.marginBottom = (imght/2) + "px";
			}
			parentNode.style.paddingLeft = (imgwt/2) + "px";
			parentNode.style.paddingRight = (imgwt/2) + "px";
		}
		else
		{
			var imght = target.height;	
			var imgwt = target.offsetWidth-sliderModel.thickness;		
			target.style.left = -((imgwt)/2)+"px";	
			if(sliderModel.view =="progress")
				target.parentNode.style.height = "0px";
			else
				target.parentNode.style.height = (imght/2) +"px";			
			
			target.parentNode.style.width = sliderModel.thickness +"px";
			var sliderwidth = slider.offsetHeight;			
	
		}
		
		var stepwidth = sliderwidth/noofsteps;	
        sliderModel.noofsteps = noofsteps;
        sliderModel.stepwidth = stepwidth;
        sliderModel.imgwt = imgwt;
        if(sliderModel.selectedvalue >0)
        {
            $KW.Slider.sliderLoad(target.parentNode);
        }

    },
	
    sliderLoad: function(sliderNode) {
		var duration = 500;
		
        var sliderModel = $KU.getModelByNode(sliderNode);
        
        var imgNode = sliderNode.firstChild;
		if(sliderModel.orientation =="horizontal")
		{
		
			var imgoffset =imgNode.offsetWidth/2;	
		   
			var outerNode = sliderNode.parentNode;
			var cwidth = outerNode.offsetWidth;		
			var bodyoffset = $KW.Utils.getOffset(outerNode).left -imgoffset;
			
			var nearstep = sliderModel.selectedvalue-sliderModel.min;
					
			var move = (nearstep* sliderModel.stepwidth)/sliderModel.step;
			
			if(sliderModel.view =="progress") {
				if (kony.appinit.useTransition) {
						sliderNode.style[vendor + 'Transition'] = 'width ' + duration + 'ms ease';
						sliderNode.style.width = (move+imgoffset)+"px";		
				}
				else {
						$(sliderNode).animate({
							width: (move+imgoffset)+"px"
						}, duration);
				}
			}
			else{
				sliderNode.style.maxWidth = sliderNode.parentNode.parentNode.offsetWidth + "px";
				sliderNode.style.width = (move+imgoffset)+"px";		
			}
			
			imgNode.style.left = (move-imgoffset)+"px";		
		}
		else
		{
			var imgoffset =imgNode.offsetHeight/2;	
		   
			var outerNode = sliderNode.parentNode;
			var cwidth = outerNode.offsetHeight;		
			var bodyoffset = $KW.Utils.getOffset(outerNode).top -imgoffset;
			
			var nearstep = sliderModel.selectedvalue-sliderModel.min;
					
			var move = (nearstep* sliderModel.stepwidth)/sliderModel.step;
			
			if(sliderModel.view =="progress") {
				if (kony.appinit.useTransition) {
						sliderNode.style[vendor + 'Transition'] = 'height ' + duration + 'ms ease';
						sliderNode.style.height = (move+imgoffset)+"px";		
				}
				else {
						$(sliderNode).animate({
							height: (move+imgoffset)+"px"
						}, duration);
				}
			}
			else{
				sliderNode.style.height = (move+imgoffset)+"px";		
			}
			
			imgNode.style.top = (move-imgoffset)+"px";		
		
		
		}		

    },
    
    sliderUpdate: function(sliderNode,value) {
	
		var sliderModel = $KU.getModelByNode(sliderNode);
		if(value >= sliderModel.max)
			value = sliderModel.max;
		if(value <= sliderModel.min)
			value = sliderModel.min;  
                   //below code added for JSPFQA4849   
		var abc = value % sliderModel.step;
		if(abc != 0){
			value = sliderModel.step*Math.round(value/sliderModel.step);
		}                    
		sliderModel.selectedvalue = value; 
		$KW.Slider.sliderLoad(sliderNode);
	},
	
	adjustSliders : function(container) {	
		var sliderNodes = document.querySelectorAll("#" + formId + " img[kwttype ='kSlider']");				
		for (var i = 0; i < sliderElements.length; i++) {
			var sliderElement = sliderElements[i];
			$KW.Slider.imgLoad(sliderElement);
		}
	}
}
