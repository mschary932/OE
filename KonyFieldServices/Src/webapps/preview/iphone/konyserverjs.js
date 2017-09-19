kony = {
        globals : {},              
        ui : {
			Alert : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push("createInstance");
				return kony.getMethod("com.konylabs.api.ui.KonyAlert", args);
			},
			Form : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyForm", args);
			},
			Form2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyForm2", args);
			},
			Popup : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyPopup", args);
			},
			Calendar : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
	
				args.push('wType', 'Calendar');
				args.push("createCalendar");
				return kony.getMethod("com.konylabs.api.ui.KonyCalendar", args);
			},
			Button : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wtype', 'Button');
				return kony.getInstanace("com.konylabs.api.ui.KonyButton", args);
			},
	
			Label : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'Label');
				return kony.getInstanace("com.konylabs.api.ui.KonyLabel", args);
			},
	
			Link : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'Link');
				return kony.getInstanace("com.konylabs.api.ui.KonyButton", args);
			},
	
			Phone : function() {
                var args = new Array();
                for ( var i = 0; i < arguments.length; i++) {
                    args[i] = arguments[i];
                }
                args.push('wType', 'Link');
                return kony.getInstanace("com.konylabs.api.ui.KonyButton", args);
            },
	
			RichText : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'RichText');
				return kony.getInstanace("com.konylabs.api.ui.KonyRichText", args);
			},
	
			TextBox : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'TextField');
				return kony.getInstanace("com.konylabs.api.ui.KonyTextField", args);
			},
			
			TextBox2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'TextField2');
				return kony.getInstanace("com.konylabs.api.ui.KonyTextField", args);
			},
	
			RadioButtonGroup : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'RadioButtonGroup');
				return kony.getInstanace("com.konylabs.api.ui.KonyChoiceGroup", args);
			},
	
			ListBox : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'ListBox');
				return kony.getInstanace("com.konylabs.api.ui.KonyList", args);
			},
	
			Image : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'Image');
				return kony.getInstanace("com.konylabs.api.ui.KonyImage", args);
			},
			
			Image2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'Image2');
				return kony.getInstanace("com.konylabs.api.ui.KonyImage", args);
			},
	
			ComboBox : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
	
				args.push('wType', 'ComboBox');
				args.push("createComboxInstance");
				return kony.getMethod("com.konylabs.api.ui.KonyChoiceGroup", args);
			},
	
			CheckBoxGroup : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'CheckBoxGroup');
				return kony.getInstanace("com.konylabs.api.ui.KonyChoiceGroup", args);
			},
	
			Box : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyContainer", args);
			},
			
			SegmentedUI : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace(
						"com.konylabs.api.ui.segui.KonySegmentUI", args);
			},
	
			SegmentedUI2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace(
						"com.konylabs.api.ui.segui.KonySegmentUI2", args);
			},
	
			HorizontalImageStrip : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'HStrip');
				args.push("createImageStripInstance");
				return kony.getMethod("com.konylabs.api.ui.segui.KonyImageGallery", args);
			},
			
			HorizontalImageStrip2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'HStrip2');
				args.push("createImageStripInstance");
				return kony.getMethod("com.konylabs.api.ui.segui.KonyImageGallery", args);
			},
	
			ImageGallery : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'IGallery');
				args.push("createImageGalleryInstance");
				return kony.getMethod("com.konylabs.api.ui.segui.KonyImageGallery", args);
			},
			
			ImageGallery2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'IGallery2');
				args.push("createImageGalleryInstance");
				return kony.getMethod("com.konylabs.api.ui.segui.KonyImageGallery", args);
			},
			
			TextArea : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'TextArea');
				return kony.getInstanace("com.konylabs.api.ui.KonyTextField", args);
			},
	
			TextArea2 : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'TextArea');
				return kony.getInstanace("com.konylabs.api.ui.KonyTextField", args);
			},
					
			TabPane : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyTabWidget", args);
			},
			
			Line : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				args.push('wType', 'Line');
				return kony.getInstanace("com.konylabs.api.ui.KonyLabel", args);
			},
			
			Map : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyMap", args);
			},
			
			Browser : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyBrowser", args);
			},
			
			DataGrid : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDataGrid", args);
			},
			
			CustomWidget : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyWidget", args);
			},
			
			Camera : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyWidget",	args);
			},
			
			ScrollBox : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyContainer",
						args);
			},
			
			Slider : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyWidget",
						args);
			},
			
			PickerView : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyWidget",
						args);
			},
			
			Switch : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyDummyWidget",
						args);
			},
			
			Video : function() {
				var args = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					args[i] = arguments[i];
				}
				return kony.getInstanace("com.konylabs.api.ui.KonyVideo",
						args);
			}
        },
        getInstanace : function(widgetClassName,params){
            return  KonyWidgetFactory.getInstance(widgetClassName,params);
        },    
        
        getMethod : function(widgetClassName,params){
            return  KonyWidgetFactory.getMethods(widgetClassName,params);
        },    
        print : function(params){
            kony.application.print(params);
        },
        convertToBase64 : function(params){
            return "";
        },
        convertToRawBytes : function(params){
            return null;
        },
        getError : function(params){
            return new Error(""); 
        },
        type : function(params){
            var type = kony.standard.type(params);
            if(type == "table"){
                type = "object";
            }
            return type;
        }
};

