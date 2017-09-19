
/*
 * Widget : Image
 */
$KW.Image = {

    initialize: function(){
        kony.events.addEvent("click", "Image", this.eventHandler);
		kony.events.addEvent("onorientationchange", "Image", this.imgOrientationHandler);
    },
	imgOrientationHandler: function(){
		var editImages = document.querySelectorAll("img[kwidgettype='Image']");		
		if(editImages){
			for(var i=0; i < editImages.length; i++){
				var editImage = editImages[i];
				$KW.Image.imgResizeHandler(editImage,"orientationchange");
			}
		}
	},
    /**
     * Updates the view of the listbox widget.
     */
    updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue){

        var element = $KU.getNodeByModel(widgetModel);
		
		switch (propertyName) {       
            case "src": 
				widgetModel.srcType = 1;
				//widgetModel.srcType=(!propertyValue||propertyValue=="")?(widgetModel.base64?2:0):1;
                if (element && !$KW.Utils.belongsToSegment(element)) {
                    if (propertyValue != oldPropertyValue) {
                        if (!$KU.inArray($KU.imgCache, propertyValue, true)) 
                            element.parentNode.style.background = "url(" + $KU.getImageURL(widgetModel.imagewhiledownloading) + ") center center no-repeat";
                    }
                    element.src = propertyValue ? $KU.getImageURL(propertyValue) : "";
                }
				
				
				 break;
                
            case "base64":    
                widgetModel.srcType = 2;
				//widgetModel.srcType=(!propertyValue||propertyValue=="")?(widgetModel.src?1:0):2;
                if (element && propertyValue) {
                    element.src = this.getBase64String(propertyValue);
                }
                break;
            
            case "referenceheight":
            case "referencewidth":			
            case "imagescalemode":
                element && (element.parentNode.parentNode.innerHTML = this.render(widgetModel, new $KW.WidgetGenerationContext(widgetModel.pf)));
				$KW.FlexContainer.attachDragEvent(widgetModel);
				break; 
        }
    },
    
	/**
     * Img Scalemodes : 
     * default : natural width & height
     * maintainaspectratio : set width 100%
     * fixed : (coming as 'retaininitialimagedimensions') : apply the given height and width    				 
     */
    render: function(imageModel, context){
    
        var computedSkin = $KW.skins.getSplitSkinsBetweenWidgetAndParentDiv(imageModel, context);
        var htmlString = "";
        var style = "";
        imageModel.loaded = false;
        var isFlexWidget = $KU.isFlexWidget(imageModel);

        if(context.scrollBoxID)
            imageModel.scrollBoxID = context.scrollBoxID;

        var isWaitAllowed = true;
        if ($KU.inArray($KU.imgCache, imageModel.src, true)) 
            isWaitAllowed = false;
        // Precache widget level loading image, if any
        if (isWaitAllowed && imageModel.imagewhiledownloading)
            new Image().src = $KU.getImageURL(imageModel.imagewhiledownloading);
        
        imageModel.imagewhiledownloading = imageModel.imagewhiledownloading || $KG["imagewhiledownloading"] || "imgload.gif";
		var css = $KW.skins.getVisibilitySkin(imageModel) + (isFlexWidget? " middlecenteralign": "");
        var useWidgetSize = '';
		
        if (context.ispercent === false) {
            useWidgetSize = context.layoutDir ? "float:" + context.layoutDir : "";
        }
        else {
            useWidgetSize = "width:100%";
        }
        
        if(imageModel.srcType == 2)
            imgsrc = this.getBase64String(imageModel.base64);
        else
            imgsrc =  $KU.getImageURL(imageModel.src)
			
        var onimgonload = "$KU.imgLoadHandler(arguments[0],this)";
        
        if(context.container){
			var container = context.container;
			if(container.wType == "Segment" && container.selectionindicator == imageModel.id && container.behavior  != "default" && container.selectimage && container.unselectimage){
				var indicator = $KU.inArray(container.selectedRows, (IndexJL) ? [null, container.seccounter, container.rowcounter] : [container.seccounter, container.rowcounter])[0] ? container.selectimage : container.unselectimage;
				imgsrc = $KU.getImageURL(indicator);
			}
		}        

		var dimensions = this.getImageDimensions(imageModel, context.ispercent);
			
		style += (dimensions.width != undefined ? ("width:" + dimensions.width + "px;") : "") + (dimensions.height != undefined ? ("height:" + dimensions.height + "px;") : "");
        
		onimgonload = dimensions.onimgonload || onimgonload;
		if(dimensions.maxwidth){
			style = dimensions.maxwidth;
		} 

		// span
		if(kony.appinit.isiPhone || $KU.isBlackBerry){
			htmlString += "<span id='" + (imageModel.pf + "_" + imageModel.id) + "_span' class='" + css + " " + computedSkin[0] + "' style='" + (isWaitAllowed && imageModel.src ? "background:url(" + $KU.getImageURL(imageModel.imagewhiledownloading) + ") center center no-repeat;" : ";") + $KW.skins.getMarginSkin(imageModel, context) + $KW.skins.getPaddingSkin(imageModel, context) + useWidgetSize + ";" + style + "'>";
		}else{
			htmlString += "<span id='" + (imageModel.pf + "_" + imageModel.id) + "_span' class='" + css + " " + computedSkin[0] + "' style='display:inline-block;" + (isWaitAllowed && imageModel.src ? "background:url(" + $KU.getImageURL(imageModel.imagewhiledownloading) + ") center center no-repeat;" : ";") + $KW.skins.getMarginSkin(imageModel, context) + $KW.skins.getPaddingSkin(imageModel, context) + useWidgetSize + ";" + style + "'>";
		}
		
		// img
		htmlString += "<img class='"  + "' src='" + imgsrc+ "'" + $KW.Utils.getBaseHtml(imageModel, context) + "onload= "+onimgonload +" onerror='$KU.imgLoadHandler(arguments[0],this)' ";
		
		if (!(imageModel.name == "kony.ui.Image2" || imageModel.name == "konyLua.Image2") && imageModel.scalemode == "maintainaspectratio") {
			style = "width:100%;";
		}
		else if (imageModel.scalemode == "retaininitialimagedimensions") {
			style = "";
		}
        
        if (isWaitAllowed && imageModel.src){
            if(kony.appinit.isIE8 || kony.appinit.isIE7){
              style += "opacity:0;";  
            }
            else{
              style += "visibility:hidden;opacity:0;";     
            }
        } 
        var downloadComplete = imageModel.ondownloadcomplete || "";
		if(downloadComplete){
			downloadComplete = (typeof(downloadComplete) == 'function') ? $KU.getFunctionName(imageModel.ondownloadcomplete) : imageModel.ondownloadcomplete;
			downloadComplete = " ondownloadcomplete= '" + downloadComplete + "'";
		}
        htmlString += "style= '" + style +"'" +  downloadComplete + "/></span>";
        return htmlString;
    },
	
	getImageDimensions : function (imageModel, contextIsPercent){
		var dimensions = {}; //only new image works as old image psp generation to be considered
		if(imageModel.imagescalemode == constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS) //as reference width is mandatory property
        {            
			var isFlexWidget = $KU.isFlexWidget(imageModel);
			if(!isFlexWidget){
				if(imageModel.referencewidth){
					if(contextIsPercent == false)
						dimensions.width = imageModel.referencewidth;              
					else
						dimensions.width= (((screen.width * (imageModel.containerweight / 100)) > imageModel.referencewidth) ? imageModel.referencewidth: (screen.width * (imageModel.containerweight / 100)));            

					dimensions.height = imageModel.referenceheight;
				}
				else
					dimensions.maxwidth = "max-width:100%;";
			}
        } 
        else if((imageModel.name == "kony.ui.Image2" || imageModel.name == "konyLua.Image2") && imageModel.imagescalemode == constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO) //as reference width is mandatory property
        {
            imageModel.ispercent = contextIsPercent;
            dimensions.onimgonload="$KW.Image.imgLoadHandler2(arguments[0])"; 
        }
		else if(!imageModel.referencewidth && imageModel.heightwidth && imageModel.imagescalemode!=constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO)
        {
			var dim = (imageModel.heightwidth).split(",");
			dimensions.width = dim[1];
			dimensions.height = dim[0];
        }
        else
		{
            dimensions.maxwidth = "max-width:100%;";	
		}
		return dimensions;
	},
       
    getBase64String: function(propertyValue){
        return "data:image/png;base64," + propertyValue;
    },
  
    eventHandler: function(eventObject, target) {
        var imgWidgetModel = $KU.getModelByNode(target), containerId = target.getAttribute("kcontainerID");
        //If the widget is a segment child, update segment data i.e focusedindex and focuseditem         
        if (containerId) {
            $KW.Utils.updateContainerData(imgWidgetModel, target, true);
        } else {
            kony.events.executeBoxEvent(imgWidgetModel);
        }
    },
   
    imgLoadHandler2: function(event){
        event = event || window.event; 
		img = event.target || event.srcElement;		
		this.imgResizeHandler(img, event.type);
	},
	
	imgResizeHandler: function(img, eventType){
        var tabPaneID = img.getAttribute("ktabpaneid");
        var type = img.getAttribute("kwidgettype");
        
        var targetWidgetID = (type == 'Image') ? $KU.getElementID(img.getAttribute("id")) : img.getAttribute("id");
        var src = img.src;
		
		var imageModel = kony.model.getWidgetModel(img.getAttribute("kformname"), targetWidgetID, tabPaneID);
		
		var actimgdim = $KW.Image.getNaturalDimensions(img);
		
        if (eventType == "load") {
            var isWaitAllowed = true;
            if ($KU.inArray($KU.imgCache, src, true)) 
                isWaitAllowed = false;
            else 
                $KU.imgCache.push(src);
            
            if (isWaitAllowed || img.parentNode.style.background.indexOf("url") != -1) {
                var span = img.parentNode;
				if(span){
					if(span.style.removeProperty)
						span.style.removeProperty("background");
					else	
						span.style.background = "none";
				}
                if($KU.isBlackBerry && $KU.getPlatformVersion("blackberry").startsWith("7")) //Screen flickers with css transition on BB
                    img.style.opacity = 1;
                else{   
                    img.style[vendor + 'Transition'] = "opacity 500ms ease-in-out";
                    img.style.opacity = 1;
                }
            }            
        }

        //animation check, animation call after image load.
		imageModel.loaded = true;
		if(imageModel.animInfo){
			var info = imageModel.animInfo;
			info.instance.animate(imageModel, info.animConfig, info.animCallback);
		}	      

        //var imgwidth = screen.width*(imageModel.containerweight/100);//img.parentNode.parentNode.offsetWidth;
        if(!img.parentNode || !img.parentNode.parentNode) return;
		
		var ondownloadcompleteref = $KU.returnEventReference(img.getAttribute("ondownloadcomplete"));
        ondownloadcompleteref  && ondownloadcompleteref.call(imageModel, imageModel, src, false); 
		
		var imgwidth = img.parentNode.parentNode.offsetWidth;
		if(imageModel.containerWeight > 0 && imgwidth == 0) 
			imgwidth = actimgdim.width;
            
		var isFlexWidget = $KU.isFlexWidget(imageModel);	
		// Finally set image dimensions
		if(!isFlexWidget){
			var dimensions = []; //only new image works as old image psp generation to be considered
			dimensions = $KW.Image.imgDimCalculation(imageModel, actimgdim, imgwidth);        
			img.style.width = img.parentNode.style.width = dimensions[1] + "px";
			img.style.height = img.parentNode.style.height = dimensions[0] + "px";
		}
		img.style.display = "";
		img.style.visibility = "visible";        
        img.parentNode.parentNode.style["font-size"] = "0px";
		
        $KU.onImageLoadComplete(imageModel, img);
		
		var parentModel = imageModel.parent;
		if(parentModel.wType == 'HBox'){
			var parentNode = $KU.getParentByAttribute(img.parentNode, "kwidgettype");
			if(parentNode){
				var	vLineNodes = parentNode.querySelectorAll("div[kwidgettype='Line'][direction='V']");
				for (var i = 0; i < vLineNodes.length; i++){
					$KW.Line.resizeVLine(vLineNodes[i]);			
				}
			}
		}
    },
	
	getNaturalDimensions: function(img){
		var actimgdim = {};
		if (typeof img.naturalWidth == "undefined") { //IE8
			var i = new Image();
			i.src = img.src;
			actimgdim.width = i.width;
			actimgdim.height = i.height;
		}
		else {
			actimgdim.width = img.naturalWidth;
			actimgdim.height = img.naturalHeight;
		}
		return actimgdim;
	}, 
    
    imgDimCalculation :  function (imageModel, actimgdim, imgwidth) {
        var dimensions = [];
        var aspectRatio = (actimgdim.width / actimgdim.height);  
        if(!imageModel.referencewidth)
        {
            if(imageModel.ispercent === false)
            {                
                dimensions[1] = actimgdim.width;
                dimensions[0] = actimgdim.height;                  
            }
            else
            {
                if(actimgdim.width <= imgwidth)
                {
                    if(imageModel.referenceheight && actimgdim.height > imageModel.referenceheight)
                    {
                        dimensions[0] = imageModel.referenceheight;
                        dimensions[1] = dimensions[0]*aspectRatio;
                    }
                    else
                    {
                        dimensions[1] = actimgdim.width;
                        dimensions[0] = actimgdim.height;
                    }
                }
                else
                {
                    dimensions[1] = imgwidth;
                    if(!imageModel.referenceheight)
                        dimensions[0] = dimensions[1] / aspectRatio;
                    else
                    {
                        dimensions[0] = dimensions[1] / aspectRatio;
                        if(dimensions[0] > imageModel.referenceheight)
                        {
                            dimensions[0] = imageModel.referenceheight;
                            dimensions[1] = dimensions[0] * aspectRatio;
                        }  
                    }
                }   
                       
            }
        } 
        else {
            if(imageModel.ispercent === false){
                if(actimgdim.width < imageModel.referencewidth)
                {
                    dimensions[1] = actimgdim.width;
                    dimensions[0] = actimgdim.height;   
                }
                else
                {
                    dimensions[1] = imageModel.referencewidth;
                    dimensions[0] = dimensions[1]/aspectRatio;    
                }           
              
            }
            else
            {
                var computedimgwidth = (imageModel.referencewidth <= imgwidth) ? imageModel.referencewidth : imgwidth;
                if(!imageModel.referenceheight)
                {
                    if(actimgdim.width < computedimgwidth)
                    {
                        dimensions[0] = actimgdim.height;
                        dimensions[1] = actimgdim.width;                     
                    }
                    else
                    {
                        dimensions[1] = computedimgwidth;
                        dimensions[0] = dimensions[1]/aspectRatio;      
                    }
                }
                else
                {  
                    var checkDim = (actimgdim.width < computedimgwidth) ? (actimgdim.height < imageModel.referenceheight ? true : false) : false;
                    if(!checkDim)
                    {       
                        dimensions[1] = (((imgwidth) > imageModel.referencewidth) ? imageModel.referencewidth: (imgwidth));
                        dimensions[0] = imageModel.referenceheight;            
                        var imgdim = (dimensions[1]/aspectRatio) < dimensions[0] ? (dimensions[1]/aspectRatio) : false;
                        if(imgdim === false)         
                            dimensions[1] = (dimensions[0]*aspectRatio <= imageModel.referencewidth) ? dimensions[0]*aspectRatio :false;            
                        else
                            dimensions[0] = imgdim;            
                    }
                    else
                    {
                        dimensions[0] = actimgdim.height;
                        dimensions[1] = actimgdim.width;                
                    } 
                }                               
            }
        }
       
        if(dimensions[1] > 0 && dimensions[1] < 1)
            dimensions[1] = 1;
        
        if(dimensions[0] > 0 && dimensions[0] < 1)
            dimensions[0] = 1;
        
		
		return dimensions;
    },

    setBase64Img: function(widgetModel){
    
        if (widgetModel.src && !widgetModel.src.startsWith("http")) { //Don't set the base64 for external imgs as the XHR will fail with cross origin issue	
            var req = new XMLHttpRequest();
            req.onreadystatechange = function(){
                if (req.readyState == 4 && req.status == 200) {
                    widgetModel.base64 = $KU.getBase64(req.responseText) || null;
                }
            }
            req.open('GET', $KU.getImageURL(widgetModel.src), true);
            if (req.overrideMimeType) 
                req.overrideMimeType('text/plain; charset=x-user-defined');
            req.send(null);
        }
        else 
            widgetModel.base64 = null;
        
        /*var canvas = document.createElement("canvas"); //It works only in iphone
         canvas.width = img.naturalWidth;
         canvas.height = img.naturalHeight;
         // Copy the image contents to the canvas
         var ctx = canvas.getContext("2d");
         ctx.drawImage(img, 0, 0);
         return canvas.toDataURL("image/png");*/
    }
}
