//TextBox Constructor
kony.ui.TextBox2 = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("TextBox2")); 
		
	kony.ui.TextBox2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	
	this.autoCorrect = this.autocorrect = pspconfig.autoCorrect || false;
	this.autoComplete = this.autocomplete = pspconfig.autoComplete || false;
	this.pattern = pspconfig.pattern;
	
	this.secureTextEntry = this.securetextentry = bconfig.secureTextEntry;
	this.maxtextlength = bconfig.maxTextLength;
	this.textinputmode = bconfig.textInputMode || constants.TEXTBOX_INPUT_MODE_ANY;
	this.keyboardtype = bconfig.keyBoardStyle || constants.TEXTBOX_KEY_BOARD_STYLE_DEFAULT;
	
	this.containerheightmode = lconfig.containerHeightMode || constants.TEXBOX_DEFAULT_PLATFORM_HEIGHT;
	this.containerheight = lconfig.containerHeight;
	this.containerheightreference = lconfig.containerHeightReference;
	
		this.ondone = bconfig.onDone;	
	

	this.onbeginediting =  pspconfig.onBeginEditing;
	this.onendediting =  pspconfig.onEndEditing;

	
		this.ontextchange = bconfig.onTextChange || pspconfig.onTextChange;
	
	this.autocapitalize = bconfig.autoCapitalize || constants.TEXTBOX_AUTO_CAPITALIZE_NONE;	
	
	
	var text = bconfig.text || "";
	defineGetter(this, "text", function() {
	   	return text;
	});	
	defineSetter(this, "text", function(val) {
		text = val;
		if(this.canUpdateUI)
		{
			// i18n status lost
			this.i18n_text = "";
			$KW[this.wType]["updateView"](this,  "text" , val);
		}
	});	

	var placeholder = bconfig.placeholder || "";
	defineGetter(this, "placeholder", function() {
		return placeholder;
	});	
	defineSetter(this, "placeholder", function(val) {
		placeholder = val;
		$KW[this.wType]["updateView"](this, "placeholder" , val);
	});	

	var pattern = pspconfig.pattern;
	defineGetter(this, "pattern", function() {
		return pattern;
	});	
	defineSetter(this, "pattern", function(val) {
		pattern = val;
		$KW[this.wType]["updateView"](this, "pattern" , val);
	});	
	
	var name = pspconfig.name || "";
	defineGetter(this, "name", function() { 
		return name;
	});	
	defineSetter(this, "name", function(val) {
		name = val;
		$KW[this.wType]["updateView"](this,  "name" , val);
	});	

	//Internal Usage
    this.canUpdateUI = true;
	this.wType = "TextField";
    this.__name = "kony.ui.TextBox2";
	

	kony.ui.TextBox2.prototype.setGetterSetter.call(this);
};

kony.inherits(kony.ui.TextBox2,kony.ui.Widget);

kony.ui.TextBox2.prototype.setGetterSetter = function() {

	defineGetter(this, "maxTextLength", function() {
		return this.maxtextlength;
	});	
	defineSetter(this, "maxTextLength", function(val) {
		this.maxtextlength = val;
		$KW[this.wType]["updateView"](this, "maxtextlength", val);
	});

	defineGetter(this, "textInputMode", function() {
		return this.textinputmode || this.mode;
	});	
	defineSetter(this, "textInputMode", function(val) {
		this.textinputmode = this.mode = val;
		$KW[this.wType]["updateView"](this,  "textinputmode" , val);
	});	

	defineGetter(this, "keyBoardStyle", function() {
		return this.keyboardtype;
	});	
	defineSetter(this, "keyBoardStyle", function(val) {
		this.keyboardtype = val;
		$KW[this.wType]["updateView"](this, "keyboardtype", val);
	});	

	defineGetter(this, "onDone", function() {
		return this.ondone;
	});	
	defineSetter(this, "onDone", function(val) {
		this.ondone = val;
	});	
	
	defineGetter(this, "onBeginEditing", function() {
		return this.onbeginediting;
	});	
	defineSetter(this, "onBeginEditing", function(val) {
		this.onbeginediting = val;
	});		
	
	defineGetter(this, "onEndEditing", function() {
		return this.onendediting;
	});	
	defineSetter(this, "onEndEditing", function(val) {
		this.onendediting = val;
	});

	defineGetter(this, "onTextChange", function() {
		return this.ontextchange;
	});	
	defineSetter(this, "onTextChange", function(val) {
		this.ontextchange = val;
	});

	defineGetter(this, "autoCapitalize", function() {
		return this.autocapitalize;
	});	
	defineSetter(this, "autoCapitalize", function(val) {
		this.autocapitalize = val;
		$KW[this.wType]["updateView"](this,  "autocapitalize" , val);
	});

	defineGetter(this, "containerHeightMode", function() {
		return this.containerheightmode;
	});
	defineSetter(this, "containerHeightMode", function(val) {
		this.containerheightmode = val;
		$KW[this.wType]["updateView"](this,  "containerheightmode" , val);
	});
	
	defineGetter(this, "containerHeight", function() {
		return this.containerheight;
	});
	defineSetter(this, "containerHeight", function(val) {
		this.containerheight = val;
		$KW[this.wType]["updateView"](this,  "containerheight" , val);
	});
	
	defineGetter(this, "containerHeightReference", function() {
		return this.containerheightreference;
	});
	defineSetter(this, "containerHeightReference", function(val) {
		this.containerheightreference = val;
		$KW[this.wType]["updateView"](this,  "containerheightreference" , val);
	});
	
}

kony.ui.TextBox = function(bconfig, lconfig, pspconfig) {

	kony.ui.TextBox.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	//For Backward compatibility
	this.placeholder = pspconfig.placeholder;		//Its a PSP in old const.
	this.autocapitalize = pspconfig.autoCapitalize;
	this.keyboardtype = pspconfig.keyBoardType;
	this.ondone = pspconfig.onDone;

	this.__name = "kony.ui.TextBox";
}

kony.inherits(kony.ui.TextBox, kony.ui.TextBox2);

//TextArea Constructor
kony.ui.TextArea2 = function(bconfig, lconfig, pspconfig) {

	if(arguments.length < 3)
		bconfig = lconfig = pspconfig = $KU.mergeDefaults(bconfig, $KU.getAllDefaults("TextArea2")); 
		
	kony.ui.TextArea2.baseConstructor.call(this, bconfig, lconfig, pspconfig);
	
    this.wType = "TextArea";
    this.name = "kony.ui.TextArea2";
	
	this.numberofvisiblelines = bconfig.numberOfVisibleLines;
	this.setGetterSetter();
	
};
kony.inherits(kony.ui.TextArea2,kony.ui.TextBox2);

kony.ui.TextArea2.prototype.setGetterSetter = function() {

	defineGetter(this, "numberOfVisibleLines", function() {
	   	return this.numberofvisiblelines;
	});	
	defineSetter(this, "numberOfVisibleLines", function(val) {
	   	this.numberofvisiblelines = val;
	   	$KW[this.wType]["updateView"](this,  "numberofvisiblelines" , val);
	});

}

kony.ui.TextArea = function(bconfig, lconfig, pspconfig) {
	kony.ui.TextArea.baseConstructor.call(this, bconfig, lconfig, pspconfig);

	//For Backward compatibility
	this.numberofrows = pspconfig.numberOfRows;
	this.name = "kony.ui.TextArea";
}
kony.inherits(kony.ui.TextArea, kony.ui.TextArea2);