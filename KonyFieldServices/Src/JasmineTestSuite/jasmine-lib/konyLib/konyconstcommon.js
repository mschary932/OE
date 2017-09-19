function containerWidgetExtendAdd(widgetarray) {
	this.setparent(widgetarray);
	this.ownchildrenref = this.ownchildrenref.concat(widgetarray);
	this.createhierarchy(widgetarray);	
};


function containerWidgetExtendAddAt(widgetref, index) {
	index = index < IndexJL ? IndexJL : (index-IndexJL > this.ownchildrenref.length ? this.ownchildrenref.length+1 : index-IndexJL);
    this.children.splice(index, 0 , widgetref.id);
    this.ownchildrenref.splice(index, 0 ,widgetref);
    widgetref.parent = this;
    this.createhierarchy([widgetref]);
};

function containerWidgetExtendRemove(widgetref) {
	_konyConstNS.ContainerWidget.prototype.removeReferences.call(this, widgetref);
	/*if (widgetref instanceof _konyConstNS.ContainerWidget) {
		var childrenLength = widgetref.ownchildrenref.length;
		for (var i=childrenLength-1;i>=0;--i) {
			_konyConstNS.ContainerWidget.prototype.remove.call(widgetref,widgetref.ownchildrenref[i]);
		}
	}*/
	boxWidgetExtendRemoveUpdate.call(this, widgetref,true);
};

function containerWidgetExtendRemoveAt(index) {
	var remwidgetref = null;
	if (index >= IndexJL && index-IndexJL <= this.ownchildrenref.length) {
		var remwidgetref = this.ownchildrenref[index-IndexJL];
		remwidgetref && _konyConstNS.ContainerWidget.prototype.remove.call(this, remwidgetref);
	}
	boxWidgetExtendRemoveUpdate.call(this, remwidgetref,true);
	return remwidgetref;
};

function containerWidgetExtendSetParent(widgetarray) {
	for (var i = 0; i < widgetarray.length; i++) {
		this.children.push(widgetarray[i].id);
		widgetarray[i].parent = this;
	}
};

function  containerWidgetExtendCreateHierarchy(widgetarray) {
	for (var i = 0; i < widgetarray.length; i++) {
		var widgetref = widgetarray[i];	
        //Added if condition as same widget should not be added to same widget, incase of templates.
        if(widgetref.id !== this.id)
		  this[widgetref.id] = widgetref;
		/*if(widgetref.id == this.id && this.isheader)
			continue;
		if(this.wType == "TabPane" || this.isheader)*/
		if(this.wType == "TabPane")
			widgetref.pf = this.pf;
		else
			widgetref.pf = this.id;
	}
};

function containerWidgetExtendRemoveReferences(widgetref) {

	delete this[widgetref.id];
	if((this.wType == "Form"|| this.wType == "Popup") && this['screenLevelWidgets'] && this['screenLevelWidgets'][widgetref.id])
		delete this['screenLevelWidgets'][widgetref.id];
	
	if(this.children.remove)
		this.children.remove(widgetref.id);
	else{
		var chld = this.children;
		if(chld.indexOf(widgetref.id) >= 0){
			chld && chld.splice(chld.indexOf(widgetref.id), 1);
		}		
	}
	var chldref = this.ownchildrenref;
	chldref && chldref.splice(chldref.indexOf(widgetref),1);
	removeAllReferences(widgetref);	
};

//Removing refrence from toplevel parent, when widget is removed from container.
function removeAllReferences(widgetRef){
	var topLevelModel = window[widgetRef.pf];
	if(topLevelModel){
		if(widgetRef instanceof _konyConstNS.ContainerWidget){
			var widgets = widgetRef.widgets();
			for(var i=0; i<widgets.length; i++){
				delete topLevelModel[widgets[i].id];	
				if(widgets[i] instanceof _konyConstNS.ContainerWidget)
					removeAllReferences(widgets[i]);
			}	
		}
		else
			delete topLevelModel[widgetRef.id];
	}
}

function containerWidgetExtendRemoveAll() {
	containerWidgetExtendRemoveAllReferences.call(this);
	this.ownchildrenref = [];
	this.children = [];	     
};

