kony.inherits = function(subClass, baseClass) {
   
   function inherit() {}
   
   inherit.prototype = baseClass.prototype;
   subClass.prototype = new inherit();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
};

kony.ui = {

	Widget: function(bconfig, lconfig, pspconfig) {

		// Exception handling
		if(arguments.length < 3)
			throw new KonyError(101, "Error", "Invalid number of arguments");	// (errorcode, name, message)
			
		if (bconfig.id === undefined || bconfig.id === null || bconfig.id === '') {
			throw new KonyError(1102,'WidgetError','Widget cannot be created due to invalid input data.');
		}

		this.id = bconfig.id;
		this.focusskin = bconfig.focusSkin;	
        this.isvisible =  bconfig.isVisible===undefined ? true : (bconfig.isVisible && true);
		bconfig.i18n_text && (this.i18n_text = bconfig.i18n_text);
		
        this.containerweight = lconfig.containerWeight || 0;
		this.contentalignment = lconfig.contentAlignment;   //1-topleft, 2-topcenter, 3-topright, 4-middleleft, 5-center, 6-middleright, 7-bottomleft, 8-bottomcenter, 9-bottomright  
		this.widgetalignment = lconfig.widgetAlignment;
        this.marginInPixel = lconfig.marginInPixel;
        this.paddingInPixel = lconfig.paddingInPixel;
        this.blockeduiskin =  pspconfig.blockedUISkin; 
		this.hexpand = (typeof lconfig.hExpand == "undefined") ? false : lconfig.hExpand;

        this.enabled = false;
		this.canUpdateUI = true;

        this.onclick = bconfig.onClick;
		
		this.accessibilityconfig = bconfig.accessibilityConfig;
		
		defineGetter(this, "accessibilityConfig", function() {
			return this.accessibilityconfig;
		});	
		
		defineSetter(this, "accessibilityConfig", function(val) {
			var oldValue = this.accessibilityconfig;
			this.accessibilityconfig = val;
			kony.model.updateView(this,  "accessibilityConfig" , val, oldValue);
			
		});
		
        var margin = (!lconfig.margin) ? [0,0,0,0] : lconfig.margin;
		defineGetter(this, "margin", function() {
			return margin;
		});
		defineSetter(this, "margin", function(val) {
			margin = val;
			$KU.isArray(val) && kony.model.updateView(this,  "margin" , val);
		});
        
        var padding = (!lconfig.padding)? [0,0,0,0] : lconfig.padding;
		defineGetter(this, "padding", function() {
			return padding;
		});
		defineSetter(this, "padding", function(val) {
			padding = val;
			$KU.isArray(val) && kony.model.updateView(this,  "padding" , val);
		});
        				
		var skin = bconfig.skin;	
		defineGetter(this, "skin", function() {
			return skin;
		});	
		defineSetter(this, "skin", function(val) {
			var oldvalue = skin;
			skin = val;
			kony.model.updateView(this,  "skin" , val, oldvalue);
		});		
		
		this.onDrag = bconfig.onDrag;
		this.frame = {};
		var left = bconfig.left;
		defineGetter(this, "left", function() {
			return left;
		});
		defineSetter(this, "left", function(val) {
			left = val;			
		});
		
		var right = bconfig.right;
		defineGetter(this, "right", function() {
			return right;
		});
		defineSetter(this, "right", function(val) {
			right = val;			
		});
		
		var top = bconfig.top;
		defineGetter(this, "top", function() {
			return top;
		});
		defineSetter(this, "top", function(val) {
			top = val;			
		});
		
		var bottom = bconfig.bottom;
		defineGetter(this, "bottom", function() {
			return bottom;
		});
		defineSetter(this, "bottom", function(val) {
			bottom = val;			
		});
		
		var width = bconfig.width;
		defineGetter(this, "width", function() {
			return width;
		});
		defineSetter(this, "width", function(val) {
			width = val;					
		});
		
		var height = bconfig.height;
		defineGetter(this, "height", function() {
			return height;
		});
		defineSetter(this, "height", function(val) {
			height = val;			
		});
		
		this.minwidth = bconfig.minWidth;
		defineGetter(this, "minWidth", function() {
			return this.minwidth;
		});
		defineSetter(this, "minWidth", function(val) {
			this.minwidth = val;			
		});
		
		this.maxwidth = bconfig.maxWidth;
		defineGetter(this, "maxWidth", function() {
			return this.maxwidth;
		});
		defineSetter(this, "maxWidth", function(val) {
			this.maxwidth = val;			
		});
		
		this.minheight = bconfig.minHeight;
		defineGetter(this, "minHeight", function() {
			return this.minheight;			
		});
		defineSetter(this, "minHeight", function(val) {
			this.minheight = val;			
		});
		
		this.maxheight = bconfig.maxHeight;
		defineGetter(this, "maxHeight", function() {
			return this.maxheight;				
		});
		defineSetter(this, "maxHeight", function(val) {
			this.maxheight = val;			
		});
		
		/*var center = lconfig.center || {};
		var centerX, centerY;
		defineGetter(this, "center", function() {
			return center;
		});
		defineSetter(this, "center", function(val) {
			center = val;			
		});
		
		defineGetter(this.center, "x", function() {
			return centerX;
		});
		defineSetter(this.center, "x", function(val) {
			centerX = val;			
		});

		defineGetter(this.center, "y", function() {
			return centerY;
		});
		defineSetter(this.center, "y", function(val) {
			centerY = val;			
		});*/
		
		this.centerx = bconfig.centerX;
		defineGetter(this, "centerX", function() {
			return this.centerx;
		});
		defineSetter(this, "centerX", function(val) {
			this.centerx = val;			
		});
		
		this.centery = bconfig.centerY;
		defineGetter(this, "centerY", function() {
			return this.centery;
		});
		defineSetter(this, "centerY", function(val) {
			this.centery = val;			
		});
		
		this.zindex = bconfig.zIndex || 1;
		defineGetter(this, "zIndex", function() {
			return this.zindex;
		});
		defineSetter(this, "zIndex", function(val) {
			this.zindex = val;
			kony.model.updateView(this,  "zindex" , val);	
		});
		
		this.dolayout = bconfig.doLayout;
		defineGetter(this, "doLayout", function() {
			return this.dolayout;
		});
		defineSetter(this, "doLayout", function(val) {
			this.dolayout = val;			
		});
        
		var opacity = bconfig.opacity;
		defineGetter(this, "opacity", function() {
			return opacity;
		});
		defineSetter(this, "opacity", function(val) {
			opacity = val;
			kony.model.updateView(this,  "opacity" , val);
		});
    
		var transform = bconfig.transform;
		defineGetter(this, "transform", function() {
			return transform;
		});
		defineSetter(this, "transform", function(val) {
			transform = val;
			kony.model.updateView(this,  "transform" , val);
		});   

		var anchorpoint = bconfig.anchorPoint;
		defineGetter(this, "anchorPoint", function() {
			return this.anchorpoint;
		});
		defineSetter(this, "anchorPoint", function(val) {
			anchorpoint = val;
			kony.model.updateView(this,  "anchorpoint" , val);
		});

		this.backgroundcolor=bconfig.backgroundColor;
		defineGetter(this,"backgroundColor",function(){
		    return this.backgroundcolor;
		})
		defineSetter(this,"backgroundColor",function(val){
		    this.backgroundcolor=val;
		    kony.model.updateView(this,"backgroundcolor",val);
		});
		
		this.borderwidth=bconfig.borderWidth;
		defineGetter(this,"borderWidth",function(){
		    return this.borderwidth;
		})
		defineSetter(this,"borderWidth",function(val){
		    this.borderwidth=val;
		    kony.model.updateView(this,"borderwidth",val);
		});
		
		
		this.bordercolor=bconfig.borderColor;
		defineGetter(this,"borderColor",function(val){
		  return this.bordercolor;
		})
		defineSetter(this,"borderColor",function(val){
		    this.bordercolor=val;
		    kony.model.updateView(this,"bordercolor",val);
		});
		
		this.cornerradius=bconfig.cornerRadius;
		defineGetter(this,"cornerRadius",function(){
		 return this.cornerradius;
		})
		defineSetter(this,"cornerRadius",function(val){
		    this.cornerradius=val;
			kony.model.updateView(this,"cornerradius",val);
		});

				        
		
		kony.ui.Widget.prototype.setGetterSetter.call(this);
        
        //Added lowlevel event in base config.
        this.onTouchStart = bconfig.onTouchStart;
        this.onTouchMove = bconfig.onTouchMove;
        this.onTouchEnd = bconfig.onTouchEnd;
        
	},
	
	ContainerWidget: function(bconfig, lconfig, pspconfig) {
		
		kony.ui.ContainerWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);
		
		if(this.name != "kony.ui.FlexContainer")
			this.orientation = bconfig.orientation || constants.BOX_LAYOUT_HORIZONTAL;
		this.percent = (lconfig.percent === undefined) ? true : lconfig.percent;
		if(this.percent === false) this.widgetdirection = lconfig.layoutAlignment;	  //1-LEFT,  2-MIDDLE, 3-RIGHT
		
		//Internal use
		this.ownchildrenref = [];
		this.children = [];	         
	},
	
	GroupWidget: function(bconfig, lconfig, pspconfig) {
		
		kony.ui.GroupWidget.baseConstructor.call(this, bconfig, lconfig, pspconfig);

		this.onselection = bconfig.onSelection;

		this.masterdata = bconfig.masterData;
		this.masterdatamap = bconfig.masterDataMap; 	
		this.selectedkeyvalue = null;
		this.selectedkey = bconfig.selectedKey || null;
		kony.ui.GroupWidget.prototype.setGetterSetter.call(this);
	},

	createAnimation : function(animDef) {
		/**
		* Creating anitmator object with given config.
		*/
		return new $KW.Animator(animDef);
	},
	
	makeAffineTransform : function() {
		/**
		* Creating transform object with given config.
		*/
		return new $KW.Transform();
	}

};

