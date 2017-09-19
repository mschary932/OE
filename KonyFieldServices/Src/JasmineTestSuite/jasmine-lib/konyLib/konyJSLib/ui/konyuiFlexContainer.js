//FlexContainer Constructor
kony.ui.FlexContainer = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("FlexContainer"));
	
	this.name = "kony.ui.FlexContainer";
	kony.ui.FlexContainer.baseConstructor.call(this, bconfig, lconfig, pspconfig); 
	this.wType = "FlexContainer";
	this.allboxes = [];				// As Box's are used as rowTemplates	
	
	this.layouttype = bconfig.layoutType || kony.flex.FREE_FORM;
	defineGetter(this, "layoutType", function() {
		return this.layouttype;
	});	
	
	this.clipbounds = (typeof bconfig.clipBounds == "undefined") ? true : bconfig.clipBounds;
	defineGetter(this, "clipBounds", function() {
		return this.clipbounds;
	});	
	defineSetter(this, "clipBounds", function(val) {
		this.clipbounds = val;	
		$KW[this.wType]["updateView"](this, "clipbounds", val);
	});
	
	this.dolayout = bconfig.doLayout;	
	defineGetter(this, "doLayout", function() {
		return this.dolayout;
	});	
	defineSetter(this, "doLayout", function(val) {
		this.dolayout = val;	
	});	
};

kony.inherits(kony.ui.FlexContainer, kony.ui.ContainerWidget);

//FlexContainer Methods	
kony.ui.FlexContainer.prototype.add = function() {	
	var widgetarray = [].slice.call(arguments); 
    boxWidgetExtendAdd.call(this, widgetarray);
};

kony.ui.FlexContainer.prototype.addAt = function(widgetref, index) {
	boxWidgetExtendAddAt.call(this, widgetref, index)
};

kony.ui.FlexContainer.prototype.addAll = function(widgetref, index) {
	boxWidgetExtendAddAt.call(this, widgetref, index)
};

kony.ui.FlexContainer.prototype.remove = function(widgetref) {
	boxWidgetExtendRemove.call(this, widgetref);
};

kony.ui.FlexContainer.prototype.removeAt = function(index) {
	return boxWidgetExtendRemoveAt.call(this, index);
};

kony.ui.FlexContainer.prototype.removeAll = function() {
	boxWidgetExtendRemoveAll.call(this);
};

kony.ui.FlexContainer.prototype.widgets = function() {	
    return kony.ui.ContainerWidget.prototype.widgets.call(this);	
};

kony.ui.FlexContainer.prototype.forceLayout = function() {	
   	$KW.FlexContainer.forceLayout(this);
};

kony.ui.FlexContainer.prototype.setDefaultUnit = function(unit) {	
   	this.defaultunit = unit; 
};

