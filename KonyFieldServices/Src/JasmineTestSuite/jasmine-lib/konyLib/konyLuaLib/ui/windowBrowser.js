//Browser Constructor
konyLua.Browser = function(bconfig, lconfig, pspconfig) {
            
      konyLua.Browser.baseConstructor.call(this, bconfig, lconfig, pspconfig);

      this.onsuccess = bconfig.onsuccess;
      this.onfailure = bconfig.onfailure;
      this.screenlevelwidget = bconfig.screenlevelwidget;
      this.enablezoom = bconfig.enablezoom;
      this.detecttelnumber = bconfig.detecttelnumber;
      this.requesturlconfig = bconfig.requesturlconfig;      
      this.htmlstring =  bconfig.htmlstring;     
      this.screenlevelwidget = bconfig.screenlevelwidget;    
      this.enablezoom = bconfig.enablezoom; 
      
      if(bconfig.requesturlconfig){
      	this.url = bconfig.requesturlconfig.url;
        this.method = bconfig.requesturlconfig.requestmethod;
        this.data = bconfig.requesturlconfig.requestdata;
      }
      //Internal Usage
      this.wType = "Browser";
      this.name =  "konyLua.Browser";
         
};

kony.inherits(konyLua.Browser,konyLua.Widget);