function containerWidgetExtendRemoveAllReferences() {
	var widgets = this.widgets();
	for(var i=0; i<widgets.length; i++){
		var widget = widgets[i];
		delete this[widget.id];
		var topLevelWidget = window[this.pf]; //Form or Popup
		topLevelWidget && (delete topLevelWidget[widget.id]);
	}
}

function boxWidgetExtendAdd(widgetarray) {

	_konyConstNS.ContainerWidget.prototype.add.call(this, widgetarray);
	$KG.allforms[this.pf] && $KG.allforms[this.pf].createFormLevelHierarchy(widgetarray);

	if(this.wType == "ScrollBox") 
		_konyConstNS.Box.prototype.updateBoxWeight.call(this, widgetarray);

	$KW.HBox.addChild(this,widgetarray); 
};

function boxWidgetExtendAddAt(widgetref, index) {
	_konyConstNS.ContainerWidget.prototype.addAt.call(this, widgetref, index);
	$KG.allforms[this.pf] && $KG.allforms[this.pf].createFormLevelHierarchy([widgetref]);
	
	if(this.wType == "ScrollBox") 
		_konyConstNS.Box.prototype.updateBoxWeight.call(this, widgetref);
    
    $KW.HBox.addChildat(this, [widgetref], index);
};

function boxWidgetExtendRemove(widgetref) {
	if(widgetref){	
		$KW.HBox.DOMremove(this, widgetref); 
		_konyConstNS.ContainerWidget.prototype.remove.call(this, widgetref);
	}
};

function boxWidgetExtendRemoveAt(index) {
	$KW.HBox.DOMremove(this, this.ownchildrenref[index-IndexJL]);
    return _konyConstNS.ContainerWidget.prototype.removeAt.call(this, index);
};

function boxWidgetExtendRemoveAll(){
	if(this.widgets().length > 0){
		$KW.HBox.DOMremoveAll(this);
		_konyConstNS.ContainerWidget.prototype.removeAll.call(this);
	}
}

function boxWidgetExtendUpdateBoxWeight(widgetarray) {
	if(widgetarray.length){
		for (var i = 0; i < widgetarray.length; ++i) {
			this.totalWt += widgetarray[i].containerweight;
		}
	}
	else if(widgetarray.containerweight)
	{
		this.totalWt += widgetarray.containerweight;
	}
	$KW[this.wType]["updateView"](this,  "totalWt" , this.totalWt);
};


function boxWidgetExtendRemoveUpdate(widgetarray, remove)
{
	if(this.wType == "ScrollBox"){
		this.totalWt = 0;
		for (var i = 0; i < this.children.length; ++i) { 
			this.totalWt += this[this.children[i]].containerweight;
		}
		$KW[this.wType]["updateView"](this,  "totalWt" , this.totalWt);
	}
	else if(this.wType == "FlexContainer" || this.wType == "FlexScrollContainer")
		$KW[this.wType].adjustFlexContainer(this);
}

function formWidgetExtendAdd(widgetarray) {
	_konyConstNS.ContainerWidget.prototype.add.call(this, widgetarray);
	this.createFormLevelHierarchy(widgetarray);

	try {
		$KW.Form.addChild(this,widgetarray); 
	} 
	catch (ex) {
		// console.warn(ex);
	}
};

function formWidgetExtendAddAt(widgetref, index) {
    _konyConstNS.ContainerWidget.prototype.addAt.call(this, widgetref, index);
    this.createFormLevelHierarchy([widgetref]);
    
    //index = index < IndexJL ? IndexJL : ((index > this.children.length - IndexJL) ? this.children.length-IndexJL : index-IndexJL);
    index = index < IndexJL ? 0 : ((index > this.children.length) ? this.children.length : index-IndexJL);
    $KW.Form.addChildAt(this,widgetref, index);  
};

function formWidgetExtendRemove(widgetref) {
	if(widgetref) {
		$KW.Form.DOMremove(this, widgetref);
	    _konyConstNS.ContainerWidget.prototype.remove.call(this, widgetref);
		//show other SLW in the form model, when a SLW is removed else show other widgets(non-SLW) 
		updateFormAfterRemove(this, widgetref);
	}
};

function formWidgetExtendRemoveAt(index) {
    
	//if (index >= IndexJL && index-IndexJL <= this.ownchildrenref.length) {
    $KW.Form.DOMremoveAt(this, index-IndexJL)
    var widgetRef =  _konyConstNS.ContainerWidget.prototype.removeAt.call(this, index);
	//show other SLW in the form model, when a SLW is removed else show other widgets(non-SLW) 
	updateFormAfterRemove(this, widgetRef);
	return widgetRef;
};

