kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

//Mocking views used in the testcases
kony.appfoundation.KonyGlobalObject = kony.appfoundation.KonyGlobalObject || {};
kony.appfoundation.KonyGlobalObject["frmDirectionsKA"] = {
	"id" : "frmDirectionsKA",
	"show" : function(){
		kony.appfoundation.log.info("frmDirectionsKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmOrderListKA"] = {
	"id" : "frmOrderListKA",
	"segOrderListKA" : {
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
	"mapMyOrderListKA" : {
		"isVisible" : "",
		"zoomLevel" : "",
		"getBounds" : function(){
			return;
		},
		"locationData":"",
		"widgetDataMapForCallout":""
	},
	"btnListOrderKA" : {
		"skin" : ""
	},
	"flexListKA" : {
		"top" : "",
		"height" : "",
	},		
	"btnMapShowKA" : {
		"skin" : ""
	},
	"btnDay0KA" : {
		"skin" : "",
		"text":"",
		"setEnabled"  : function(){
			return;
		},
	},
	"btnDay1KA" : {
		"skin" : "",
		"text":"" ,
		"setEnabled"  : function(){
			return;
		},
	},
	"btnDay2KA" : {
		"skin" : "",
		"text":"" ,
		"setEnabled"  : function(){
			return;
		},
	},
	"btnDay3KA" : {
		"skin" : "",
		"text":"" ,
		"setEnabled"  : function(){
			return;
		},
	},
	"btnDay4KA" : {
		"skin" : "",
		"text":"" ,
		"setEnabled"  : function(){
			return;
		},
	},
	"lblDay0KA" : {
		"skin" : "",				
		"text":""
	},
	"lblDay1KA" : {
		"skin" : "",
		"text":""
	},
	"lblDay2KA" : {
		"skin" : "",
		"text":""
	},
	"lblDay3KA" : {
		"skin" : "",
		"text":""
	},
	"lblDay4KA" : {
		"skin" : "",
		"text":""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmOrderListKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmOrdersViewsKA"] = {
	"id" : "frmOrdersViewsKA",
	"segOrderViewKA" : {
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
		"selectedIndex" : ""
	},
	"segFilterViewKA" : {
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
		"selectedIndices" : "",
		"selectedRowIndex" : ""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmOrdersViewsKA form show");
	}
};
kony.appfoundation.KonyGlobalObject["frmStatusFilterKA"] = {
	"id" : "frmOrdersViewsKA",
	"lblHeaderKA" : {
		"text" : ""
	},
	"segDateFilterKA" : {
		"data" : null,
		"widgetDataMap" : null,
		"setData" : function(data){
			this.data = data;
		},
		"getData" : function(){
			return this.data;l
		},
		"removeAll" : function(){
			
		},
		"selectedIndices" : ""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmStatusFilterKA form show");
	}
};
	kony.appfoundation.KonyGlobalObject["frmDateFilterKA"] = {
	"id" : "frmDateFilterKA",
	"lblHeaderKA" : {
		"text" : ""
	},
	"segDateFilterKA" : {
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
		"selectedIndex" : ""
	},
	"calenderKA" : {
		"isVisible" : "",
		"dateComponents" : ""
	},
	"show" : function(){
		kony.appfoundation.log.info("frmDateFilterKA form show");
	}
};
