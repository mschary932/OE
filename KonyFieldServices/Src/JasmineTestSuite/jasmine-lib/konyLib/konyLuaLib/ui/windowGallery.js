//ImageGallery2 Constructor
konyLua.ImageGallery2 = function(bconfig, lconfig, pspconfig) { 
    
  konyLua.ImageGallery2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.imagewhiledownloading = bconfig.imagewhiledownloading;
  this.imagewhenfailed = bconfig.imagewhenfailed;
  this.spacebetweenimages = bconfig.spacebetweenimages;
  this.selectedindex = bconfig.selectedindex || null;
  this.selecteditem =  null;  
  this.onselection = bconfig.onselection;
  this.referencewidth  = lconfig.referencewidth;
  this.referenceheight =  lconfig.referenceheight;
  this.imagescalemode = lconfig.imagescalemode;

  this.data = bconfig.data;
  if (this.data) {
    this.masterdata = this.data[0];
    this.key = this.data[1];
  }

  //Internal Usage  
  this.wType = "IGallery";
  this.name = "konyLua.ImageGallery2";
  this.canUpdateUI = true; //This flag is to prevent updating selectedIndex ui when changing it in event handler
};

kony.inherits(konyLua.ImageGallery2, konyLua.Widget);

// Earlier Version of ImageGallery (All Deprecated properties are to be supported)
konyLua.ImageGallery = function(bconfig, lconfig, pspconfig) {

  konyLua.ImageGallery.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  //For Backward compatibility
  this.itemsperrow = pspconfig.itemsperrow;
  this.heightwidth = pspconfig.heightwidth;
  this.focusedindex = bconfig.focusedindex || null;
  this.focuseditem = null; 
  this.name ="konyLua.ImageGallery";
}

kony.inherits(konyLua.ImageGallery, konyLua.ImageGallery2);