kony.ui.FlexScrollContainer = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("FlexScrollContainer"));

    this.name = "kony.ui.FlexScrollContainer";
    kony.ui.FlexScrollContainer.baseConstructor.call(this, bconfig, lconfig, pspconfig); 
    this.wType = "FlexScrollContainer";
    this.allboxes = [];				// As Box's are used as rowTemplates	

    this.enablescrolling = (typeof bconfig.enableScrolling == "undefined") ? true : bconfig.enableScrolling;
    defineGetter(this, "enableScrolling", function() {
        return this.enablescrolling;
    });	
    defineSetter(this, "enableScrolling", function(val) {
        this.enablescrolling = val;	
        $KW[this.wType]["updateView"](this, "enableScrolling", val);
    });

    this.scrolldirection = (typeof bconfig.scrollDirection == "undefined") ? kony.flex.SCROLL_HORIZONTAL : bconfig.scrollDirection;
    defineGetter(this, "scrollDirection", function() {
        return this.scrolldirection;
    });	
    defineSetter(this, "scrollDirection", function(val) {
        this.scrolldirection = val;	
        $KW[this.wType]["updateView"](this, "scrollDirection", val);
    });
    this.contentoffset = bconfig.contentOffset;
    defineGetter(this, "contentOffset", function() {
        return this.contentoffset;
    });	
    defineSetter(this, "contentOffset", function(val) {
        this.contentoffset = val;	
        $KW[this.wType]["updateView"](this, "contentOffset", val);
    });
    
    this.contentsize = bconfig.contentSize;
    defineGetter(this, "contentSize", function() {
        return this.contentsize;
    });	
    defineSetter(this, "contentSize", function(val) {
        this.contentsize = val;	
    });
        
    
    defineGetter(this, "contentOffsetMeasured", function() {
        return $KW.FlexScrollContainer.getContentOffsetMeasured(this);
    });
    defineSetter(this, "contentOffsetMeasured", function(val) {});

    this.contentsize = bconfig.contentSize;
    defineGetter(this, "contentSizeMeasured", function() {
        return $KW.FlexScrollContainer.getContentSizeMeasured(this);
    });
    defineSetter(this, "contentSizeMeasured", function(val) {   });
    
    
        
    this.bounce = (typeof bconfig.bounces == "undefined") ? true : bconfig.bounces;
    defineGetter(this, "bounces", function() {
        return this.bounce;
    });
    defineSetter(this, "bounces", function(val) {
        this.bounce = val;
        $KW[this.wType]["updateView"](this, "bounces", val);
    });
   
    this.allowhorizontalbounce = (typeof bconfig.allowHorizontalBounce == "undefined") ? true : bconfig.allowHorizontalBounce;
    defineGetter(this, "allowHorizontalBounce", function() {
        return this.allowhorizontalbounce;
    });
    defineSetter(this, "allowHorizontalBounce", function(val) {
        this.allowhorizontalbounce = val;	
        $KW[this.wType]["updateView"](this, "allowHorizontalBounce", val);
    });
    
    this.allowverticalbounce = (typeof bconfig.allowVerticalBounce == "undefined") ? true : bconfig.allowVerticalBounce;
    defineGetter(this, "allowVerticalBounce", function() {
        return this.allowverticalbounce;
    });
    defineSetter(this, "allowVerticalBounce", function(val) {
        this.allowverticalbounce = val;
        $KW[this.wType]["updateView"](this, "allowVerticalBounce", val);
    });

    this.horizontalscrollindicator = (typeof bconfig.horizontalScrollIndicator == "undefined") ? true : bconfig.horizontalScrollIndicator;
    defineGetter(this, "horizontalScrollIndicator", function() {
        return this.horizontalscrollindicator;
    });
    defineSetter(this, "horizontalScrollIndicator", function(val) {
        this.horizontalscrollindicator = val;
        $KW[this.wType]["updateView"](this, "horizontalScrollIndicator", val);
    });
    
    this.verticalscrollindicator = (typeof bconfig.verticalScrollIndicator == "undefined") ? true : bconfig.verticalScrollIndicator;
    defineGetter(this, "verticalScrollIndicator", function() {
        return this.verticalscrollindicator;
    });
    defineSetter(this, "verticalScrollIndicator", function(val) {
        this.verticalscrollindicator = val;
        $KW[this.wType]["updateView"](this, "verticalScrollIndicator", val);
    });
    
    
    this.pagineenabled = (typeof bconfig.pagineEnabled == "undefined") ? false : bconfig.pagineEnabled;
    defineGetter(this, "pagineEnabled", function() {
        return this.pagineenabled;
    });
    defineSetter(this, "pagineEnabled", function(val) {
        this.pagineenabled = val;
    });
    
    this.dragg = false;
    defineGetter(this, "dragging", function() {
        var scrollerId = this.pf + "_" + this.id + "_scroller";
        if($KG[scrollerId]){
            return $KG[scrollerId].dragging;
        }
        return false;
    });
    defineSetter(this, "dragging", function(val) {
        //this.pagineenabled = val;
    });
        
    defineGetter(this, "tracking", function() {
        var scrollerId = this.pf + "_" + this.id + "_scroller";
        if($KG[scrollerId]){
            return $KG[scrollerId].tracking;
        }
        return false;
    });
    defineSetter(this, "tracking", function(val) {
        //this.pagineenabled = val;
    });
    
    
    defineGetter(this, "decelerating", function() {
        var scrollerId = this.pf + "_" + this.id + "_scroller";
        if($KG[scrollerId]){
            return !this.tracking &&  $KG[scrollerId].animating;
        }
        return false;
    });
    defineSetter(this, "decelerating", function(val) {
        //this.pagineenabled = val;
    });

    
    
    this.onscrollstart = bconfig.onScrollStart;
    defineGetter(this, "onScrollStart", function() {
        return this.onscrollstart;
    });	
    defineSetter(this, "onScrollStart", function(val) {
        this.onscrollstart = val;
        $KW[this.wType]["updateView"](this, "onScrollStart", val);
    });
    
    this.onscrolltouchreleased = bconfig.onScrollTouchReleased;
    defineGetter(this, "onScrollTouchReleased", function() {
        return this.onscrolltouchreleased;
    });	
    defineSetter(this, "onScrollTouchReleased", function(val) {
        this.onscrolltouchreleased = val;
        $KW[this.wType]["updateView"](this, "onScrollTouchReleased", val);
    });
    
    this.onscrolling = bconfig.onScrolling;
    defineGetter(this, "onScrolling", function() {
        return this.onscrolling;
    });	
    defineSetter(this, "onScrolling", function(val) {
        this.onscrolling = val;
        $KW[this.wType]["updateView"](this, "onScrolling", val);
    });
    
    this.ondecelerationstarted = bconfig.onDecelerationStarted;
    defineGetter(this, "onDecelerationStarted", function() {
        return this.ondecelerationstarted;
    });	
    defineSetter(this, "onDecelerationStarted", function(val) {
        this.ondecelerationstarted = val;
        $KW[this.wType]["updateView"](this, "onDecelerationStarted", val);
    });

    this.onscrollend = bconfig.onScrollEnd;
    defineGetter(this, "onScrollEnd", function() {
        return this.onscrollend;
    });	
    defineSetter(this, "onScrollEnd", function(val) {
        this.onscrollend = val;
        $KW[this.wType]["updateView"](this, "onScrollEnd", val);
    });
};

kony.inherits(kony.ui.FlexScrollContainer, kony.ui.FlexContainer);

kony.ui.FlexScrollContainer.prototype.forceLayout = function() {	
    $KW.FlexScrollContainer.forceLayout(this);
};


kony.ui.FlexScrollContainer.prototype.setContentOffset = function(contentOffSet, animate) {	
    $KW.FlexScrollContainer.setContentOffSet(this,contentOffSet, animate); 
};

kony.ui.FlexScrollContainer.prototype.scrollToWidget = function(widget, animate) {	
    $KW.FlexScrollContainer.scrollToWidget(this,widget, animate); 
};

kony.ui.FlexScrollContainer.prototype.scrollToEnd = function() {	
    $KW.FlexScrollContainer.scrollToEnd(this); 
};

