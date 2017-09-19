//TextBox Constructor
konyLua.TextBox2 = function(bconfig, lconfig, pspconfig) {
            
    konyLua.TextBox2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
      
    this.securetextentry = bconfig.securetextentry;
    this.ondone = bconfig.ondone;
    this.ontextchange = bconfig.ontextchange;
    this.autocorrect = pspconfig.autocorrect || false;
    this.autocomplete = pspconfig.autocomplete || false;
	this.pattern = pspconfig.pattern;
	this.name = pspconfig.name;
	
    this.text = bconfig.text || "";
    this.maxtextlength = bconfig.maxtextlength;
    this.textinputmode = this.mode = bconfig.textinputmode || constants.TEXTBOX_INPUT_MODE_ANY; //TODO: replace mode with textinputmode
    this.keyboardstyle = this.keyboardtype = bconfig.keyboardstyle || constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT;  //TODO: replace
    this.autocapitalize = bconfig.autocapitalize || constants.TEXTBOX_AUTO_CAPITALIZE_NONE;            
    this.placeholder = bconfig.placeholder;
	
	this.onbeginediting = pspconfig.onbeginediting;
	this.onendediting = pspconfig.onendediting;

    //Internal Usage
    this.wType = "TextField";
    this.__name = "konyLua.TextBox2";
};
kony.inherits(konyLua.TextBox2,konyLua.Widget);

konyLua.TextBox = function(bconfig, lconfig, pspconfig) {

    konyLua.TextBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    //For Backward compatibility
    this.placeholder = pspconfig.placeholder;       //Its a PSP in old const.
    this.autocapitalize = pspconfig.autocapitalize;
    this.keyboardtype = pspconfig.keyboardtype;
    this.ondone = pspconfig.ondone;
    this.__name = "konyLua.TextBox";
}
kony.inherits(konyLua.TextBox, konyLua.TextBox2);

//TextArea Constructor
konyLua.TextArea2 = function(bconfig, lconfig, pspconfig) {
            
    konyLua.TextArea2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
                        
    this.numberofvisiblelines = bconfig.numberofvisiblelines;
    this.wType = "TextArea";
    this.name = "konyLua.TextArea2";
};
kony.inherits(konyLua.TextArea2,konyLua.TextBox2);

konyLua.TextArea = function(bconfig, lconfig, pspconfig) {
      
    konyLua.TextArea.baseConstructor.call(this, bconfig, lconfig, pspconfig);

    //For Backward compatibility
    this.numberofrows = pspconfig.numberofrows || pspconfig.noofrows;
    this.maxtextlength = bconfig.length;
    this.name = "konyLua.TextArea";
}
kony.inherits(konyLua.TextArea, konyLua.TextArea2);