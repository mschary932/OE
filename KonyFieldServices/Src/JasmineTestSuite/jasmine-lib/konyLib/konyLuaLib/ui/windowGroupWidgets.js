//CheckBoxGroup Constructor
konyLua.CheckBoxGroup = function(bconfig, lconfig, pspconfig) {         
      
      konyLua.CheckBoxGroup.baseConstructor.call(this, bconfig, lconfig, pspconfig);

      this.selectedkeys = bconfig.selectedkeys || null;
      this.selectedkeyvalues = bconfig.selectedkeyvalues || null;
      this.itemorientation = lconfig.itemorientation || constants.CHECKBOX_ITEM_ORIENTATION_VERTICAL; 

      //Internal Usage
      this.wType = "CheckBoxGroup";
      this.name = "konyLua.CheckBoxGroup";
};
      
kony.inherits(konyLua.CheckBoxGroup,konyLua.GroupWidget);

//ComboBox Constructor
konyLua.ComboBox = function(bconfig, lconfig, pspconfig) {        
      
	konyLua.ComboBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	this.wType = "ComboBox";
	this.name = "konyLua.ComboBox";
 };
      
kony.inherits(konyLua.ComboBox,konyLua.GroupWidget);

//ListBox Constructor
konyLua.ListBox = function(bconfig, lconfig, pspconfig) {   
      
      konyLua.ListBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

      this.selectedkeyvalues = null;
      
      //Internal Usage
      this.wType = "ListBox";
      this.name = "konyLua.ListBox";   
};
      
kony.inherits(konyLua.ListBox,konyLua.GroupWidget);

//RadioButtonGroup Constructor
konyLua.RadioButtonGroup = function(bconfig, lconfig, pspconfig) {            
      
      konyLua.RadioButtonGroup.baseConstructor.call(this, bconfig, lconfig, pspconfig);

      this.itemorientation = lconfig.itemorientation || constants.RADIOGROUP_ITEM_ORIENTATION_VERTICAL;    

      //Internal Usage
      this.wType = "RadioButtonGroup";
      this.name =  "konyLua.RadioButtonGroup";
};
      
kony.inherits(konyLua.RadioButtonGroup, konyLua.GroupWidget);

//PickerView Constructor 
konyLua.PickerView = function(bconfig, lconfig, pspconfig) {  
  
  konyLua.PickerView.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.masterdata = bconfig.masterdata;
  this.onselect = bconfig.onselect;
  this.selectedkeys = bconfig.selectedkeys;

  //Internal Usage  
  this.wType = "PickerView";
  this.name = "konyLua.PickerView";
};

kony.inherits(konyLua.PickerView, konyLua.CheckBoxGroup);