kony.inherits(kony.ui.GroupWidget,kony.ui.Widget);
kony.inherits(kony.ui.ContainerWidget,kony.ui.Widget);

//Widget API's
kony.ui.Widget.prototype.setVisibility = function(isvisible) {
	$KW.Widget.setvisibility (this, isvisible);
};

kony.ui.Widget.prototype.setFocus = function() {
	$KW.Widget.setfocus(this);
};

kony.ui.Widget.prototype.setEnabled = function(isenabled) {
	$KW.Widget.setenabled(this, isenabled);
};

kony.ui.Widget.prototype.addGestureRecognizer = function(gesturetype, setupparams, gesturehandler) {
    return ($KW.Widget.setgesturerecognizer(this, gesturetype, setupparams, gesturehandler));
};

kony.ui.Widget.prototype.setGestureRecognizer = function(gesturetype, setupparams, gesturehandler) {
	return ($KW.Widget.setgesturerecognizer(this, gesturetype, setupparams, gesturehandler));
};

kony.ui.Widget.prototype.removeGestureRecognizer = function(gesturetype) {
	$KW.Widget.removegesturerecognizer(this, gesturetype);
};

//Modified json.stringify to ignore parent reference
kony.ui.Widget.prototype.toString = function() {
	return JSON.stringify(this, $KU.jsonReplacer);
};

