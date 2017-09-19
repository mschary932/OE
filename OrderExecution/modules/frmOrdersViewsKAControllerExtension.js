/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrdersViewsKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrdersViewsKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF,{
    $statics: {
        ORDERLIST_VIEWTYPE_STATUS: "Status_id",
        ORDERLIST_VIEWTYPE_PRIORITY: "Priority",
        ORDERLIST_VIEWTYPE_TODAY: "Today",
        ORDERLIST_VIEWTYPE_SCHEDULED: "Scheduled",
        ORDERLIST_VIEWTYPE_STARTED : "Started",
        ORDERLIST_VIEWTYPE_NEARME : "NearMe",
        PRIORITY_DISPLAY_ORDER: ["Critical", "High", "Medium", "Low"],
        STATUS_DISPLAY_ORDER: ["Scheduled", "Completed", "Rejected"],
        UNCHECKED_VIEW_IMAGE: "notification_circle_unchecked.png",
        FORWARD_CARET : "bf_forward_caret.png",
        FILTER_UNCHECKED_SKIN : "sknBtnUncheckedCheckboxKA",
        FILTER_CHECKED_SKIN : "sknBtnCheckedCheckboxKA",
        ORDER_VIEW : ["Today","Status","Priority","NearMe","Scheduled","Started"],
        ORDER_FILTER : ["Date","Status","Priority"],
        NEAR_ME_GROUP : ["1 miles","2 - 5 miles","5 - 10 miles","10 - 20 miles","+20 miles"],
        NEAR_ME_DISPLAY_ORDER: ["1Group", "2Group", "3Group", "4Group","5Group"],
        DATE_FILTER_INDEX : 0,
        STATUS_FILTER_INDEX : 1,
        PRIORITY_FILTER_INDEX : 2,
        BUTTON_CLEAR_SKIN : "sknBtnFF5D6EClanProNews28KA"
        
    },
    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.controllerExtensionGen = undefined;
    },

    fetchData: function() {       
         try {
            var scopeObj = this;
            //this.$class.$superp.fetchData.call(this, success, error);
        } catch (err) {
            kony.appfoundation.log.error("Error in fetchData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(response) {
            kony.appfoundation.log.info("success fetching data ", response);
            scopeObj.formatData(response);
        }

        function error(err) {
            //Error fetching data
            kony.appfoundation.log.error("In fetchData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
        
    },

    performFetchAndBindFormData: function(successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchAndBindFormData.call(this, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },

    prepareFetchAndBindDataStrategy: function() {
        try {
            this.$class.$superp.prepareFetchAndBindDataStrategy.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare fetch and bind data : " + error);
        }
    },

    updateBLogicContextData: function(widgetMapping) {
        try {
            this.$class.$superp.updateBLogicContextData.call(this, widgetMapping);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic update context data : " + error);
        }
    },

    fetchAndBindDataByWidgetGroup: function(widgetGroupId) {
        try {
            this.$class.$superp.fetchAndBindDataByWidgetGroup.call(this, widgetGroupId);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data for widget : " + error);
        }
    },

    bindData: function(dataMap) {
        try {      
            var scopeObj = this;
            var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
			kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_VIEWS_FILTERS = kony.servicesapp.globalOrdersViewsKA;
			var utilitiesObj = utilities.getUtilityObj();
			var controller = this.getController();
            var appContext = controller.getApplicationContext();
            var formmodel = controller.getFormModel();
			formmodel.clear();
			var filterHeader = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.filterValueKA");
			var viewHeader = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.ViewsValueKA");
			var btnClear = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.subHeader.btnClearValueKA");
			var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segOrderViewKA", "widgetDataMap");
            lclWidgetDataMap["lblHeaderTmpKA"] = "lblHeaderTmpKA";
            formmodel.setViewAttributeByProperty("segOrderViewKA", "widgetDataMap", lclWidgetDataMap);
            lclWidgetDataMap = formmodel.getViewAttributeByProperty("segFilterViewKA", "widgetDataMap");
            lclWidgetDataMap["lblFilterHeaderKA"] = "lblFilterHeaderKA";
            lclWidgetDataMap["btnClearKA"] = "btnClearKA";
            formmodel.setViewAttributeByProperty("segFilterViewKA", "widgetDataMap", lclWidgetDataMap);
			dataMap = [];
			var imgSelect = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.UNCHECKED_VIEW_IMAGE;
			var processedSegData = [];
			var processedSegRowData;
			var viewList = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_VIEW;
			var viewValues = "";
			var lclSelectedIndex = null;
			for(var i in viewList){
				processedSegRowData = {};
				viewValues = "i18n.order.frmOrdersViewsKA."+viewList[i]+".ValueKA";
				viewValues = utilitiesObj.geti18nValueKA(viewValues);
				processedSegRowData["lblTaskViewKA"] = viewValues;
				if(viewList[i] == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_VIEWS_FILTERS.view){
					lclSelectedIndex=[0,parseInt(i)];
				}
				processedSegRowData["imgSelectViewKA"] = imgSelect;
				processedSegData.push(processedSegRowData);
			}
			var lclViewHeader = {
				"lblHeaderTmpKA": viewHeader
			};
			var viewFinalSegData = [
				[lclViewHeader, processedSegData]
			];
			dataMap["segOrderViewKA"] = {};
			dataMap["segOrderViewKA"]["segOrderViewKA"] = viewFinalSegData;
			var arrowImage = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FORWARD_CARET;
			var filterList = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_FILTER;
			var checkUncheckSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN;
			var selValue = "";
			viewValues = "";
			var taskKA;
			processedSegData = [];
			var selectedFilterValue;
			
			for(var i in filterList){
				checkUncheckSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN;
				selValue = "";
				viewValues = "i18n.order.frmOrdersViewsKA."+filterList[i]+".ValueKA";
				viewValues = utilitiesObj.geti18nValueKA(viewValues);
				if(selValue){
					taskKA = {text: viewValues, centerY : ""};
					selValue = {isVisible : true, text : selValue};
				}else{
					taskKA = {text: viewValues, centerY : "50%"};
					selValue = {isVisible : false, text : selValue};
				}
				processedSegRowData = {};
				processedSegRowData["lblTaskKA"] = taskKA;
				processedSegRowData["selectFilterKA"] = {isVisible : true , skin : checkUncheckSkin, text : " " };
				processedSegRowData["imgsegArrowKA"] = arrowImage;
				processedSegRowData["lblValueKA"] = selValue;			   
				processedSegData.push(processedSegRowData);
			}
			var lclTaskHeader = {btnClearKA : {text : btnClear,skin:kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.BUTTON_CLEAR_SKIN},
				lblFilterHeaderKA : filterHeader
			};
			var finalFilterSegData = [
				[lclTaskHeader, processedSegData]
			];
			dataMap["segFilterViewKA"] = {};
			dataMap["segFilterViewKA"]["segFilterViewKA"] = finalFilterSegData;
			this.$class.$superp.bindData.call(this,dataMap);
			scopeObj.setFilterValue(0, kony.servicesapp.globalOrdersViewsKA.filters.date.text, false);
			if(kony.servicesapp.globalOrdersViewsKA.filters.status.formatValues	!==	null)
                 scopeObj.setFilterValue(1, kony.servicesapp.globalOrdersViewsKA.filters.status.formatValues, false);
			 if(kony.servicesapp.globalOrdersViewsKA.filters.priorities.values	!==	null)
                 scopeObj.setFilterValue(2, kony.servicesapp.globalOrdersViewsKA.filters.priorities.formatValues, false);
			formmodel.setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", lclSelectedIndex);
			if(lclSelectedIndex && lclSelectedIndex != null){
            	var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
				statusFilterControllerExtension.setFormModelInfo("orderViewFilters", null);
				scopeObj.selectFilterBasedOnView(lclSelectedIndex[1]);
            }
			scopeObj.getController().getFormModel().formatUI();
			formmodel.showView();
			
            /*var utilitiesObj = utilities.getUtilityObj();
            var viewType = this.getFormModelInfo("viewType");
	       
           processedSegData = [];
           var result = scopeObj.setSelectedFilterValue();
		   var selectedFilterValue = result[0];
		   var appliedFilterFlag = result[1];
		   if(appliedFilterFlag){		   
				lclSelectedIndex = null;		   
		   }
             
			var flag = scopeObj.getFormModelInfo("orderViewFilters1") ? true : false; 
            var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject(); 
            var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject(); 
                    
            dateFilterControllerExtension.setFormModelInfo("DateFilterIndex",utilitiesObj.cloneValue(scopeObj.getFormModelInfo("DateFilterIndex1")));
            dateFilterControllerExtension.setFormModelInfo("DateFilter",utilitiesObj.cloneValue(scopeObj.getFormModelInfo("DateFilter1")));
            if(flag){           	           		
				statusFilterControllerExtension.setFormModelInfo("orderViewFilters",utilitiesObj.cloneObject(scopeObj.getFormModelInfo("orderViewFilters1")));        
            }else{
            	statusFilterControllerExtension.setFormModelInfo("orderViewFilters",null); 
            }
        */    
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
	fetchMasterData: function(serviceName, options, successcallback, errorcallback) {
        try {
			var configObj = this.getController().getConfig();
            var serviceName = configObj.getObjectServiceName();
            var options = configObj.getObjectServiceOptions();
			this.$class.$superp.fetchMasterData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterData", e);
        }
    },
	fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
        try {
			this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
        } catch (e) {
            kony.appfoundation.log.error("Error in fetchingMasterDataForWidget", e);
        }
    },
    saveRecord: function(recordObject, entityName, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, entityName, onSuccess, onError);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entity : " + error);
        }
    },

    saveRecords: function(recordsArray, successcallback, errorcallback) {
        try {
            this.$class.$superp.saveRecords.call(this, recordsArray, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save entities : " + error);
        }
    },
    getEntitiesDataMap: function() {
        try {
            return this.$class.$superp.getEntitiesDataMap.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic prepare entity data map : " + error);
        }
    },
	saveData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.saveData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully created record
            kony.appfoundation.log.info("success saving record ", res);
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In saveData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

    },
    deleteData: function() {
        try {
            var scopeObj = this;
            this.$class.$superp.deleteData.call(this, success, error);
        } catch (err) {
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }

        function success(res) {
            //Successfully deleting record
            kony.appfoundation.log.info("success deleting record " + JSON.stringify(res));
        }

        function error(err) {
            //Handle error case
            kony.appfoundation.log.error("In deleteData errorcallback in controller extension ", err);
            var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        }
    },
    
	formatData: function(data) {
        try {
            var scopeObj = this;
            var formattedData = this.$class.$superp.formatData.call(this, data);
            this.bindData(formattedData);
        } catch (err) {
            //kony.appfoundation.log.error("Error in formatData of controllerExtension");
            var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.appfoundation.v2.AppFoundationExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.appfoundation.v2.AppFoundationExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
            kony.appfoundation.log.error(exception.toString());
        };

    },

    showPreviousForm: function(doReload) {
        this.$class.$superp.showPreviousForm.call(this, doReload);
    },

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },

    formatOrderListDataKA: function() { //formats the order list data depending on the selected view option
        try {
			
			
			var scopeObj = this;
			var controller = scopeObj.getController();
			var appContext = controller.getApplicationContext();
		    var formmodel = controller.getFormModel();
			var utilitiesObj = utilities.getUtilityObj();
			var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
	            
			var lclIndex = "1";
			var lclDate;
			if(kony.servicesapp.date.index != null){
				lclIndex = kony.servicesapp.date.index;
			}
			var selectedRow = formmodel.getViewAttributeByProperty("segOrderViewKA", "selectedRowIndex");
			var lclCurrentDate = convertTimeZone(moment((appContext.getFormController("frmOrderListKA").getControllerExtensionObject().getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYYMMDDHHmmss");
            var nextDate = moment(convertTimeZone(moment((appContext.getFormController("frmOrderListKA").getControllerExtensionObject().getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
            nextDate = moment(nextDate).subtract(1,"seconds").format("YYYYMMDDHHmmss");
            
			if(kony.servicesapp.date.text != "Today" && kony.servicesapp.globalOrdersViewsKA.view != null ){
				if(lclIndex == 0)
				kony.servicesapp.date.value = moment().subtract(1,"days").format("YYYY-MM-DD");
				else if(lclIndex == 1)
				kony.servicesapp.date.value = moment().format("YYYY-MM-DD");
				else if(lclIndex == 2)
				kony.servicesapp.date.value = moment().add(1,"days").format("YYYY-MM-DD");
				else if(lclIndex == 3)
				kony.servicesapp.date.value = moment().add(2,"days").format("YYYY-MM-DD");
				else if(lclIndex == 4)
				kony.servicesapp.date.value = moment().add(3,"days").format("YYYY-MM-DD");
				
				
				kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat);
		    }
			if(selectedRow!==null)
			kony.servicesapp.globalOrdersViewsKA.view = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_VIEW[selectedRow[1]];
            else
			kony.servicesapp.globalOrdersViewsKA.view = null;
		    
			
			if(lclIndex ==	1){
				for (var i = 0; i < kony.servicesapp.NO_OF_DAYS; i++) {
                lclDate = "btnDay" + i + "KA";
                appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
				}
				appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty("btnDay1KA", "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
	
			}
			if(kony.servicesapp.globalOrdersViewsKA.view == "Today"){
				for (var i = 0; i < kony.servicesapp.NO_OF_DAYS; i++) {
                lclDate = "btnDay" + i + "KA";
                appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
				}
				appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty("btnDay1KA", "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
				var lclCurrentDate = convertTimeZone(moment().format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYYMMDDHHmmss");
                var nextDate = moment(convertTimeZone(moment().format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
                nextDate = moment(nextDate).subtract(1,"seconds").format("YYYYMMDDHHmmss");
                var utilitiesObj = utilities.getUtilityObj();
			    var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
				kony.servicesapp.date.index = 1;
	            kony.servicesapp.date.value = moment().format("YYYY-MM-DD");
				kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat);
				var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
                    "z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			else if(kony.servicesapp.globalOrdersViewsKA.view == "Status"){
				var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			else if(kony.servicesapp.globalOrdersViewsKA.view == "Priority"){
				var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
	
			else if(kony.servicesapp.globalOrdersViewsKA.view == "NearMe"){
				var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			if(kony.servicesapp.date.text != "Today" && kony.servicesapp.globalOrdersViewsKA.view == null ){
				if(kony.servicesapp.temp.fromDate == true ){
					for (var i = 0; i < kony.servicesapp.NO_OF_DAYS; i++) {
						lclDate = "btnDay" + i + "KA";
						appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
					}
					var slectedDateComp = appContext.getFormController("frmDateFilterKA").getFormModel().getViewAttributeByProperty("calenderKA", "dateComponents");
				  if(kony.os.deviceInfo().name !== "iPhone")	
                  slectedDateComp[1] = String(parseInt(slectedDateComp[1]) + 1);
                 	if(parseInt(slectedDateComp[1])>=1 && parseInt(slectedDateComp[1])<=9){
						slectedDateComp[1] = "0" + slectedDateComp[1];
					}
					if(parseInt(slectedDateComp[0])>=1 && parseInt(slectedDateComp[0])<=9){
						slectedDateComp[0] = "0" + slectedDateComp[0];
					}
					var	selectedDate = slectedDateComp[2]+"-"+slectedDateComp[1]+"-"+slectedDateComp[0];
					var utilitiesObj = utilities.getUtilityObj();
					var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
					kony.servicesapp.date.value = selectedDate;
					kony.servicesapp.date.text = moment(selectedDate,kony.servicesapp.DATE_FORMAT).format(dateFormat);
					
					
					var i;
					if(moment().subtract(1,"days").format("YYYY-MM-DD") == selectedDate ){
						i = 0;
					}
					else if(moment().format("YYYY-MM-DD") == selectedDate ){
						i = 1;
					}
					else if(moment().add(1,"days").format("YYYY-MM-DD") == selectedDate ){
						i = 2;
					}
					else if(moment().add(2,"days").format("YYYY-MM-DD") == selectedDate ){
						i = 3;
					}
					else if(moment().add(3,"days").format("YYYY-MM-DD") == selectedDate ){
						i = 4;
					}
					if(i>=0 && i<=4){
						lclDate = "btnDay" + i + "KA"; 
						appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
			
					}
					kony.servicesapp.date.index =1;
					var lclCurrentDate = convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,"YYYYMMDDHHmmss");
					var nextDate = moment(convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
					nextDate = moment(nextDate).subtract(1,"seconds").format("YYYYMMDDHHmmss");
				}
					var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			else if(kony.servicesapp.date.text == "Today" && kony.servicesapp.globalOrdersViewsKA.view == null ){
				
					for (var i = 0; i < kony.servicesapp.NO_OF_DAYS; i++) {
						lclDate = "btnDay" + i + "KA";
						appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
					}
					appContext.getFormController("frmOrderListKA").getFormModel().setViewAttributeByProperty("btnDay1KA", "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
					kony.servicesapp.date.index = 1;
					
					var lclCurrentDate = convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,"YYYYMMDDHHmmss");
					var nextDate = moment(convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
					nextDate = moment(nextDate).subtract(1,"seconds").format("YYYYMMDDHHmmss");
				
			
					var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
                    "z": "Pending"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			if(kony.servicesapp.status.values != null && kony.servicesapp.priorities.values != null){
				    var selectedStatus = kony.servicesapp.status.values.split(",");
					var selectedStatusQueries = "";
					for( var i = 0; i < selectedStatus.length; i++ ){
						selectedStatusQueries = selectedStatusQueries + "'" + selectedStatus[i] + "'";
						if(i!= (selectedStatus.length-1 )){
							selectedStatusQueries = selectedStatusQueries + ",";
						}
					}
					var selectedPriorities = kony.servicesapp.priorities.values.split(",");
					var selectedPrioritiesQueries = "";
					for( var i = 0; i < selectedPriorities.length; i++ ){
						selectedPrioritiesQueries = selectedPrioritiesQueries + "'" + selectedPriorities[i] + "'";
						if(i!= (selectedPriorities.length-1 )){
							selectedPrioritiesQueries = selectedPrioritiesQueries + ",";
						}
					}
					var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id in {za} and Priority in {zb}"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"za": "(" + selectedStatusQueries +")",
					"zb": "(" + selectedPrioritiesQueries +")"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			else if(kony.servicesapp.status.values != null){
				    var selectedStatus = kony.servicesapp.status.values.split(",");
					var selectedStatusQueries = "";
					for( var i = 0; i < selectedStatus.length; i++ ){
						selectedStatusQueries = selectedStatusQueries + "'" + selectedStatus[i] + "'";
						if(i!= (selectedStatus.length-1 )){
							selectedStatusQueries = selectedStatusQueries + ",";
						}
					}
					var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id in {z}"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "(" + selectedStatusQueries +")"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			else if(kony.servicesapp.priorities.values != null){
				    var selectedPriorities = kony.servicesapp.priorities.values.split(",");
					var selectedPrioritiesQueries = "";
					for( var i = 0; i < selectedPriorities.length; i++ ){
						selectedPrioritiesQueries = selectedPrioritiesQueries + "'" + selectedPriorities[i] + "'";
						if(i!= (selectedPriorities.length-1 )){
							selectedPrioritiesQueries = selectedPrioritiesQueries + ",";
						}
					}
					var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Priority in {z}"+ kony.servicesapp.ORDERLIST_WITH_ASC;
					var navigationObject = appContext.getFormController("frmOrderListKA").getContextData();
					navigationObject.setQuery("segOrderListKA",query,"sql");
					navigationObject.setQueryParams("segOrderListKA", {  
					"x": lclCurrentDate,
					"y": nextDate,
					"z": "(" + selectedPrioritiesQueries +")"});
					appContext.getFormController("frmOrderListKA").getControllerExtensionObject().fetchData();
			}
			kony.servicesapp.globalOrdersViewsKA.filters.date.value = kony.servicesapp.date.value;
			kony.servicesapp.globalOrdersViewsKA.filters.date.text = kony.servicesapp.date.text;
			kony.servicesapp.globalOrdersViewsKA.filters.date.index = kony.servicesapp.date.index;
			kony.servicesapp.globalOrdersViewsKA.filters.status.indices = kony.servicesapp.status.indices;
			kony.servicesapp.globalOrdersViewsKA.filters.status.values = kony.servicesapp.status.values;
			kony.servicesapp.globalOrdersViewsKA.filters.status.formatValues = kony.servicesapp.status.formatValues;
			kony.servicesapp.globalOrdersViewsKA.filters.priorities.indices = kony.servicesapp.priorities.indices;
			kony.servicesapp.globalOrdersViewsKA.filters.priorities.values = kony.servicesapp.priorities.values;
			kony.servicesapp.globalOrdersViewsKA.filters.priorities.formatValues = kony.servicesapp.priorities.formatValues;
			
			scopeObj.navigateBack();
			
			
			
			
            /*var scopeObj = this;
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var formmodel = controller.getFormModel();
            var controllerOrderList = appContext.getFormController("frmOrderListKA");
            var controllerExtension = controllerOrderList.getControllerExtensionObject();
            var utilitiesObj = utilities.getUtilityObj();
            var listData = controllerExtension.getFormModelInfo("segData");
            var formattedData = [];
            var workOrderStatus = kony.servicesapp.servicesStatus.key;

            //********** code need to be removed after UIRT_V2 supports segment header mapping starts here
            var lclWidgetDataMap = controllerOrderList.getFormModel().getViewAttributeByProperty("segOrderListKA", "widgetDataMap");
            lclWidgetDataMap["lblscheduledKA"] = "lblHeader";
            lclWidgetDataMap["imgScheduled"] = "imgHeader";
            controllerOrderList.getFormModel().setViewAttributeByProperty("segOrderListKA", "widgetDataMap", lclWidgetDataMap);
            //******* ends here

			
			var selectedRecords = formmodel.getViewAttributeByProperty("segOrderViewKA", "selectedRowIndex");
			if(selectedRecords && selectedRecords.length > 1){
				scopeObj.setViewType(selectedRecords[1],"viewType");
			}
			var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
			var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
			var orderFilter = {};
			orderFilter = statusFilterControllerExtension.getFormModelInfo("orderViewFilters");
			scopeObj.setFormModelInfo("orderViewFilters1",utilitiesObj.cloneObject(orderFilter));
			scopeObj.setFormModelInfo("DateFilterIndex1",utilitiesObj.cloneValue(dateFilterControllerExtension.getFormModelInfo("DateFilterIndex")));
			scopeObj.setFormModelInfo("DateFilter1",utilitiesObj.cloneValue(dateFilterControllerExtension.getFormModelInfo("DateFilter")));
			var defaultFilterAppliedFlag = scopeObj.getFormModelInfo("defaultFilterApplied1") ? true : false;
			scopeObj.setFormModelInfo("defaultFilterApplied",defaultFilterAppliedFlag);
			listData =  scopeObj.filterData(listData); 
			var flag = statusFilterControllerExtension.getFormModelInfo("orderViewFilters") ? true : false;
			var flag1 = dateFilterControllerExtension.getFormModelInfo("DateFilter") ? true : false;
			var applyTodayDateFlag = false;
			if (!flag1 && scopeObj.getFormModelInfo("dateFilterApplied")) {
				var toDay = (selectedRecords && selectedRecords.length > 1 && selectedRecords[1] == 0) ? true : false;
				applyTodayDateFlag = scopeObj.setButtonEnabledOnOff(true, toDay);
        	}
		if(selectedRecords && selectedRecords.length > 1){
			scopeObj.setFormModelInfo("defaultFilterApplied",true);
			scopeObj.setFormModelInfo("defaultFilterApplied1",true);
			switch (selectedRecords[1]) {

				case 0:
					controllerExtension.setSegmentListDataKA("btnDay1KA", true,successCallBack,errorCallBack);
					
					function successCallBack(response){
						kony.sdk.mvvm.log.info("successcallback of setSegmentListDataKA function in ordersviews form");
						scopeObj.goToPreviousForm();
					}
					
					function errorCallBack(err){
						kony.sdk.mvvm.log.error("error in calling setSegmentListDataKA function in ordersviews form");
						scopeObj.goToPreviousForm();
					}
					break;

				case 1:
					if(!applyTodayDateFlag){
						formattedData = utilitiesObj.convertDataToGroup(listData, ["orgStatus"]);
						var lclFormattedData = scopeObj.sortFormattedDataByStatus(formattedData);
						controllerOrderList.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
						scopeObj.goToPreviousForm(listData,kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS);
					}
					break;
				case 2:
					if(!applyTodayDateFlag){
						formattedData = utilitiesObj.convertDataToGroup(listData, ["orgPriority"]);
						var lclFormattedData = scopeObj.sortFormattedDataByPriority(formattedData);
						controllerOrderList.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
						scopeObj.goToPreviousForm(listData,kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY);
					}
					break;
				case 3:
					kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
					if(!applyTodayDateFlag){ 
						var succ = function(lclFormattedData){
							controllerOrderList.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
							scopeObj.goToPreviousForm(listData,kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME); 	
							kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
						} 
						scopeObj.getCurrentLocation(listData,succ);  
					}				 							
					break;
				case 4:
					if(!applyTodayDateFlag){
						listData = scopeObj.filterDataForScheduledOrStarted(listData,workOrderStatus.Scheduled);
						formattedData = utilitiesObj.convertDataToGroup(listData, ["orgStatus"]);
						var lclFormattedData = scopeObj.sortFormattedDataByStatus(formattedData);
						controllerOrderList.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
						scopeObj.goToPreviousForm(listData,kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED);
					}
					break;
					
				case 5:
					if(!applyTodayDateFlag){
						listData = scopeObj.filterDataForScheduledOrStarted(listData,workOrderStatus.Started);
						formattedData = utilitiesObj.convertDataToGroup(listData, ["orgStatus"]);
						var lclFormattedData = scopeObj.sortFormattedDataByStatus(formattedData);
						controllerOrderList.getFormModel().setWidgetData("segOrderListKA", lclFormattedData);
						scopeObj.goToPreviousForm(listData,kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED);
					}
					break;

			}          
		  }else if(flag1){	       
			var viewType = scopeObj.getFormModelInfo("viewType1");
			scopeObj.setFormModelInfo("viewType",viewType);   
			scopeObj.applyDateFilter();
			//controllerExtension.setMapPinImage(listData);
			//scopeObj.navigateBack();
		  }else if(flag){
			var viewType = scopeObj.getFormModelInfo("viewType1");
			scopeObj.setFormModelInfo("viewType",viewType);
			scopeObj.navigateBack();
		  }else{	
			var utilitiesObj = utilities.getUtilityObj();
			var msg = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA.alert.viewOrFilter");
			alert(msg);
		  }*/
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatOrderListDataKA : " + err);
        }

    },

    sortFormattedDataByPriority: function(formattedData) {
        try {
            var sortOrder = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.PRIORITY_DISPLAY_ORDER;
            var criticalFormattedData = [];
            var highFormattedData = [];
            var mediumFormattedData = [];
            var lowFormattedData = [];
            var finalFormattedData = [];
            var data;
            for (var i = 0; i < formattedData.length; i++) {
                data = formattedData[i][1][0]["orgPriority"];
                if (data == sortOrder[0]) {
                    criticalFormattedData = formattedData[i];
                } else if (data == sortOrder[1]) {
                    highFormattedData = formattedData[i];
                } else if (data == sortOrder[2]) {
                    mediumFormattedData = formattedData[i];
                } else if (data == sortOrder[3]) {
                    lowFormattedData = formattedData[i];
                }
            }
            if (criticalFormattedData.length > 0) {
                finalFormattedData.push(criticalFormattedData);
            }
            if (highFormattedData.length > 0) {
                finalFormattedData.push(highFormattedData);
            }
            if (mediumFormattedData.length > 0) {
                finalFormattedData.push(mediumFormattedData);
            }
            if (lowFormattedData.length > 0) {
                finalFormattedData.push(lowFormattedData);
            }
            return finalFormattedData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic sortFormattedDataByPriority : " + err);
        }

    },
	sortFormattedDataByNearMe: function(formattedData) {
        try {
            var sortOrder = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.NEAR_ME_DISPLAY_ORDER;
            var firstFormattedData = [];
            var secondFormattedData = [];
            var thirdFormattedData = [];
            var forthFormattedData = [];
            var fifthFormattedData = [];
            var finalFormattedData = [];
            var data;
            for (var i = 0; i < formattedData.length; i++) {
                data = formattedData[i][1][0]["NearMe"];
                if (data == sortOrder[0]) {
                    firstFormattedData = formattedData[i];
                } else if (data == sortOrder[1]) {
                    secondFormattedData = formattedData[i];
                } else if (data == sortOrder[2]) {
                    thirdFormattedData = formattedData[i];
                } else if (data == sortOrder[3]) {
                    forthFormattedData = formattedData[i];
                }else if (data == sortOrder[4]) {
                    fifthFormattedData = formattedData[i];
                }
            }
            if (firstFormattedData.length > 0) {
                finalFormattedData.push(firstFormattedData);
            }
            if (secondFormattedData.length > 0) {
                finalFormattedData.push(secondFormattedData);
            }
            if (thirdFormattedData.length > 0) {
                finalFormattedData.push(thirdFormattedData);
            }
            if (forthFormattedData.length > 0) {
                finalFormattedData.push(forthFormattedData);
            }
            if (fifthFormattedData.length > 0) {
                finalFormattedData.push(fifthFormattedData);
            }
            return finalFormattedData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic sortFormattedDataByNearMe : " + err);
        }

    },
    sortFormattedDataByStatus: function(formattedData) {
        try {
            var sortOrder = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_DISPLAY_ORDER;
            var scheduledFormattedData = [];
            var completedFormattedData = [];
            var rejectedFormattedData = [];
            var statusFormattedData = [];
            var finalFormattedData = [];
            var data;
            for (var i = 0; i < formattedData.length; i++) {
                data = formattedData[i][1][0]["orgStatus"];
                if (data == sortOrder[0]) {
                    scheduledFormattedData = formattedData[i];
                } else if (data == sortOrder[1]) {
                    completedFormattedData = formattedData[i];
                } else if (data == sortOrder[2]) {
                    rejectedFormattedData = formattedData[i];
                } else {
                    statusFormattedData.push(formattedData[i]);
                }
            }
            if (scheduledFormattedData.length > 0) {
                finalFormattedData.push(scheduledFormattedData);
            }
            for (var i = 0; i < statusFormattedData.length; i++) {
                finalFormattedData.push(statusFormattedData[i]);
            }
            if (completedFormattedData.length > 0) {
                finalFormattedData.push(completedFormattedData);
            }
            if (rejectedFormattedData.length > 0) {
                finalFormattedData.push(rejectedFormattedData);
            }
            return finalFormattedData;

        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic sortFormattedDataByStatus : " + err);
        }
    },   
	navigateBack: function(){ 
		this.$class.$superp.showPreviousForm.call(this,true,"frmOrderListKA");
    },
    navigateBackWithoutReload: function(){ 
		kony.servicesapp.date.value = kony.servicesapp.globalOrdersViewsKA.filters.date.value;
		kony.servicesapp.date.text = kony.servicesapp.globalOrdersViewsKA.filters.date.text;
		kony.servicesapp.date.index = kony.servicesapp.globalOrdersViewsKA.filters.date.index;
		kony.servicesapp.status.indices = kony.servicesapp.globalOrdersViewsKA.filters.status.indices;
		kony.servicesapp.status.values = kony.servicesapp.globalOrdersViewsKA.filters.status.values;
		kony.servicesapp.status.formatValues = kony.servicesapp.globalOrdersViewsKA.filters.status.formatValues;
		kony.servicesapp.priorities.indices = kony.servicesapp.globalOrdersViewsKA.filters.priorities.indices;
		kony.servicesapp.priorities.values = kony.servicesapp.globalOrdersViewsKA.filters.priorities.values;
		kony.servicesapp.priorities.formatValues = kony.servicesapp.globalOrdersViewsKA.filters.priorities.formatValues
		this.$class.$superp.showPreviousForm.call(this,false,"frmOrderListKA");
    },
    filterDataForScheduledOrStarted :function(listData,filterBasedOnStatus) {
        try {
            var finalFilteredData = [];
	        for (var i in listData) {
	        	if(listData[i]["orgStatus"] == filterBasedOnStatus){
	        		finalFilteredData.push(listData[i]);
	        	}; 	
	        }
	        return finalFilteredData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic filterDataForScheduledOrStarted : " + err);
        }
    },
    filterData : function(listData){
	    try{
	       var scopeObj = this;
	       var controller = scopeObj.getController();          
           var appContext = controller.getApplicationContext();
	       var flag = scopeObj.getFormModelInfo("orderViewFilters1") ? true : false;
           var selectedFilter = {};     
           var finalFilteredData = [];      
           if(flag && listData){           	
           		selectedFilter = scopeObj.getFormModelInfo("orderViewFilters1");   
           		if(selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS]){          		    
           		    var listOfStatus = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER;
           			var selectedStatusFilter = selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS];
           			listData = scopeObj.getFilteredData(selectedStatusFilter,listOfStatus,"orgStatus",listData);
           		}   
           		if(selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY]){          		    
           		    var listOfPriority = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER;
           			var selectedPriorityFilter = selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY];
           			listData = scopeObj.getFilteredData(selectedPriorityFilter,listOfPriority,"orgPriority",listData);
           		} 
           }
           
	    	return listData;
	    } catch (err) {
	            kony.sdk.mvvm.log.error("error in Blogic filterData : " + err);
	    }
    
    },
    getFilteredData :function(selectedFilter,filterOptions,property,listData){
	    try{
	                    var finalFilteredData = [];
	           			var statusVal = [];
	           			if(selectedFilter.length > 0){
		           			for(var i = 0; i < selectedFilter.length;i++){
		           				statusVal[i] = filterOptions[selectedFilter[i]];
		                    }
		                    
		                    for(var j in listData){	   
		                    	for(var t = 0 ; t < statusVal.length ; t++){
			                    	if(listData[j][property] == statusVal[t]){
							        		finalFilteredData.push(listData[j]);
							        		break;
							        }
		                    	}	
			    					
			    	        }
			    	        return finalFilteredData;
			    	    }else{
			    	    	return listData;
			    	    }
	    }catch (err) {
		            kony.sdk.mvvm.log.error("error in Blogic getFilteredData : " + err);
		}
    
    },
    onRowClickOfSegView: function(contextData) {
    	try{
    		var scopeObj = this;
    		var controller = scopeObj.getController();
		    var formmodel = controller.getFormModel();
		    var appContext = controller.getApplicationContext();
		    var selectedFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
		    var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
			var orderListControllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
			var date = orderListControllerExtension.getFormModelInfo("selectedDate");
			if(date){
				dateFilterControllerExtension.setFormModelInfo("DateApplied",date);
			}
    		scopeObj.setViewType(contextData,"viewType1");
	        selectedFilterControllerExtension.setFormModelInfo("orderViewFilters",null);
	        formmodel.setViewAttributeByProperty("segFilterViewKA", "selectedRowIndices",null);
	       	dateFilterControllerExtension.setFormModelInfo("DateFilter",null);
	        dateFilterControllerExtension.setFormModelInfo("DateFilterIndex",null);
	        //scopeObj.setFilterValue("ALL","");
			scopeObj.setFormModelInfo("defaultFilterApplied1",true);
            scopeObj.selectFilterBasedOnView(contextData);
    	}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic onRowClickOfSegView : " + err);
		}
    
    },
    setViewType : function(contextData,viewType){

    	try{	
    	   var scopeObj = this;
    	   switch (contextData) {

                case 0.0:
                    scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
                    break;

                case 1.0:
                    scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS);
                    break;
                case 2.0:
                    scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY);
                    break;
                case 3.0:
	                   scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME);
                    break;
                case 4.0:
                    scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED);
                    break;
                    
                case 5.0:
                    scopeObj.setFormModelInfo(viewType, kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED);
                    break;

            }
    	}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic setViewType : " + err);
		}
    },
    clearAllFilter :function(){
	    try{	
	    	var scopeObj = this;
    		var controller = scopeObj.getController();
		    var formmodel = controller.getFormModel();
		    var appContext = controller.getApplicationContext();
		    var selectedFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
		    var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
			var orderListControllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
			var date = orderListControllerExtension.getFormModelInfo("selectedDate");
			if(date){
				dateFilterControllerExtension.setFormModelInfo("DateApplied",date);
			}
	        selectedFilterControllerExtension.setFormModelInfo("orderViewFilters",null);
	        formmodel.setViewAttributeByProperty("segFilterViewKA", "selectedRowIndices",null);
	        dateFilterControllerExtension.setFormModelInfo("DateFilter",null);
	        dateFilterControllerExtension.setFormModelInfo("DateFilterIndex",null);
	        scopeObj.reselectView();
	        
	    }catch (err) {
				kony.sdk.mvvm.log.error("error in Blogic clearAllFilter : " + err);
		}  
    },
    reselectView : function(){
    	try{
	    	var scopeObj = this;
	    	var controller = scopeObj.getController();
			var formmodel = controller.getFormModel();
	    	var flag = scopeObj.getFormModelInfo("viewType1") ? true : false;
	    	var viewType;
	    	if(flag){
	    		viewType = scopeObj.getFormModelInfo("viewType1"); 		
	    	}else{
	    		viewType = scopeObj.getFormModelInfo("viewType");
	    	}
	    	var lclSelectedIndex = scopeObj.getIndexOfView(viewType);  
	    	formmodel.setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", lclSelectedIndex);
	    	//scopeObj.setFilterValue("ALL","");
			scopeObj.selectFilterBasedOnView(lclSelectedIndex[1]);
    	}catch (err) {
				kony.sdk.mvvm.log.error("error in Blogic reselectView : " + err);
		}
    },
    getIndexOfView :function(viewType){
	    try{
	    	var lclSelectedIndex = [];
		    switch (viewType) {
		    	case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY:
		        	lclSelectedIndex = [0, 0];
		        	break;
		    	case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS:
		        	lclSelectedIndex = [0, 1];
		           	break;
		        case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY:
		            lclSelectedIndex = [0, 2];
		            break;
		        case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME:
		        	 lclSelectedIndex = [0, 3];
		        	break;
		        case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED:
		            lclSelectedIndex = [0, 4];
		            break;
		        case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED:
		            lclSelectedIndex = [0, 5];
		            break;
		         default:
		            lclSelectedIndex = [0, 0];
		            }
		            return lclSelectedIndex;
	    }catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic getIndexOfView : " + err);
		}
    },
    applyDateFilter : function(){
    
	    try{
	    	var scopeObj = this;
	    	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	    	var controller = appContext.getFormController("frmOrderListKA");
	    	var formmodel = controller.getFormModel();
	    	var dateFilterControllerExtension = scopeObj.getController().getApplicationContext().getFormController("frmDateFilterKA").getControllerExtensionObject();
			var orderListControllerExtension = scopeObj.getController().getApplicationContext().getFormController("frmOrderListKA").getControllerExtensionObject();
			var dateFilterIndex = dateFilterControllerExtension.getFormModelInfo("DateFilterIndex");
			var selectedDate = dateFilterControllerExtension.getFormModelInfo("DateFilter");
			var dateApplied = dateFilterControllerExtension.getFormModelInfo("DateApplied"); 
			orderListControllerExtension.setFormModelInfo("selectedDate",dateApplied); 
			var nextDate;
			if( dateFilterIndex == kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_DATE_FILTER){
			    //selectedDate = selectedDate[2]+"-"+selectedDate[1]+"-"+selectedDate[0];	
				selectedDate = moment(dateApplied,kony.servicesapp.DATE_FORMAT).format("YYYY-MM-DD");				
		    }
		    var lclSelectedDate = convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);	
		    nextDate = moment(convertTimeZone(selectedDate,null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
		   	nextDate = moment(nextDate).subtract(1,"seconds").format(kony.servicesapp.DB_DATE_FORMAT); 
		  
		    var navigationObject = new kony.sdk.mvvm.NavigationObject();
		    navigationObject.setQueryParams("segOrderListKA", {
		        "x": lclSelectedDate,
		        "y": nextDate
		    });	        
		    scopeObj.setFormModelInfo("dateFilterApplied",true);		   
		   	scopeObj.setButtonEnabledOnOff(false,false,selectedDate);
	    	controller.loadDataAndShowForm(navigationObject);
	    }catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic getIndexOfView : " + err);
		}
    
    
    },
    setButtonEnabledOnOff : function(enabledFlag, toDay,selectedDate){
    	try{
    	    var lclDate;
    	    var scopeObj = this;
	    	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	    	var controller = appContext.getFormController("frmOrderListKA");
            var orderListControllerExtension = controller.getControllerExtensionObject();
			var finalDateArray = utilities.getUtilityObj().getWorkingDayListKA();
			var formmodel = controller.getFormModel();
			var applyTodayDateFlag = false;
			var pickListDate; 
			var flag = false;
			if(selectedDate){
			 flag = true;
			 for (var i = 0; i < finalDateArray.length; i++) {
				lclDate = "btnDay" + i + "KA";
				pickListDate = moment((orderListControllerExtension.getFormModelInfo("workingDays"))[i][2]).format("YYYY-MM-DD");
				formmodel.setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
				if(pickListDate == selectedDate){
					formmodel.setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
				}
			 }
			}
			if(!flag){
				for (var j = 0; j < 5; j++) {
					lclDate = "btnDay" + j + "KA";
					formmodel.setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
				}
			}
            if(enabledFlag){
				if(!toDay){
                	orderListControllerExtension.setSegmentListDataKA("btnDay1KA", true);
					applyTodayDateFlag = true;
				}
				scopeObj.setFormModelInfo("dateFilterApplied",false);
            }
			return applyTodayDateFlag;
    	}catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic setButtonEnabledOnOff : " + err);
		}
    
    },
    setSelectedFilterValue : function(){
    	try{  	    
    	    var scopeObj = this;
    	    var controller = scopeObj.getController();
    	    var appContext = controller.getApplicationContext();
    	    var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
        	var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
			var orderListControllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
    	    var flagForStatusOrPriority = scopeObj.getFormModelInfo("orderViewFilters1") ? true : false;
        	var flagForDate = scopeObj.getFormModelInfo("DateFilter1") ? true : false;
            var selectedFilterValues = [];
			var utilitiesObj = utilities.getUtilityObj();
			var filterAppliedFlag = false;
			var filterApplied =  scopeObj.getFormModelInfo("defaultFilterApplied") ? false : true;
            for(var i = 0; i < 3;i++){
		           	selectedFilterValues[i] = "";
		    } 
           if(flagForStatusOrPriority || flagForDate){    
				var moreVal = utilitiesObj.geti18nValueKA("i18n.common.more.filterValueKA");
				var todayVal = utilitiesObj.geti18nValueKA("i18n.common.today.filterValueKA");
				var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA")          	
				var flag1 = scopeObj.getFormModelInfo("orderViewFilters1") ? true : false;
				var selectedFilter = {}; 
				var viewValues = "";				 
		           if(flag1){    
		           		selectedFilter = scopeObj.getFormModelInfo("orderViewFilters1");   
		           		if(selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS]){     
							filterAppliedFlag = true;
		           		    var listOfStatus = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.STATUS_DISPLAY_ORDER;
		           			var selectedStatusFilter = selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS];
		           			viewValues = listOfStatus[selectedStatusFilter[0]].replace(/\s/g, "");
						 	viewValues = "i18n.order.frmStatusFilterKA."+viewValues+".ValueKA";
				   			viewValues = utilitiesObj.geti18nValueKA(viewValues);
		           			selectedFilterValues[1] = viewValues; 
		           			if(selectedStatusFilter.length > 1){
		           				selectedFilterValues[1] = selectedFilterValues[1] + moreVal;
		           			}		           			
		           		}   
		           		if(selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY]){          
							filterAppliedFlag = true;
		           		    var listOfPriority = kony.sdk.mvvm.frmStatusFilterKAControllerExtension.PRIORITY_DISPLAY_ORDER;
		           			var selectedPriorityFilter = selectedFilter[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY];
		           			viewValues = "i18n.order.frmStatusFilterKA."+listOfPriority[selectedPriorityFilter[0]] +".ValueKA";
				   			viewValues = utilitiesObj.geti18nValueKA(viewValues);
		           			selectedFilterValues[2] = viewValues;
		           			if(selectedPriorityFilter.length > 1){
		           				selectedFilterValues[2] = selectedFilterValues[2] + moreVal;
		           			}
		           		} 
		           } 
		           if(scopeObj.getFormModelInfo("DateFilterIndex1")){
						filterAppliedFlag = true;
		                selectedFilterValues[0] = todayVal;
		           		if(scopeObj.getFormModelInfo("DateFilterIndex1") == kony.sdk.mvvm.frmDateFilterKAControllerExtension.SELECTED_DATE_FILTER){
		           			var date = orderListControllerExtension.getFormModelInfo("selectedDate");
							if(date){
								dateFilterControllerExtension.setFormModelInfo("DateApplied",date);
								var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
								selectedFilterValues[0] = moment(date,kony.servicesapp.DATE_FORMAT).format(dateFormat);
								
							}
		           		}
		           }  
           }
		   var viewType = scopeObj.getFormModelInfo("viewType");
		   if(selectedFilterValues[0] == ""){
			   if(viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY){
					selectedFilterValues[0] = todayVal;
			   }else{
					var date = orderListControllerExtension.getFormModelInfo("selectedDate");
					if(date){
						dateFilterControllerExtension.setFormModelInfo("DateApplied",date);
						var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
						selectedFilterValues[0] = moment(date,kony.servicesapp.DATE_FORMAT).format(dateFormat);
						
					}
			   }
		   }
		   
	       return [selectedFilterValues,filterApplied];
    	}catch (err) {
					kony.sdk.mvvm.log.error("error in Blogic setSelectedFilterValue : " + err);
		}
    
    
    },
    setFilterValue : function(index,value,flagApplyView){
    	try{	
    		var scopeObj = this;
	    	var controller = scopeObj.getController();
    	    var appContext = controller.getApplicationContext();
			var formmodel = controller.getFormModel();
 			var selectedIndices = formmodel.getViewAttributeByProperty("segFilterViewKA", "selectedRowIndices");
    		var segFilterData = formmodel.getViewAttributeByProperty("segFilterViewKA", "data");
    	    var uncheckSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN;
		   	var checkSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_CHECKED_SKIN;
			if(segFilterData && segFilterData[0].length > 1){
				var segData = segFilterData[0][1];
				if(index == "ALL"){
					for(var i = 0 ; i<segData.length ; i++){
						segData[i]["lblValueKA"] = value;
						segData[i]["lblTaskKA"] = {text: segData[i]["lblTaskKA"]["text"], centerY : "50%"};	
						segData[i]["selectFilterKA"] = {isVisible : true ,skin : uncheckSkin, text : " " };        
					}
				}else{
					segData[index]["lblValueKA"] = value;
					if(value && value != ""){
						segData[index]["lblTaskKA"] = {text: segData[index]["lblTaskKA"]["text"], centerY : ""};
						segData[index]["selectFilterKA"] = {isVisible : true , skin : checkSkin, text : " " };    
						if(kony.servicesapp.temp.view == "Scheduled" && value == "Scheduled"){
							appContext.getFormController("frmOrdersViewsKA").getFormModel().setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", [0,4]);
						}
						else if(kony.servicesapp.temp.view == "Started" && value == "Started"){
							appContext.getFormController("frmOrdersViewsKA").getFormModel().setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", [0,5]);
						}
						else{
							appContext.getFormController("frmOrdersViewsKA").getFormModel().setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex", null);
						}
						/*var selectedRecords = formmodel.getViewAttributeByProperty("segOrderViewKA", "selectedRowIndex");
						if(selectedRecords && selectedRecords[1]){
			         		scopeObj.setViewType(selectedRecords[1],"viewType1");
			         	}else if(!(scopeObj.getFormModelInfo("viewType1"))){
			         		var viewType = scopeObj.getFormModelInfo("viewType");
			         		scopeObj.setFormModelInfo("viewType1", viewType);
			         	}
			         	if(!flagApplyView){
			         		formmodel.setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex",null);
			         		scopeObj.setFormModelInfo("ViewApplied",null);
			         	}
						*/
			         	
					}else{
						segData[index]["lblTaskKA"] = {text: segData[index]["lblTaskKA"]["text"], centerY : "50%"};
						segData[index]["selectFilterKA"] = {isVisible : true ,text : " ", skin : uncheckSkin};    
					}
				}
				segFilterData[0][1] = segData;
				formmodel.setViewAttributeByProperty("segFilterViewKA", "data",segFilterData);
				formmodel.setViewAttributeByProperty("segFilterViewKA", "selectedRowIndices",selectedIndices);
			}
    	}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic setFilterValue : " + err);
		}
    
    },
    checkUncheckFilter : function(){
    	try{
    		var scopeObj = this;
    		var controller = scopeObj.getController();
    	    var appContext = controller.getApplicationContext();
    		var formmodel = scopeObj.getController().getFormModel();
        	var selRecord = formmodel.getViewAttributeByProperty("segFilterViewKA", "selectedItems")[0];	
			var utilitiesObj = utilities.getUtilityObj();
        	var selectedRecords = formmodel.getViewAttributeByProperty("segFilterViewKA", "selectedRowIndex");	
        	if(selRecord.selectFilterKA.skin == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN){
        		var selectedItem = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.DATE_FILTER_INDEX;
				var filterList = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDER_FILTER;
				var statusVal = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA."+filterList[1]+".ValueKA");
				var priorityVal = utilitiesObj.geti18nValueKA("i18n.order.frmOrdersViewsKA."+filterList[2]+".ValueKA");
				if(selRecord.lblTaskKA.text == statusVal){
					selectedItem = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX;
				}else if(selRecord.lblTaskKA.text == priorityVal){
					selectedItem = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.PRIORITY_FILTER_INDEX;
				}
				scopeObj.showOrderFilterForm(selectedItem);
        	}else{
        		var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
        		var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
        		if(selectedRecords[1] == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.DATE_FILTER_INDEX){      			
        			var segFilterData = formmodel.getViewAttributeByProperty("segFilterViewKA", "data");
					var segData = segFilterData[0][1];
        	        segData[selectedRecords[1]]["lblValueKA"] = "Today";
					formmodel.setViewAttributeByProperty("segFilterViewKA", "data",segFilterData);
					kony.servicesapp.globalOrdersViewsKA.view == "Today";
					formmodel.setViewAttributeByProperty("segOrderViewKA", "selectedRowIndex",[0,0]);
					kony.servicesapp.date.value = "Today";
					kony.servicesapp.date.text = "Today";
					kony.servicesapp.date.index = null;
        		}else{
        			var filterType = (selectedRecords[1] == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX)?kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS:kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY;      			
        			scopeObj.setFormModelInfo("filterType", filterType);        			
        			
					var segFilterData = formmodel.getViewAttributeByProperty("segFilterViewKA", "data");
					var segData = segFilterData[0][1];
        	        var unCheckSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN;
					segData[selectedRecords[1]]["selectFilterKA"] = {isVisible : true ,text : " ", skin : unCheckSkin};    
					segFilterData[0][1] = segData;
					segData[selectedRecords[1]]["lblValueKA"] = "";
					formmodel.setViewAttributeByProperty("segFilterViewKA", "data",segFilterData);
					if(selectedRecords[1] == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX){
						kony.servicesapp.status.values = null;
						kony.servicesapp.status.formatValues = null;
						kony.servicesapp.status.indices = null;
					}
					else if(selectedRecords[1] == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.PRIORITY_FILTER_INDEX){
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.formatValues = null;
						kony.servicesapp.priorities.indices = null;
					}	
        		}       
        		/*var segFilterData = formmodel.getViewAttributeByProperty("segFilterViewKA", "data");
        		var segData = segFilterData[0][1];
        		var flag = true;
        		var checkSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_CHECKED_SKIN;
				for(var i = 0 ; i<segData.length ; i++){	
					if((i != selectedRecords[1]) && segData[i]["selectFilterKA"].skin == checkSkin){
						flag = false;
						break;
					}        
				}
        		if(flag){
        			scopeObj.reselectView();
                }
				*/
        	}
    	}catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic checkUncheckFilter : " + err);
		}
    
    },
    showOrderFilterForm :function(contextData) {
        try {
            var scopeObj = this; 
            var appContext = scopeObj.getController().getApplicationContext();
            var controllerExtensionfrmDateFilterKA = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
            var controllerExtensionfrmStatusFilterKA = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
			switch (contextData) {
	        	case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.DATE_FILTER_INDEX:
				controllerExtensionfrmDateFilterKA.bindData();
				break;
	            case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX:
				scopeObj.setFormModelInfo("filterType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS);
				kony.servicesapp.temp.value="Status";
                controllerExtensionfrmStatusFilterKA.bindData();
				//scopeObj.navigateTo("frmStatusFilterKA", null);
				break;
	            case kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.PRIORITY_FILTER_INDEX:
				scopeObj.setFormModelInfo("filterType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY);
				kony.servicesapp.temp.value="Priority";
                controllerExtensionfrmStatusFilterKA.bindData();
                //scopeObj.navigateTo("frmStatusFilterKA", null);
				break;
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderFilterForm : " + err);
        }
    },
    selectFilterBasedOnView : function(value){
    	try{ 
    		var scopeObj = this;
    		var filterList = [];
    		var controller = scopeObj.getController();
            var formmodel = controller.getFormModel();
            var appContext = controller.getApplicationContext();
			var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
		    var statusFilterIndex = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX;
		    var dateFilterIndex = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.DATE_FILTER_INDEX;
		    var selectedIndex;
		    var utilitiesObj = utilities.getUtilityObj();
		    var controllerOrderList = appContext.getFormController("frmOrderListKA");
            var controllerExtension = controllerOrderList.getControllerExtensionObject();
			var dateFilterControllerExtension = appContext.getFormController("frmDateFilterKA").getControllerExtensionObject();
		    //var dates = dateFilterControllerExtension.getFormModelInfo("DateApplied");
			var lclIndex=1;
			if(kony.servicesapp.date.index != null){
				lclIndex = kony.servicesapp.date.index;
			}
			var utilitiesObj = utilities.getUtilityObj();
			var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
			if(kony.servicesapp.date.text != "Today"){	
				kony.servicesapp.date.value = moment(convertTimeZone(moment((appContext.getFormController("frmOrderListKA").getControllerExtensionObject().getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD")).add(24,"hours");
				kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat);
			}
			var dates = kony.servicesapp.date.value;
			var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
		    if((kony.servicesapp.globalOrdersViewsKA.view == "Today") || (kony.servicesapp.date.value == moment().format("YYYY-MM-DD")))
				dates = kony.servicesapp.date.value;
			kony.servicesapp.date.value = dates;
		    if(dates){
				//dateFilterControllerExtension.setFormModelInfo("DateApplied",date);
		    	dates = moment(dates,kony.servicesapp.DATE_FORMAT).format(dateFormat);
				
		    }
			 kony.servicesapp.date.text = String(dates);
		    switch(value) {
		    	case 0.0:
		    			selectedIndex = [ [0, [dateFilterIndex] ] ];
		    			var todayVal = utilitiesObj.geti18nValueKA("i18n.common.today.filterValueKA");
						kony.servicesapp.status.values = null;
						kony.servicesapp.status.indices = null;
						kony.servicesapp.status.formatValues = null;
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.temp.view = null;
						kony.servicesapp.date.text = "Today";
	            		scopeObj.setFilter(selectedIndex,todayVal);
	            		scopeObj.setFormModelInfo("ViewApplied","Today");
	                    break;	
	            case 1.0:
	            		selectedIndex = [ [0, [dateFilterIndex] ] ];
						kony.servicesapp.status.values = null;
						kony.servicesapp.status.indices = null;
						kony.servicesapp.status.formatValues = null;
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.temp.view = null;
						kony.servicesapp.date.text = dates;
						scopeObj.setFilter(selectedIndex,dates);
	            		scopeObj.setFormModelInfo("ViewApplied","Status");
	                    break;
	            case 2.0:
	            		selectedIndex = [ [0, [dateFilterIndex] ] ];
						kony.servicesapp.status.values = null;
						kony.servicesapp.status.indices = null;
						kony.servicesapp.status.formatValues = null;
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.temp.view = null;
						kony.servicesapp.date.text = dates;
	            		scopeObj.setFilter(selectedIndex,dates);
	            		scopeObj.setFormModelInfo("ViewApplied","Priority");
	                    break;
	            case 3.0:
	            		selectedIndex = [ [0, [dateFilterIndex] ] ];
						kony.servicesapp.status.values = null;
						kony.servicesapp.status.formatValues = null;
						kony.servicesapp.status.indices = null;
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.temp.view = null;
						kony.servicesapp.date.text = dates;
	            		scopeObj.setFilter(selectedIndex,dates);
	            		scopeObj.setFormModelInfo("ViewApplied","NearMe");
	                    break;
	            case 4.0:
	            		selectedIndex = [ [0, [dateFilterIndex,statusFilterIndex] ] ];
						var scheduledVal = utilitiesObj.geti18nValueKA("i18n.order.frmStatusFilterKA.Scheduled.ValueKA");
						kony.servicesapp.status.values = scheduledVal;
						kony.servicesapp.status.formatValues = scheduledVal;
						kony.servicesapp.status.indices = [4];
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.date.text = dates;
						scopeObj.setFilter(selectedIndex,dates,scheduledVal);
	            		scopeObj.setFormModelInfo("ViewApplied","Scheduled");
						kony.servicesapp.temp.view = "Scheduled";
						var orderViewFilters = {};
						orderViewFilters[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS] = [4];
						statusFilterControllerExtension.setFormModelInfo("orderViewFilters",orderViewFilters);
						
	                    break;
	            case 5.0:
	            		selectedIndex = [ [0, [dateFilterIndex,statusFilterIndex] ] ];
						var startedVal = utilitiesObj.geti18nValueKA("i18n.order.frmStatusFilterKA.Started.ValueKA");
	            		kony.servicesapp.status.values = startedVal;
						kony.servicesapp.status.formatValues = startedVal;
						kony.servicesapp.status.indices = [5];
						kony.servicesapp.priorities.values = null;
						kony.servicesapp.priorities.indices = null;
						kony.servicesapp.temp.view = "Started";
						kony.servicesapp.date.text = dates;
						scopeObj.setFilter(selectedIndex,dates,startedVal);
						scopeObj.setFormModelInfo("ViewApplied","Started");
						var orderViewFilters = {};
						orderViewFilters[kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS] = [5];
						statusFilterControllerExtension.setFormModelInfo("orderViewFilters",orderViewFilters);
	                    break;
		}
		    
    	}catch (err) {
			kony.appfoundation.log.error("error in Blogic setScheduledOrStartedFilter : " + err);
		}
    	
    },
    setFilter :function(selectedIndices,date,value){
    	try{
    		var scopeObj = this;
	    	var controller = scopeObj.getController();
			var formmodel = controller.getFormModel();
    		var segFilterData = formmodel.getViewAttributeByProperty("segFilterViewKA", "data");
		   	var checkSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_CHECKED_SKIN;
		   	var uncheckSkin = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.FILTER_UNCHECKED_SKIN;
		   	var dateFilterIndex = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.DATE_FILTER_INDEX;
		   	var statusFilterIndex = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.STATUS_FILTER_INDEX;
		   	var priorityFilterIndex = kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.PRIORITY_FILTER_INDEX;
			if(segFilterData && segFilterData[0].length > 1){
					var segData = segFilterData[0][1];
					if( value == "Scheduled" || value == "Started" ){
						segData[statusFilterIndex]["lblValueKA"] = value;
						segData[statusFilterIndex]["lblTaskKA"] = {text: segData[statusFilterIndex]["lblTaskKA"]["text"], centerY : ""};
						segData[statusFilterIndex]["selectFilterKA"] = {isVisible : true , skin : checkSkin, text : " " };    
					}else{
						segData[statusFilterIndex]["lblValueKA"] = "";
						segData[statusFilterIndex]["lblTaskKA"] = {text: segData[statusFilterIndex]["lblTaskKA"]["text"], centerY : "50%"};
						segData[statusFilterIndex]["selectFilterKA"] = {isVisible : true, text : " ", skin : uncheckSkin};   			
					
					}
					segData[priorityFilterIndex]["lblValueKA"] = "";
					segData[priorityFilterIndex]["lblTaskKA"] = {text: segData[priorityFilterIndex]["lblTaskKA"]["text"], centerY : "50%"};
					segData[priorityFilterIndex]["selectFilterKA"] = {isVisible : true, text : " ", skin : uncheckSkin}; 
					segData[dateFilterIndex]["lblValueKA"] = date;
					segData[dateFilterIndex]["lblTaskKA"] = {text: segData[dateFilterIndex]["lblTaskKA"]["text"], centerY : ""};
					segData[dateFilterIndex]["selectFilterKA"] = {isVisible : true , skin : checkSkin, text : " " };    
				segFilterData[0][1] = segData;
				formmodel.setViewAttributeByProperty("segFilterViewKA", "data",segFilterData);
				formmodel.setViewAttributeByProperty("segFilterViewKA", "selectedRowIndices",selectedIndices);
			}
    	
    	}catch (err) {
			kony.appfoundation.log.error("error in Blogic setFilter : " + err);
		}  
    },
   goToPreviousForm: function(listData,viewType){
		var scopeObj = this;
		var controller = scopeObj.getController();
		var appContext = controller.getApplicationContext();
		var utilitiesObj = utilities.getUtilityObj();
		var statusFilterControllerExtension = appContext.getFormController("frmStatusFilterKA").getControllerExtensionObject();
		var orderListControllerExtension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
		if(listData && viewType){
			for(var i in listData){
				if ((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED)) {
						listData[i]["pinImage"] = utilitiesObj.getstatusMapPinImageKA(listData[i]["orgStatus"]);
				} else {
						listData[i]["pinImage"] = utilitiesObj.getpriorityMapPinImageKA(listData[i]["orgPriority"], viewType);
				}
			}
			orderListControllerExtension.setFormModelInfo("mapData1", listData);
		}
		if(viewType != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED && viewType != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED){
			scopeObj.setFormModelInfo("orderViewFilters1",null);
			statusFilterControllerExtension.setFormModelInfo("orderViewFilters",null);
		}
		scopeObj.navigateBackWithoutReload();
		if(listData && viewType){		
			orderListControllerExtension.setMapDataMap(listData,false);
		}
	},
    getCurrentLocation: function(listData, succ) {
        try {
            var scopeObj = this;
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var controllerOrderList = appContext.getFormController("frmOrderListKA");
            var controllerExtensionOrderList = controllerOrderList.getControllerExtensionObject();
            var utilitiesObj = utilities.getUtilityObj();
            var msg = utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA");
            var outputData = [];
            var gpsSuccess = function(location) {
                controllerExtensionOrderList.setFormModelInfo("currentlocationFlag", true);
                var currentLocations = [];
                var lclFormattedData = [];
                currentLocations.lat = location.coords.latitude;
                currentLocations.lon = location.coords.longitude;
                controllerExtensionOrderList.setFormModelInfo("currentLocations", currentLocations);
                var result = [];
	            for (var i in listData) {
		        	if(listData[i]["lattitude"] && listData[i]["longitude"] && listData[i]["lattitude"] != "" && listData[i]["longitude"] != ""){
	                	result[i] = scopeObj.getOfflineDistanceBetweenLatAndLong(currentLocations.lat,currentLocations.lon,listData[i]["lattitude"] , listData[i]["longitude"]);
	                	listData[i]["NearMe"] = scopeObj.checkGroupForNearMe(result[i]);
	                }
	                if(i == (listData.length - 1)){
	                	var formattedData = [];
	                	formattedData = utilitiesObj.convertDataToGroup(listData, ["NearMe"]);
	                	lclFormattedData = scopeObj.sortFormattedDataByNearMe(formattedData);
	                }
	            }
	            succ(lclFormattedData);
            }
            var gpsFailure = function(err) {
                alert(msg);
                kony.print("gpsFailure() ---------> START");
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
               succ([]);
            }
			var positionoptions = {timeout:kony.servicesapp.MAP_GPS_TIMEOUT,
								   enableHighAccuracy : true};
            kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getCurrentLocation : " + err);
        }

    },
    getOnlineDistanceBetweenLatAndLong :	function(lat1, lon1,lat2,lon2) {
    	try{
    			var url = "http://maps.googleapis.com/maps/api/distancematrix/json?";
		        var orglatlongstr = lat1+ "," + lon1;
		        var destlatlongstr = lat2+ "," + lon2;
				var queryparams = "origins=" + orglatlongstr + "&" + "destinations=" + destlatlongstr;
		        var finalurl = url + queryparams;
		        var httpReq = new kony.net.HttpRequest();
		        var res = false;
		        httpReq.onReadyStateChange = function() {
			    	if (this.readyState == constants.HTTP_READY_STATE_DONE) {
			       		var response = httpReq.response;
			            var resultObj = {};
			            var status = response && response["status"];
			            if (status === "OK") {
			           		res = response["rows"][0]["elements"][0]["distance"]["value"];
			            } else if (status === "INVALID_REQUEST") {
			                alert("INVALID_REQUEST");
			            } else if (status === "MAX_ELEMENTS_EXCEEDED") {
			                alert("MAX_ELEMENTS_EXCEEDED");
			            } else if (status === "OVER_QUERY_LIMIT") {
			                alert("OVER_QUERY_LIMIT");
			            } else if (status === "REQUEST_DENIED") {
			                alert("REQUEST_DENIED");
			            } else if (status === "UNKNOWN_ERROR") {
			                alert("UNKNOWN_ERROR");
			           	}
			         }
		       };
		       finalurl = encodeURI(finalurl);
		       httpReq.open(constants.HTTP_METHOD_GET, finalurl); // true for asynchronous 
		       httpReq.send();
		       return res;
 	
        }catch (err) {
			kony.appfoundation.log.error("error in Blogic getOnlineDistanceBetweenLatAndLong : " + err);
		} 
    },
    getOfflineDistanceBetweenLatAndLong : function(lat1, lon1, lat2, lon2) {
    	try{
                //this should be always the lat and long values other we might expect undefined behaviour
                var scopeObj = this;
                var R = 6371; // Radius of the earth in km
                var dLat = scopeObj.degreeToRadian(lat2 - lat1); // deg2rad below
                var dLon = scopeObj.degreeToRadian(lon2 - lon1);
                var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(scopeObj.degreeToRadian(lat1)) * Math.cos(scopeObj.degreeToRadian(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c * 0.621371; // Distance in miles
                return d;
          
        }catch (err) {
			kony.appfoundation.log.error("error in Blogic getOfflineDistanceBetweenLatAndLong : " + err);
		}
    },
    
    degreeToRadian : function(degrees){
	    try{
	    	return degrees * Math.PI / 180;
	    }catch (err) {
			kony.appfoundation.log.error("error in Blogic degreeToRadian : " + err);
		}
    },
    checkGroupForNearMe : function(value){
    	try{
    		var res = "";
    		if(value <= 2){
    			res = "1Group";
    		}else if(value > 2 && value <= 5){
    			res = "2Group";
    		}else if(value >5 && value <= 10){
    			res = "3Group";
    		}else if(value > 10 && value <= 20){
    			res = "4Group";
    		}else if(value > 20){
    			res = "5Group";
    		}
    		return res;
    	}catch (err) {
			kony.appfoundation.log.error("error in Blogic checkGroupForNearMe : " + err);
		}
    
    
    }
});
