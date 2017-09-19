//Image Constructor
konyLua.Image2 = function(bconfig, lconfig, pspconfig) {
            
      konyLua.Image2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
      
      this.ondownloadcomplete = bconfig.ondownloadcomplete;
      this.imagewhiledownloading = bconfig.imagewhiledownloading;
      this.imagewhenfailed = bconfig.imagewhenfailed;
      this.src = bconfig.src;  
      this.srcType = 1;     
      this.referencewidth = lconfig.referencewidth;      
      this.referenceheight = lconfig.referenceheight; 
      this.imagescalemode = lconfig.imagescalemode;  
      this.height = lconfig.height;

      //Internal Usage
      this.wType = "Image";
      this.name = "konyLua.Image2"; 
}

kony.inherits(konyLua.Image2,konyLua.Widget);

konyLua.Image = function(bconfig, lconfig, pspconfig) {

      konyLua.Image.baseConstructor.call(this, bconfig, lconfig, pspconfig);
      
      //For Backward compatibility
      this.scalemode = pspconfig.scalemode;
      this.heightwidth = pspconfig.heightwidth;
      this.imagewhiledownloading = pspconfig.imagewhiledownloading;
      this.imagewhenfailed = pspconfig.imagewhenfailed;
      
      this.name = "konyLua.Image";
}

kony.inherits(konyLua.Image,konyLua.Image2);