kony.ui.Widget.prototype.removeFromParent = function() {
	//TODO: model reference is not getting remove from form
	if(!this.parent)
		return;
	if(this.parent.id == this.pf)
		formWidgetExtendRemove.call(this.parent, this);
	else
		boxWidgetExtendRemove.call(this.parent, this); 
};

kony.ui.Widget.prototype.setWidgetFrame = function(frame, wNode) {
	$KW.Utils.setWidgetFrame(this, frame, wNode);
};

kony.ui.Widget.prototype.animate = function(animInstance, animationConfig, animCallbackConfig) {
	if(animInstance){
		//animationConfig.setAnimationConfig(animationConfig);
		animInstance.animate && animInstance.animate(this, animationConfig,animCallbackConfig);	
	}
};

kony.ui.Widget.prototype.getPreferredSize = function(frame) {
   return $KW.Widget.getPreferredSize(this, frame);
};

kony.ui.Widget.prototype.convertPointToWidget = function(point, toWidget) {
	 return $KW.Widget.convertPointToWidget(this, point,  toWidget);
};

kony.ui.Widget.prototype.convertPointFromWidget = function(point, fromWidget) {
	return $KW.Widget.convertPointFromWidget(this, point,  fromWidget);
};


//Internal Functions
/*
kony.ui.Widget.prototype.canUpdateDOM = function() {

    var id = (this.wType == "Form" || this.wType == "Popup") ? this.id : this.pf;
    var topContainer = window[id];
    if(topContainer){
		var popup = (topContainer.wType == "Popup") && $KU.getElementById(id);
		var cForm = $KG["__currentForm"];
		if($KW[this.wType]["updateView"] && ((cForm && topContainer.wType == "Form" && cForm.id == topContainer.id) || 
						(cForm && topContainer.isheader && $KU.canUpdateDOM(cForm, topContainer)) || 
						(topContainer.wType == "Popup" && popup))){
						return true;
		}
	}
    return false;                       
};
*/

