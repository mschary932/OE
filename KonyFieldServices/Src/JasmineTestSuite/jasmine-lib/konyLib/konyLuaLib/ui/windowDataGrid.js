//DataGrid Constructor 
konyLua.DataGrid = function(bconfig, lconfig, pspconfig) {  
  
  konyLua.DataGrid.baseConstructor.call(this, bconfig, lconfig, pspconfig);

  this.headerskin = bconfig.headerskin
  this.rownormalskin = bconfig.rownormalskin;
  this.rowfocusskin = bconfig.rowfocusskin;
  this.rowalternateskin = bconfig.rowalternateskin;
  this.showcolumnheaders = bconfig.showcolumnheaders;
  this.columnheadersconfig = bconfig.columnheadersconfig;
  this.onrowselected = bconfig.onrowselected;
  this.ismultiselect = bconfig.ismultiselect;
  this.data = bconfig.data;
  this.gridlinecolor = pspconfig.gridlinecolor;

  
  //Internal Usage  
  this.wType = "DataGrid";
  this.name = "konyLua.DataGrid";
};

kony.inherits(konyLua.DataGrid, konyLua.Widget);