constants = kony.getInstanace("com.konylabs.api.ConstantsLib");
kony.i18n = kony.getInstanace("com.konylabs.api.I18nLib");
kony.location = kony.getInstanace("com.konylabs.api.GeoLocationLib");
kony.application = kony.getInstanace("com.konylabs.api.ApplicationLib");
kony.theme = kony.getInstanace("com.konylabs.api.ThemeLib");
//kony.string = kony.getInstanace("com.konylabs.api.StringLib");
//kony.table = kony.getInstanace("com.konylabs.api.TableLib");
kony.os = kony.getInstanace("com.konylabs.api.OSLib");
kony.timer = kony.getInstanace("com.konylabs.api.TimerLib");
kony.ds = kony.getInstanace("com.konylabs.api.DataSourceLib");
kony.phone = kony.getInstanace("com.konylabs.api.PhoneLib");
kony.net = kony.getInstanace("com.konylabs.api.NetworkLib");
kony.standard = kony.getInstanace("com.konylabs.api.StandardLib");
kony.stream = kony.getInstanace("com.konylabs.api.StreamingLib");
kony.crypto = kony.getInstanace("com.konylabs.api.CryptoLib");
kony.store = kony.getInstanace("com.konylabs.api.StoreLib");
kony.db = kony.getInstanace("com.konylabs.api.DBLib");
kony.props = kony.getInstanace("com.konylabs.api.PropsLib");
kony.json = kony.getInstanace("com.konylabs.api.JSONLib");
kony.contact = kony.getInstanace("com.konylabs.api.ContactsLib");


function alert(message){
    if(message && message != ""){
        var basicConf = {message: message,alertType: constants.ALERT_TYPE_INFO,alertTitle: "",yesLabel:"yes",
        noLabel: "no"};
        //Defining pspConf parameter for alert
        var pspConf = {};
        //Alert definition
        var infoAlert = kony.ui.Alert(basicConf,pspConf);    
    }
    
}
kony.luatable = {
    lib : kony.getInstanace("com.konylabs.api.TableLib"),
    push : function (data){
        var luatable = this;
        luatable.insert(luatable.length,data);
    },
    
    sort : function(comprator){
        var luatable = this;
        if(comprator != null && typeof comprator != undefined){
            kony.luatable.lib.sort(luatable,comprator);    
        }else{
            kony.luatable.lib.sort(luatable);
        }
        return luatable;
    },
    
      insert : function(inputtable,position,value)  {
    	 if(value != undefined)
    		 kony.luatable.lib.insert(inputtable,position,value); 
    	 else
    		 kony.luatable.lib.insert(inputtable, position);
    	 return inputtable;
     } ,
     contains : function(inputtable,key)  {
    	 return kony.luatable.lib.contains(inputtable,key);
     } ,
    
    toJSON : function(){
        var luatable = this;        
        return kony.json.stringify(luatable);
    }
}