kony.ui.Widget.prototype.setGetterSetter = function() {

	defineGetter(this, "contentAlignment", function() {
		return this.contentalignment;
	});
	defineSetter(this, "contentAlignment", function(val) {
		var oldvalue = this.contentalignment;
		this.contentalignment = val;
		kony.model.updateView(this,  "contentalignment" , val, oldvalue);
	});

	defineGetter(this, "containerWeight", function() {
		return this.containerweight;
	});
	defineSetter(this, "containerWeight", function(val) {
		var oldvalue = this.containerweight;
		this.containerweight = val;
		kony.model.updateView(this,  "containerweight" , val, oldvalue);
	});

	defineGetter(this, "focusSkin", function() {
		return this.focusskin;
	});
	defineSetter(this, "focusSkin", function(val) {
		var oldvalue = this.focusskin;
		this.focusskin =  val;
		kony.model.updateView(this,  "focusskin" , val, oldvalue);
	});
        
        
	defineGetter(this, "isVisible", function() {
		return this.isvisible;
	});
	defineSetter(this, "isVisible", function(val) {
		this.isvisible = val;
		kony.model.updateView(this,  "isvisible" , val);
	});

	defineGetter(this, "blockedUISkin", function() {
		return this.blockeduiskin;
	});	
	defineSetter(this, "blockedUISkin", function(val) {
		this.blockeduiskin =  val;
	});

	defineGetter(this, "onClick", function() {	
			return this.onclick;
		
	});

	defineSetter(this, "onClick", function(val) {
		this.onclick = val;
	});	

    defineGetter(this, "onTouchStart", function() {	
        return this.ontouchstart;
    });

    defineSetter(this, "onTouchStart", function(val) {
        this.ontouchstart = val;
        kony.model.updateView(this,  "touchstart" , val);
    });
    
    defineGetter(this, "onTouchMove", function() {	
        return this.ontouchmove;
    });

    defineSetter(this, "onTouchMove", function(val) {
        this.ontouchmove = val;
        kony.model.updateView(this,  "touchmove" , val);
    });

    defineGetter(this, "onTouchEnd", function() {	
        return this.ontouchend;
    });

    defineSetter(this, "onTouchEnd", function(val) {
        this.ontouchend = val;
        kony.model.updateView(this,  "touchend" , val);
    });



};

//ContainerWidget Methods
kony.ui.ContainerWidget.prototype.add = function(widgetarray) {	
	containerWidgetExtendAdd.call(this, widgetarray);
};
	
kony.ui.ContainerWidget.prototype.addAt = function(widgetref, index) {
	containerWidgetExtendAddAt.call(this, widgetref, index);
};
	
kony.ui.ContainerWidget.prototype.remove = function(widgetref) {
	containerWidgetExtendRemove.call(this, widgetref);
};

kony.ui.ContainerWidget.prototype.removeAt = function(index) {
	return containerWidgetExtendRemoveAt.call(this, index);
};

kony.ui.ContainerWidget.prototype.removeAll = function(index) {
	return containerWidgetExtendRemoveAll.call(this, index);
};

kony.ui.ContainerWidget.prototype.widgets = function() {
	return this.ownchildrenref;
};
	
//Internal Methods
kony.ui.ContainerWidget.prototype.setparent = function(widgetarray) {
	containerWidgetExtendSetParent.call(this, widgetarray);
};

kony.ui.ContainerWidget.prototype.createhierarchy = function (widgetarray) {
	containerWidgetExtendCreateHierarchy.call(this, widgetarray);
};

kony.ui.ContainerWidget.prototype.removeReferences = function(widgetref) {
	containerWidgetExtendRemoveReferences.call(this, widgetref);
};


kony.ui.GroupWidget.prototype.setGetterSetter = function() {


	defineGetter(this, "onSelection", function() {
		return this.onselection;
	});
	defineSetter(this, "onSelection", function(val) {
		this.onselection = val;
	});

	defineGetter(this, "masterData", function() {
		return this.masterdata;
	});
	defineSetter(this, "masterData", function(val) {
		this.masterdata = val;
		$KW[this.wType]["updateView"](this,  "masterdata" , val);
	});
	
	defineGetter(this, "masterDataMap", function() {
		return this.masterdatamap;
	});
	defineSetter(this, "masterDataMap", function(val) {
		this.masterdatamap = val;
		$KW[this.wType]["updateView"](this,  "masterdatamap" , val);
	});

	defineGetter(this, "selectedKey", function() {
		return this.selectedkey;
	});
	defineSetter(this, "selectedKey", function(val) {
		this.selectedkey = val;
		$KW[this.wType]["updateView"](this,  "selectedkey" , val);
	});

	//Not a writable property
	defineGetter(this, "selectedKeyValue", function() {
		return this.selectedkeyvalue;
	});
	defineSetter(this, "selectedKeyValue", function() { });

}

_konyConstNS = IndexJL ? konyLua : kony.ui;
