kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

//Mocking views used in the testcases
kony.appfoundation.KonyGlobalObject = kony.appfoundation.KonyGlobalObject || {};
kony.appfoundation.KonyGlobalObject["frmTaskExecutionKA"] = {
	"id" : "frmTaskExecutionKA",
	"lblDayandTimeKA" :{
		"text" : ""
	},
	"lblStatusKA" :{
		"text" : ""
	},
	"lblTaskDescriptionKA" :{
		"text" : ""
	},
	"lblTimerKA" :{
		"text" : ""
	},
	"segTaskExecutionKA" : {
		"data" : null,
		"widgetDataMap" : {},
		"setData" : function(data){
			this.data = data;
		},
		"getData" : function(){
			return this.data;
		},
		"removeAll" : function(){
			
		}
	},
	"flxFooterKA" : {
		"isVisible" : ""
	},
	"imgPlayPauseKA" :{
		"isVisible" : "",
		"src" : "",
		"skin" : ""
	},
	"flxScrollTypesKA" : {
		"text" : "",
		"widgets": function(){
			return [ ];
		},
		"removeGestureRecognizer":function(){
		
		},
		"addGestureRecognizer":function(){
		
		},
		"add":function(){
		
		},
		"remove":function(){
		
		}
	},
	"show" : function(){
		kony.appfoundation.log.info("frmTaskExecutionKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmOrderExecutionKA"] = {
	"id" : "frmOrderExecutionKA",
	"lblTimeKA" :{
		"text" : ""
	},
	"lblOrderNumKA" :{
		"text" : ""
	},
	"lblPriorityKA" :{
		"text" : ""
	},
	"lblStatusKA" :{
		"text" : ""
	},
	"lblInfoKA" :{
		"text" : ""
	},
	"lblNameKA" :{
		"text" : ""
	},
	"lblAddressKA" :{
		"text" : ""
	},
	"segDetailsKA" : {
		"data" : null,
		"widgetDataMap" : {},
		"setData" : function(data){
			this.data = data;
		},
		"getData" : function(){
			return this.data;
		},
		"removeAll" : function(){
			
		}
	},
	"imgPriorityKA" :{
		"isVisible" : "",
		"src" : "",
		"skin" : ""
	},
	"imgStatusMachineStartedKA" :{
		"isVisible" : "",
		"src" : "",
		"skin" : ""
	},
	"flxScrollTypesKA" : {
		"text" : "",
		"widgets": function(){
			return [ ];
		},
		"removeGestureRecognizer":function(){
		
		},
		"addGestureRecognizer":function(){
		
		},
		"add":function(){
		
		},
		"remove":function(){
		
		}
	},
	"flxFooterKA" : {
		"isVisible" : ""
	},
	"btnHoldKA" : {
		"onClick":function(){
		},
		"text" : "",
		"isVisible" : true,
		"width" : "",
		"left" : "",
		"setEnabled": function(){
		},
		"skin":"",
		"focusSkin":""
	},
	"btnCompleteKA" : {
		"onClick":function(){
		},
		"text" : "",
		"isVisible" : true,
		"width" : "",
		"left" : "",
		"setEnabled": function(){
		},
		"skin":"",
		"focusSkin":""
	},
	"btnCancelKA" : {
		"onClick":function(){
		},
		"text" : "",
		"isVisible" : true,
		"width" : "",
		"left" : "",
		"setEnabled": function(){
		},
		"skin":"",
		"focusSkin":""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmOrderExecutionKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmContactDetailsKA"] = {
	"id" : "frmContactDetailsKA",
	"lblContactNameValueKA" : {
		"text" : "",
		"skin": ""
	},
	"lblAlternatePhoneKA" : {
		"text" : "",
		"skin": ""
	},
	"lblPhoneNumberValueKA" : {
		"text" : "",
		"skin": ""
	},
	"lblEmailValueKA" :{
		"text" : "",
		"skin": ""
	},
	"lblMessageValueKA" :{
		"text" : "",
		"skin" : ""
	},
	"flxSecondaryPhoneKA" : {
		"text" : "",
		"add":function(){
		
		},
		"remove":function(){
		
		}
	},
	"flxPrimaryPhoneKA" : {
		"text" : "",
		"add":function(){
		
		},
		"remove":function(){
		
		}
	},
	"flxPrimaryPhoneNoKA" : {
		"text" : "",
		"add":function(){
		
		},
		"remove":function(){
		
		}
	},
	"btnCallKA" : {
		"onClick":function(){
		
		},
		"text" : "",
		"setEnabled": function(){
		
		},
		"skin":"",
		"focusSkin":""
	},
	"btnEmailKA" : {
		"onClick":function(){
		
		},
		"text" : "",
		"setEnabled": function(){
		
		},
		"skin":"",
		"focusSkin":""
	},
	"btnMsgKA" : {
		"onClick":function(){
		
		},
		"text" : "",
		"setEnabled": function(){
		
		},
		"skin":"",
		"focusSkin":""
	},
	"btnAlternateCallKA" : {
		"onClick":function(){
		
		},
		"text" : "",
		"setEnabled": function(){
		
		},
		"skin":"",
		"focusSkin":""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmContactDetailsKA form show");
	}
};
