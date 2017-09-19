kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

//Mocking views used in the testcases
kony.appfoundation.KonyGlobalObject = kony.appfoundation.KonyGlobalObject || {};
kony.appfoundation.KonyGlobalObject["frmOrderResourceDetailsKA"] = {
	"id" : "frmOrderResourceDetailsKA",
	 "lblMaterialNameValueKA": {
        "text" : "",
		"skin": ""
    },
    "lblMatrialIdNumberValueKA": {
      "text" : "",
	  "skin": ""
    },
    "lblQuantityNeededValueKA": {
      "text" : "",
	  "skin": ""
    },
    "lblAvailableValueKA" : {
      "text" : "",
	  "skin": ""
    },
	"show" : function(){
		kony.appfoundation.log.info("frmOrderResourceDetailsKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmOrderResourcesListKA"] = {
	"id" : "frmOrderResourcesListKA",
	"segDetailskA" : {
		"data" : null,
		"widgetDataMap" : null,
		"setData" : function(data){
			this.data = data;
		},
		"getData" : function(){
			return this.data;
		},
		"removeAll" : function(){
			
		},
		"isVisible":""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmOrderResourcesListKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmResourceExecutionKA"] = {
	"id" : "frmResourceExecutionKA",
	 "lblResourceNameKA": {
        "text" : "",
	    "skin": ""
    },
    "lblResourceNumberKA": {
        "text" : "",
	    "skin": ""
    },
    "lblResourceUnitKA": {
        "text" : "",
	    "skin": ""
    },
	"lblHeaderKA": {
        "text" : "",
	    "skin": ""
    },
	"lblMaterialTypeKA": {
        "text" : "",
	    "skin": ""
    },
	"lblUnitKA": {
        "text" : "",
	    "skin": ""
    },
    "lblDescriptionValueKA": {
        "text" : "",
	    "skin": ""
    },
    "lblMeasureValueKA": {
        "text" : "",
	    "skin": ""
    },
    "lblModelValueKA": {
        "text" : "",
	    "skin": ""
    },
    "lblBarcodeValueKA": {
        "text" : "",
	    "skin": ""
    },
	"flxEditKA":{
		"isVisible":"",
		"add":function(){
			
			},
		 "remove":function(){
			
			}
	},
	"flxFooterKA":{
		"isVisible":"",
		"add":function(){
			
			},
		 "remove":function(){
			
			}
	},
	"tbxQuantityKA":{
	    "text":""
	},
	"tbxUnitKA":{
	    "text":"",
		"setEnabled" : function(){}
	},
	"btnSaveKA":{
		"skin":"",
		"isVisible":""
	},
	"btnBackKA":{
		"skin":"",
		"focusskin":"",
		"setEnabled":function(){
			}
	},
	"imgNextKA":{
	 "isVisible":""
	},
	"FlexScrollContainerOptionsKA":{
		 "widgets": function(){
				return [ ];
			},
		 "add":function(){
			
			},
		 "remove":function(){
			
			}
	},
	"show" : function(){
		kony.appfoundation.log.info("frmResourceExecutionKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmTaskResourcesListKA"] = {
	"id" : "frmTaskResourcesListKA",
	"show" : function(){
		kony.appfoundation.log.info("frmTaskResourcesListKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmOrderHistoryKA"] = {
	"id" : "frmOrderHistoryKA",
	"show" : function(){
		kony.appfoundation.log.info("frmOrderHistoryKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmStatusFilterKA"] = {
	"id" : "frmStatusFilterKA",
	"show" : function(){
		kony.appfoundation.log.info("frmStatusFilterKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmDateFilterKA"] = {
	"id" : "frmDateFilterKA",
	"show" : function(){
		kony.appfoundation.log.info("frmDateFilterKA form show");
	}
};
