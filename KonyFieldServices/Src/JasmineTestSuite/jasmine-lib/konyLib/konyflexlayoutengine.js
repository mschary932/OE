/**
  * Manages flex container layout
  */

$KW.FlexLayoutEngine = {

	/**
	* Performs layout for a given container.
	* @param : flexLayoutType
	* @param : container - Container for which layout has to perform.
	* @param : subwidgets - List op subwidgets in given container.
	*/
	performFlexLayout : function(layoutType, container, flexNode, widgets){
		switch (layoutType) 
		{
			case kony.flex.FLOW_HORIZONTAL:
				this.performHorizontalLayout(container, flexNode, widgets);
				break;
				
			case kony.flex.FLOW_VERTICAL:
				this.performVerticalLayout(container, flexNode, widgets);
				break;						
			
			default: //kony.flex.FREE_FORM
				this.performFreeFlowLayout(container, flexNode, widgets);
				break;	
		}
	},
	
	/**
	*	Sets CenterX, CenterY, left, right, top &  bottom with respect to flex container		
	*/
	performFreeFlowLayout: function(container, flexNode, widgets){
		
		var parentFrame = $KW.Utils.getWidgetFrame(flexNode);
		var wModel, wNode, widgetFrame;
		
		for(var i=0; i < widgets.length; i++){		
		
			wModel = widgets[i];
			if(!wModel.isvisible)
				continue;
				
			wNode = $KW.Utils.getWidgetNode(wModel, flexNode);
			
			if(!wNode)
				continue;
			wNode = wNode.parentNode;
			wModel.finalFrame = {};
			
			this.computeLayoutValues(wModel, flexNode, parentFrame);			
			this.determineSize(flexNode, wModel, wNode);
			
			widgetFrame = $KW.Utils.getWidgetFrame(wNode, false);
			
			this.determineX(wModel, widgetFrame, flexNode, parentFrame);
			this.determineY(wModel, widgetFrame, flexNode, parentFrame);

			wModel.setWidgetFrame(wModel.finalFrame, wNode); 
			
			wModel.frame = $KW.Utils.getWidgetFrame(wNode);
			wModel.dolayout && wModel.dolayout.call(wModel, wModel);
			this.onFlexLayout(wModel);
		}		
	},	
	
	performHorizontalLayout: function(container, flexNode, widgets){
		
		var parentFrame = $KW.Utils.getWidgetFrame(flexNode);	
		var wModel, wNode, widgetFrame, prevFrame;
		
		for(var i=0; i < widgets.length; i++){	
		
			wModel = widgets[i];	
			if(!wModel.isvisible)
				continue;
				
			wNode = $KW.Utils.getWidgetNode(wModel, flexNode);
			
			if(!wNode)
				continue;
			
			wNode = wNode.parentNode
			wModel.finalFrame = {};
			
			this.computeLayoutValues(wModel, flexNode, parentFrame);
			
			var prevModel, prevSibling;
			var prevWidgetInfo = this.getPreviousNode(wModel, wNode)
			if(prevWidgetInfo){
				prevModel = prevWidgetInfo[0];
				prevSibling = prevWidgetInfo[1];
			}
			prevFrame = prevSibling && $KW.Utils.getWidgetFrame(prevSibling);	
			
			this.determineSize(flexNode, wModel, wNode);
			widgetFrame = $KW.Utils.getWidgetFrame(wNode, false);
			
			this.determineHorizontalFlowX(wModel, widgetFrame, prevModel, prevFrame);			
			this.determineY(wModel, widgetFrame, flexNode, parentFrame);
	
			wModel.setWidgetFrame(wModel.finalFrame, wNode); 
			wModel.frame = $KW.Utils.getWidgetFrame(wNode);
			wModel.dolayout && wModel.dolayout.call(wModel, wModel);
			this.onFlexLayout(wModel);			
		}		
	},
	
	performVerticalLayout: function(container, flexNode, widgets){
	
		var parentFrame = $KW.Utils.getWidgetFrame(flexNode);	
		var wModel, wNode, widgetFrame, prevFrame;
		
		for(var i=0; i < widgets.length; i++){	
		
			wModel = widgets[i];
			if(!wModel.isvisible)
				continue;			
				
			wNode = $KW.Utils.getWidgetNode(wModel, flexNode);
			
			if(!wNode)
				continue;
				
			wNode = wNode.parentNode
			wModel.finalFrame = {};
			
			this.computeLayoutValues(wModel, flexNode, parentFrame);
			
			var prevModel, prevSibling;
			var prevWidgetInfo = this.getPreviousNode(wModel, wNode)
			if(prevWidgetInfo){
				prevModel = prevWidgetInfo[0];
				prevSibling = prevWidgetInfo[1];
			}
			prevFrame = prevSibling && $KW.Utils.getWidgetFrame(prevSibling);	
			
			this.determineSize(flexNode, wModel, wNode);
			widgetFrame = $KW.Utils.getWidgetFrame(wNode, false);
			this.determineX(wModel, widgetFrame, flexNode, parentFrame);
			this.determineVerticalFlowY(wModel, widgetFrame, prevModel, prevFrame);	
		
			wModel.setWidgetFrame(wModel.finalFrame, wNode); 
			wModel.frame = $KW.Utils.getWidgetFrame(wNode);
			wModel.dolayout && wModel.dolayout.call(wModel, wModel);
			this.onFlexLayout(wModel);			
		}	
	},
	
	onFlexLayout: function(wModel){
		if(wModel.wType == 'FlexContainer' || wModel.wType == 'FlexScrollContainer')
			wModel.forceLayout();	
		if(wModel.wType == 'Segment'){
			var segNode = $KU.getNodeByModel(wModel);
			if(segNode){
				$KW.FlexContainer.adjustFlexContainers(segNode.id, 'FlexContainer');
				if(wModel.viewtype == constants.SEGUI_VIEW_TYPE_PAGEVIEW)
					$KW.touch.computeWidths(segNode, wModel);
			}		
		}
		if(wModel.wType == 'TabPane')
			$KW.Form.initializeAllFlexContainers(wModel);
	},
	
	/**
	*	Sets width, minWidth, maxWidth, height, minHeight, maxHeight
	* 	Implicit width and height calculations need to be done in free form only
	*/
	determineSize: function(flexNode, wModel, wNode, updateUI){
	
		//Setting padding of widget with respect to container
		$KW.Utils.setPaddingByParent(wModel, wNode.childNodes[0], flexNode);
		
		var layoutModel = wModel.layoutModel;
        var wStyle = $KW.Utils.getWidth(wModel, layoutModel, wNode, flexNode, updateUI);
        var hStyle = $KW.Utils.getHeight(wModel, layoutModel, wNode, flexNode, updateUI);

		wNode.style.maxWidth = wNode.style.maxHeight = '';	
		var dimensions = wStyle.concat(hStyle);
		if(typeof updateUI == "undefined"){
			$KW.Utils.setDimensions(wModel, wNode, flexNode, dimensions);
		}	
		else{
			for(var i=0; i < dimensions.length ; i++){
				var parts = dimensions[i].split(':');
				wModel.finalFrame[parts[0]] = parts[1];
			}
		}
		//$KW.Utils.setPreferredWidth(wModel, wNode, wStyle);		
	},
	
	/**
	*	gets frame X value with respect to flex container		
	*/
	
	determineX: function(wModel, widgetFrame, flexNode, parentFrame){
		var layoutModel = wModel.layoutModel;
		var finalFrame = wModel.finalFrame;
		var flexContainer = wModel.parent;
		
		if(layoutModel.centerX){
			var centerX = layoutModel.centerX.value;
			var width = widgetFrame.width;
			if(layoutModel.centerX.unit == kony.flex.PERCENTAGE && flexContainer.layouttype == kony.flex.FREE_FORM)
				width = Math.floor((width / parentFrame.width) * 100);
			finalFrame.left = (centerX - (width / 2)) + layoutModel.centerX.unit;
		}					
		else if(layoutModel.left){
			finalFrame.left = layoutModel.left.value + layoutModel.left.unit;
		}
		else if(layoutModel.right){ //Need to set right value as corresponding left value for animation issues (When right is set and animating the left values yields issues)
			var hBorder = parseInt($KU.getStyle(flexNode, "border-left-width"), 10) + parseInt($KU.getStyle(flexNode, "border-right-width"), 10);
			var parentWidth = parentFrame.width - hBorder;
			var value = $KU.getValueByParentFrame(wModel, layoutModel.right, 'x');
			value = parentWidth - widgetFrame.width - value;
			finalFrame.left = value + kony.flex.PX;			
		}		
	},
	
	/**
	*	gets frame X value with respect to previous sibling		
	*/
	determineHorizontalFlowX: function(wModel, widgetFrame, prevModel, prevFrame){
		var layoutModel = wModel.layoutModel;
		var finalFrame = wModel.finalFrame;
		prevFrame = prevFrame || {x: 0, y: 0, width: 0, height: 0};
		var left = prevFrame.x + prevFrame.width;
		
		if(layoutModel.centerX){
			left += layoutModel.centerX.value - (widgetFrame.width / 2);
		}					
		else if(layoutModel.left){
			left += layoutModel.left.value;
		}
		
		if(prevModel && prevModel.layoutModel && prevModel.layoutModel.right){
			left += prevModel.layoutModel.right.value;
		}
		
		finalFrame.left = parseInt(left, 10) + kony.flex.PX;
	},
	
	/**
	*	gets frame Y value with respect to flex container		
	*/	
	determineY: function(wModel, widgetFrame, flexNode, parentFrame){
		var layoutModel = wModel.layoutModel;
		var finalFrame = wModel.finalFrame;
		var flexContainer = wModel.parent;
		
		if(layoutModel.centerY){
			var centerY = layoutModel.centerY.value;
			var height = widgetFrame.height;			
			if(layoutModel.centerY.unit == kony.flex.PERCENTAGE && flexContainer.layouttype == kony.flex.FREE_FORM)
				height = Math.floor((height / parentFrame.height) * 100);
			
			finalFrame.top = (centerY - (height / 2)) + layoutModel.centerY.unit;
		}					
		else if(layoutModel.top){
			finalFrame.top = layoutModel.top.value + layoutModel.top.unit;
		}
		else if(layoutModel.bottom){
			var vBorder = parseInt($KU.getStyle(flexNode, "border-top-width"), 10) + parseInt($KU.getStyle(flexNode, "border-bottom-width"), 10);
			var parentHeight = parentFrame.height - vBorder;
			var value = $KU.getValueByParentFrame(wModel, layoutModel.bottom, 'y');
			value = parentHeight - widgetFrame.height - value;
			finalFrame.top = value + kony.flex.PX;	
		}
	},
	
	/**
	*	gets frame Y value with respect to previous sibling		
	*/
	determineVerticalFlowY: function(wModel, widgetFrame, prevModel, prevFrame){
		var layoutModel = wModel.layoutModel;
		var finalFrame = wModel.finalFrame;
		prevFrame = prevFrame || {x: 0, y: 0, width: 0, height: 0};
		var top = prevFrame.y + prevFrame.height;
		
		if(layoutModel.centerY){
			top += layoutModel.centerY.value - (widgetFrame.height / 2);
		}					
		else if(layoutModel.top){
			top += layoutModel.top.value;
		}
		
		if(prevModel && prevModel.layoutModel && prevModel.layoutModel.bottom){
			top += prevModel.layoutModel.bottom.value;
		}
		finalFrame.top = top + kony.flex.PX;
	},
	
	/*	Need to set actual unit in case of free flow layout for animations
	 *
	 */	
	getComputedValue: function(wModel, parentFrame, value, axis){
		if(!$KU.isValidCSSLength(value))
			return null;
		var  resultObj = $KU.getValueAndUnit(wModel, value);
		var value = resultObj.value;
		var unit = resultObj.unit;
		if(wModel.parent.layouttype != kony.flex.FREE_FORM && unit == kony.flex.PERCENTAGE){
			if(axis == 'x')
				value = (value * parentFrame.width) / 100;	
			else if(axis == 'y')
				value = (value * parentFrame.height) / 100;
			unit = kony.flex.PX;		
		}			
		return {value: value, unit: unit};
	},
	
	computeLayoutValues: function(wModel, flexNode, parentFrame, frameObj){
		var model = wModel.layoutModel = {};
		var dataModel = frameObj || wModel;
		var centerX, centerY, left, right, top, bottom, width, minWidth, maxWidth, height, minHeight, maxHeight;
		var widgetData = {};
		if(flexNode.dataObj){
			var dataObj = flexNode.dataObj;
			var rowData = dataObj.data;
			var map = dataObj.map;
			var data = rowData[map[wModel.id]];
			if(data && data instanceof Object)
				widgetData = data;
		}
		
		centerX = this.isAvailable(widgetData.centerX) ? widgetData.centerX : dataModel.centerX;
		centerY = this.isAvailable(widgetData.centerY) ? widgetData.centerY : dataModel.centerY;
		left = this.isAvailable(widgetData.left) ? widgetData.left : dataModel.left;
		right = this.isAvailable(widgetData.right) ? widgetData.right : dataModel.right;
		top = this.isAvailable(widgetData.top) ? widgetData.top : dataModel.top;
		bottom = this.isAvailable(widgetData.bottom) ? widgetData.bottom : dataModel.bottom;
		width = this.isAvailable(widgetData.width) ? widgetData.width : dataModel.width;
		minWidth = this.isAvailable(widgetData.minWidth) ? widgetData.minWidth : dataModel.minWidth;
		maxWidth = this.isAvailable(widgetData.maxWidth) ?  widgetData.maxWidth : dataModel.maxWidth;
		height = this.isAvailable(widgetData.height) ? widgetData.height : dataModel.height;
		minHeight = this.isAvailable(widgetData.minHeight) ? widgetData.minHeight : dataModel.minHeight;
		maxHeight = this.isAvailable(widgetData.maxHeight) ?  widgetData.maxHeight : dataModel.maxHeight;
		
		model.centerX = this.getComputedValue(wModel, parentFrame, centerX, 'x');
		model.centerY = this.getComputedValue(wModel, parentFrame, centerY, 'y');		
		model.left = this.getComputedValue(wModel, parentFrame, left, 'x');
		model.right = this.getComputedValue(wModel, parentFrame, right, 'x');
		model.top = this.getComputedValue(wModel, parentFrame, top, 'y');
		model.bottom = this.getComputedValue(wModel, parentFrame, bottom, 'y');		
		
		model.width = this.getComputedValue(wModel, parentFrame, width, 'x');
		model.minWidth = this.getComputedValue(wModel, parentFrame, minWidth, 'x');
		model.maxWidth = this.getComputedValue(wModel, parentFrame, maxWidth, 'x');

		model.height = this.getComputedValue(wModel, parentFrame, height, 'y');
	    model.minHeight = this.getComputedValue(wModel, parentFrame, minHeight, 'y');
		model.maxHeight = this.getComputedValue(wModel, parentFrame, maxHeight, 'y');			
	},
	
	computeKeyFrameValues: function(wModel, frameObj){
		var framesArray = []; 
		var result = {};
		if(frameObj){
			wModel.finalFrame = {};
			
			var wNode = $KW.Utils.getWidgetNode(wModel);
			wNode = wNode.parentNode;
			var parentModel = wModel.parent;
			var flexNode = $KU.getNodeByModel(parentModel);
			var parentFrame = $KW.Utils.getWidgetFrame(flexNode);
			
			this.computeLayoutValues(wModel, flexNode, parentFrame, frameObj);
			this.determineSize(flexNode, wModel, wNode, false);
			
			var widgetFrame = $KW.Utils.getWidgetFrame(wNode, false);
			var layoutModel = wModel.layoutModel;
			
			//When width and centerX are defined in step, respect this width in calculting centerX.  
			if(wModel.finalFrame.width && (layoutModel.centerX || layoutModel.right)){
				var width = wModel.finalFrame.width;
				var valueObj = {value: parseFloat(width), unit: $KU.getUnit(width)};
				widgetFrame.width = $KU.getValueByParentFrame(wModel, valueObj, 'x');
			}
			
			if(wModel.finalFrame.height && (layoutModel.centerY || layoutModel.bottom)){
				var height = wModel.finalFrame.height;
				var valueObj = {value: parseFloat(height), unit: $KU.getUnit(height)};
				widgetFrame.height = $KU.getValueByParentFrame(wModel, valueObj, 'y');
			}	
			
			var widgetIndex = $KW.Utils.getWidgetIndex(wModel);
			var widgets = parentModel.widgets();
			var prevModel, prevSibling;
			var prevWidgetInfo = this.getPreviousNode(wModel, wNode)
			if(prevWidgetInfo){
				prevModel = prevWidgetInfo[0];
				prevSibling = prevWidgetInfo[1];
			}
			var	prevFrame = prevSibling && $KW.Utils.getWidgetFrame(prevSibling);
			/*if(prevModel)	
				this.computeLayoutValues(prevModel, flexNode, parentFrame);*/
			
			if(parentModel.layouttype == kony.flex.FLOW_HORIZONTAL){	
				if(layoutModel.centerX || layoutModel.left)
					this.determineHorizontalFlowX(wModel, widgetFrame, prevModel, prevFrame);
			}	
			else
				this.determineX(wModel, widgetFrame, flexNode, parentFrame);
			
			if(parentModel.layouttype == kony.flex.FLOW_VERTICAL){
				if(layoutModel.centerY || layoutModel.top)
					this.determineVerticalFlowY(wModel, widgetFrame, prevModel, prevFrame);	
			}	
			else
				this.determineY(wModel, widgetFrame, flexNode, parentFrame);
			
			for(var prop in wModel.finalFrame)
				result[prop] = wModel.finalFrame[prop];
				
			framesArray.push(result);	
			
			//Get previous widget frames information
			if(parentModel.layouttype == kony.flex.FLOW_HORIZONTAL){
				if(result.left || result.width || result["min-width"] || result["max-width"]){
					for(var i = widgetIndex + 1; i<widgets.length; i++){
						var nextWidget = widgets[i];
						var prevWidget = widgets[i - 1];
						var frame = nextWidget.frame;
						if(frame){
							var prevFrame = {};
							var width;
							
							prevFrame.x = result.left ? parseInt(result.left, 10) : prevWidget.frame.x;
							
							if(result.width){
								width = parseInt(result.width, 10);
							}
							else if(result["min-width"]){
								width = parseInt(result["min-width"], 10);
								if(width < prevWidget.frame.width){
									width = prevWidget.frame.width;
									result["min-width"] = prevWidget.frame.width + 'px';
								}	
							}
							else if(result["max-width"]){
								width = parseInt(result["max-width"], 10);
								if(width > prevWidget.frame.width){
									width = prevWidget.frame.width;
									result["max-width"] = prevWidget.frame.width + 'px';
								}	
							}
							else 
								width = prevWidget.frame.width;
							
							prevFrame.width = width;
							this.determineHorizontalFlowX(nextWidget, frame, prevWidget, prevFrame);
							result = {left: nextWidget.finalFrame.left};
							framesArray.push(result);
						}	
					}
				}
			}
			
			if(parentModel.layouttype == kony.flex.FLOW_VERTICAL){
				if(result.top || result.height || result["min-height"] || result["max-height"]){
					for(var i = widgetIndex + 1; i<widgets.length; i++){
						var nextWidget = widgets[i];
						var prevWidget = widgets[i - 1];
						var frame = nextWidget.frame;
						if(frame){
							var prevFrame = {};
							var height;
							
							prevFrame.y = result.top ? parseInt(result.top, 10) : prevWidget.frame.y;
							
							if(result.height){
									height = parseInt(result.height, 10);
							}
							else if(result["min-height"]){
								height = parseInt(result["min-height"], 10);
								if(height < prevWidget.frame.height){
									height = prevWidget.frame.height;
									result["min-height"] = prevWidget.frame.height + 'px';
								}	
							}
							else if(result["max-height"]){
								height = parseInt(result["max-height"], 10);
								if(height > prevWidget.frame.height){
									height = prevWidget.frame.height;
									result["max-height"] = prevWidget.frame.height + 'px';
								}	
							}
							else 
								height = prevWidget.frame.height;
							
							prevFrame.height = height;
							this.determineVerticalFlowY(nextWidget, frame, prevWidget, prevFrame);
							result = {top: nextWidget.finalFrame.top};
							framesArray.push(result);
						}	
					}
				}
			}
		}
		return framesArray;
	},		

	isAvailable: function(value){
		return value == undefined ? false : true;
	},

	toPointwidget: function(wModel, parentModel, value, axis){
		if(!$KU.isValidCSSLength(value))
			return null;
		var resultObj = $KU.getValueAndUnit(wModel, value);
		var value = resultObj.value;
		var unit = resultObj.unit;
		
		var wNode =  $KW.Utils.getWidgetNode(wModel);
		var elePos = $KW.Utils.getPosition(wNode);
		var parentNode =  $KW.Utils.getWidgetNode(parentModel); 
		var parPos = $KW.Utils.getPosition(parentNode);
		
		if(axis == "x") {
			value = elePos.left - parPos.left + value;		
		}else if(axis == "y") {
			value = elePos.top - parPos.top + value;		
		}
			
		return {value: value, unit: unit};
	},

	/* When previous widget is hidden or data is not set, get the proper previous node to compute previous frame info. 
	 *		
	 */	
	getPreviousNode: function(wModel, wNode){
		
		var widgetIndex = $KW.Utils.getWidgetIndex(wModel);
		if(widgetIndex == 0)
			return null;
		
		var parentModel = wModel.parent;		
		var widgets = parentModel.widgets();
		var prevIndex = widgetIndex - 1;
		var previousNode = wNode.previousSibling;
		var data;
		var dataMap = {ComboBox: 'masterdata', ListBox: 'masterdata', RadioButtonGroup: 'masterdata', CheckBoxGroup: 'masterdata', Segment:'data',  DataGrid: 'data'};
		for(var i = prevIndex; i >= 0; i--){
			var prevModel = widgets[i]; 
			var dataKey = dataMap[prevModel.wType];
			data = dataKey ? prevModel[dataKey] : '';
			if(!prevModel.isvisible || (dataKey && !data) || (data && $KU.isArray(data) && data.length == IndexJL)){
				previousNode = previousNode.previousSibling;
				continue;
			}
			return [prevModel, previousNode];	
		}	
	}	
}