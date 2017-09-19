//ImageStrip Constructor
konyLua.HorizontalImageStrip2 = function(bconfig, lconfig, pspconfig) { 
  
  konyLua.HorizontalImageStrip2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
  
  this.imagewhiledownloading = bconfig.imagewhiledownloading;
  this.imagewhenfailed = bconfig.imagewhenfailed;
  this.spacebetweenimages = bconfig.spacebetweenimages;  
  this.onselection = bconfig.onselection;
  this.viewtype = bconfig.viewtype;             //TODO
  this.selecteditem = bconfig.selecteditem || null;
  this.selectedindex= bconfig.selectedindex;  
  this.viewconfig = bconfig.viewconfig;
  this.scrollbounce = this.viewconfig && this.viewconfig.stripviewconfig && this.viewconfig.stripviewconfig.enablescrollbounce;
  this.showarrows = bconfig.showarrows || false;    
  this.arrowconfig = bconfig.arrowconfig || {};
  this.leftarrowimage = this.arrowconfig.leftarrowimage;
  this.rightarrowimage = this.arrowconfig.rightarrowimage;
  this.showscrollbars = bconfig.showscrollbars || false;   
  this.referencewidth = lconfig.referencewidth;
  this.referenceheight = lconfig.referenceheight;
  this.imagescalemode = lconfig.imagescalemode;
  this.widgetalign = lconfig.widgetalign; // Widget alignment property set through IDE.

  this.data = bconfig.data;
  if(this.data && this.data.length == 3){ 
    this.masterdata = this.data[1];
    this.key = this.data[2];
  }
  
  //Internal Usage  
  this.wType = "HStrip";
  this.name ="konyLua.HorizontalImageStrip2";
  this.canUpdateUI = true; //This flag is to prevent updating selectedIndex ui when changing it in event handler 
};

kony.inherits(konyLua.HorizontalImageStrip2, konyLua.Widget);

konyLua.HorizontalImageStrip = function(bconfig, lconfig, pspconfig) {

  konyLua.HorizontalImageStrip.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  //For Backward compatibility
  this.viewtype = pspconfig.view;
  this.showarrows = pspconfig.showarrows;
  this.scrollbounce = pspconfig.scrollbounce;
  this.heightwidth = pspconfig.heightWidth;
  this.imagewhenfailed = pspconfig.imagewhenfailed;
  this.imagewhiledownloading = pspconfig.imagewhiledownloading;
  this.spacebetweenimages = pspconfig.spacebetweenimages;

  this.name ="konyLua.HorizontalImageStrip";
}

kony.inherits(konyLua.HorizontalImageStrip, konyLua.HorizontalImageStrip2);