function updateFormAfterRemove(formModel, widgetRef){
	if(widgetRef && widgetRef.screenLevelWidget){
		$KW.Form.addChild(formModel, formModel.ownchildrenref);
	}
	else
		(formModel.layouttype != kony.flex.VBOX_LAYOUT) && $KW.FlexContainer.adjustFlexContainer(formModel);
};

function formWidgetExtendRemoveAll(formModel){
	if(this.widgets().length > 0){
		$KW.Form.DOMremoveAll(this);
		_konyConstNS.ContainerWidget.prototype.removeAll.call(this);
	}
}

function formWidgetExtendCreateFormLevelHierarchy(widgetarray) {
	
	for(var i=0; i < widgetarray.length; i++) {
		var widgetref = widgetarray[i];   
		this[widgetref.id] = widgetref;
		if((this.wType == 'Popup' || this.wType == 'Form') && widgetref.screenLevelWidget)
		{
			this['screenLevelWidgets'] = this['screenLevelWidgets'] || {};
			this['screenLevelWidgets'][widgetref.id] = widgetref;
		}
		/*if(widgetref.id == this.id && this.isheader)
			continue;			
		if(this.wType == "TabPane" || this.isheader)*/
		if(this.wType == "TabPane")
			widgetref.pf = this.pf;
		else 
			widgetref.pf = this.id;
	}

	_konyConstNS.Form2.getallboxes.call(this, widgetarray);

	for(var i=0; i < this.allboxes.length; i++) {
		var childwidgets = this.allboxes[i].ownchildrenref;
		this.createhierarchy.call(this, childwidgets);
	}
	

	this.allboxes = [];
};

function formWidgetExtendCommonHeaderFooterSetup(containertype) {

  var __container = {};
  __container.children = [];
  
  for (var i = IndexJL; i < this[containertype].length; i++) {
	if(app && !app[containertype][this[containertype][i].id])
		app[containertype][this[containertype][i].id] = this[containertype][i];
	  
	//_konyConstNS.Form2.addHeaderorFooter.call(this, this[containertype][i]);
	var box = this[containertype][i];	
	if (box.wType == 'VBox' && this.wType == 'Form')
		throw new KonyError(1102,'WidgetError','Widget cannot be created due to invalid input data');	

	_konyConstNS.Form2.prototype.createFormLevelHierarchy.call(this, [box]);	
	_konyConstNS.ContainerWidget.prototype.createhierarchy.call(box, [box]);
	app[containertype][this[containertype][i].id].isheader = true;
	_konyConstNS.Form2.prototype.createFormLevelHierarchy.call(app[containertype][this[containertype][i].id], [].slice.call([this[containertype][i]]));
	
	
	__container.children[i] = this[containertype][i].id;
	__container[this[containertype][i].id] = this[containertype][i];
  }
  
  __container.pf = this.id;
  __container.id = this[containertype.substr(0,6)] = [this.id,containertype.substr(0,6)].join('_');
  $KG[__container.id] = __container; 	
};

function formWidgetExtendGetAllBoxes(widgetarray){
	
	for(var i=0; i < widgetarray.length; i++) {
		var widget = widgetarray[i];
		if(widget.ownchildrenref) {
			this.allboxes.push(widget)
			_konyConstNS.Form2.getallboxes.call(this, widget.ownchildrenref);	
		}
	}	
};

function formWidgetExtendaddHeaderorFooter() {
 
	var widgetarray = [].slice.call(arguments[0]);
	/*widgetarray.forEach(function(widget) {
		if (widget.wType == 'VBox' && this.wType == 'Form')
	  		throw new KonyError(1102,'WidgetError','Widget cannot be created due to invalid input data');
	}, this);
	*/
	
	for(var i=0; i<widgetarray.length; i++) {
		if (widgetarray[i].wType == 'VBox' && this.wType == 'Form')
	  		throw new KonyError(1102,'WidgetError','Widget cannot be created due to invalid input data');
	}

	_konyConstNS.ContainerWidget.prototype.createhierarchy.call(this, widgetarray);
	_konyConstNS.Form2.prototype.createFormLevelHierarchy.call(this, widgetarray);
};
