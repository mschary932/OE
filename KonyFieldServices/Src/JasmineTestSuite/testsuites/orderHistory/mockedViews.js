kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

//Mocking views used in the testcases
kony.appfoundation.KonyGlobalObject = kony.appfoundation.KonyGlobalObject || {};

kony.appfoundation.KonyGlobalObject["frmOrderHistoryKA"] = {
	"id" : "frmOrderHistoryKA",
	"segOrderHistoryKA" : {
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
		"selectedItems":""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmOrderHistoryKA form show");
	}
};
