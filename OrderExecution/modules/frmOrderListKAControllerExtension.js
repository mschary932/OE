/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmOrderListKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmOrderListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {	
    constructor: function(controllerObj) {
		var scopeObj = this;
        scopeObj.$class.$super.call(scopeObj, controllerObj);
        scopeObj.setFormModelInfo("isCalendarSet", false);
        scopeObj.controllerExtensionGen = undefined;
    },
    fetchData: function() {
        try {
			var scopeObj = this;
            if (!scopeObj.getFormModelInfo("isCalendarSet")) {
                scopeObj.setOrderListCalendarKA();
				var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
				if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
					frmOrderListKA.mapMyOrderListKA.calloutTemplate["flxCalloutTempKA"]["onTouchStart"] = scopeObj.navigateToOrderExecutioniPhone;
				}else{
					frmOrderListKA.mapMyOrderListKA.onSelection = scopeObj.navigateToOrderExecution;
				}
            }
			function onPinClickCallBack(mapid,locationdata) {
				scopeObj.setFormModelInfo("mapCalloutData",locationdata);
			}
			frmOrderListKA.mapMyOrderListKA.onPinClick = onPinClickCallBack;
			scopeObj.$class.$superp.fetchData.call(scopeObj);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch data : " + error);
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
	//Binding data to segment
    bindData: function(dataMap) { 
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
			var formmodel = controller.getFormModel();	
			var segData = dataMap["segOrderListKA"];
			var ordeViewscontrollerExtension = controller.getApplicationContext().getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject();
			var processedSegData = [];		
			var utilitiesObj = utilities.getUtilityObj();						
			processedSegData = scopeObj.formatData(segData, scopeObj, kony.servicesapp.globalOrdersViewsKA.view );
			scopeObj.setFormModelInfo("segData", processedSegData);
			processedSegData = ordeViewscontrollerExtension.filterData(processedSegData);
			scopeObj.setFormModelInfo("mapData1", processedSegData);
			var groupByHeader = false;
			if ((kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS) || (kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.PRIORITY)) {
				var lclViewType = (kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS) ? "orgStatus" : "orgPriority";
				var lclProcessSegData = utilitiesObj.convertDataToGroup(processedSegData, [lclViewType]);
				if (kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS) {
					processedSegData = ordeViewscontrollerExtension.sortFormattedDataByStatus(lclProcessSegData);
				}
				if (kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.PRIORITY) {
					processedSegData = ordeViewscontrollerExtension.sortFormattedDataByPriority(lclProcessSegData);
				}
				groupByHeader = true;
			}else if (kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Scheduled || kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Started )	{
				if(!ordeViewscontrollerExtension.getFormModelInfo("orderViewFilters1") && !ordeViewscontrollerExtension.getFormModelInfo("dateFilterApplied")){
					var filterBasedOnStatus = (kony.servicesapp.globalOrdersViewsKA.view == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED) ? kony.servicesapp.servicesStatus.key.Scheduled : kony.servicesapp.servicesStatus.key.Started;
					processedSegData = ordeViewscontrollerExtension.filterDataForScheduledOrStarted(processedSegData,filterBasedOnStatus);
					scopeObj.setFormModelInfo("mapData1", processedSegData);
				}
				processedSegData = ordeViewscontrollerExtension.sortFormattedDataByStatus(utilitiesObj.convertDataToGroup(processedSegData, ["orgStatus"]));
				groupByHeader = true;
			}else if ((kony.servicesapp.globalOrdersViewsKA.view == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME)) {
				kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
				var succ = function(lclFormattedData){
					processedSegData = lclFormattedData;
					var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segOrderListKA", "widgetDataMap");
					lclWidgetDataMap["lblscheduledKA"] = kony.servicesapp.LBL_HEADER;
					lclWidgetDataMap["imgScheduled"] = kony.servicesapp.IMG_HEADER;
					formmodel.setViewAttributeByProperty("segOrderListKA", "widgetDataMap", lclWidgetDataMap);
					dataMap["segOrderListKA"] = {};
					dataMap["segOrderListKA"]["segOrderListKA"] = processedSegData;           
					scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
					scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"), false);
					formmodel.showView();
					kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
				};
				ordeViewscontrollerExtension.getCurrentLocation(processedSegData,succ);
			}			
			if((kony.servicesapp.globalOrdersViewsKA.view != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME)){
				if(groupByHeader){
					//********** code need to be removed after UIRT_V2 supports segment header mapping starts here
					var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segOrderListKA", "widgetDataMap");
					lclWidgetDataMap["lblscheduledKA"] = kony.servicesapp.LBL_HEADER;
					lclWidgetDataMap["imgScheduled"] = kony.servicesapp.IMG_HEADER;
					formmodel.setViewAttributeByProperty("segOrderListKA", "widgetDataMap", lclWidgetDataMap);
					//******* ends here	
				}
				dataMap["segOrderListKA"] = {};
				dataMap["segOrderListKA"]["segOrderListKA"] = processedSegData;      
				scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"), false);
				kony.application.dismissLoadingScreen();
				scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
				formmodel.showView();
			}
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },
    fetchMasterData: function(successcallback, errorcallback) {
		try {
			this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
		} catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetchMasterData : " + error);
        }
    },
    fetchMasterDataForWidget: function(widgetId, successcallback, errorcallback) {
        try {
            this.$class.$superp.fetchMasterDataForWidget.call(this, widgetId, successcallback, errorcallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic fetch metadata : " + error);
        }
    },
    saveRecord: function(recordObject, onSuccess, onError) {
        try {
            this.$class.$superp.saveRecord.call(this, recordObject, onSuccess, onError);
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
    saveData: function(successCallback, errorCallback) {
        try {
            this.$class.$superp.saveData.call(this, successCallback, errorCallback);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic save data : " + error);
        }
    },
    deleteData: function() {
        try {
            this.$class.$superp.deleteData.call(this);
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic delete data : " + error);
        }
    },
    performAction: function(actionName, argsArray) {
        try {
            return this.$class.$superp.performAction.call(this, actionName, argsArray);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic perform action : " + err);
        }
    },
    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },
	//Populating working dates and days to Calender buttons
    setOrderListCalendarKA: function() { 
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
			var utilityObj = utilities.getUtilityObj();
            var finalDateArray = utilityObj.getWorkingDayListKA();
            var lclDay = "";
            var lclDate = "";            
            scopeObj.setFormModelInfo("isCalendarSet", true);
            scopeObj.setFormModelInfo("workingDays", finalDateArray);
            formModel.setViewAttributeByProperty("btnDay1KA", "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
			var finalDateArrayLength = finalDateArray.length;
            for (var i = 0; i < finalDateArrayLength; i++) {
                lclDay = "lblDay" + i + "KA";
                lclDate = "btnDay" + i + "KA";
                formModel.setViewAttributeByProperty(lclDate, "text", finalDateArray[i][0]);
                formModel.setViewAttributeByProperty(lclDay, "text", utilityObj.geti18nValueKA("i18n.order.frmOrderListKA.lbl"+finalDateArray[i][1]+"KA.ValueKA"));
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setOrderListCalendarKA : " + err);
        }
    },    
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },
	//setting the data in the segment
    setSegmentListDataKA: function(contextData, flag, successCallBack,errorCallBack) { 
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
			var dateFormat = utilities.getUtilityObj().geti18nValueKA("i18n.common.dateFormat.filterValueKA");		
            if (!flag) {
				scopeObj.setFormModelInfo("bounds", controller.getFormModel().performActionOnView("mapMyOrderListKA", "getBounds", null));
			}
            scopeObj.setCalendarSkinKA(contextData);	           
            var lclIndex = contextData.charAt(6);
			kony.servicesapp.date.index = lclIndex;
            var navigationObject = controller.getContextData();
            var lclCurrentDate = convertTimeZone(moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format(kony.servicesapp.DATE_FORMAT),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
            var nextDate = moment(convertTimeZone(moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format(kony.servicesapp.DATE_FORMAT),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DATE_FORMAT_WITH_TIME)).add(24,"hours");
            nextDate = moment(nextDate).subtract(1,"seconds").format(kony.servicesapp.DB_DATE_FORMAT);
			if(kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.TODAY && lclIndex != 1){
				scopeObj.displayDates(lclIndex, dateFormat);
			}else if(lclIndex == 1){
				scopeObj.lclIndexIsOne();
			}
			if(kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS) {
				navigationObject = scopeObj.navigationObjectForStatus(navigationObject, lclCurrentDate, nextDate);
			}else if(kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.PRIORITY){
				navigationObject = scopeObj.navigationObjectForPriority(navigationObject, lclCurrentDate, nextDate);
			}else if(kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.NEAR_ME){
				navigationObject = scopeObj.navigationObjectForNearMe(navigationObject, lclCurrentDate, nextDate);
			}	
			if(kony.servicesapp.status.values ==  null && kony.servicesapp.priorities.values == null){		
				navigationObject = scopeObj.navigationObjectPriorityStatusNull(navigationObject, lclCurrentDate, nextDate);
			}else if(kony.servicesapp.status.values != null && kony.servicesapp.priorities.values != null){
				navigationObject = scopeObj.navigationObjectWithPriorityStatus(navigationObject, lclCurrentDate, nextDate);
			}else if(kony.servicesapp.status.values != null){
				navigationObject = scopeObj.navigationObjectWithStatusNotNull(navigationObject, lclCurrentDate, nextDate);
			}else if(kony.servicesapp.priorities.values != null){
				navigationObject = scopeObj.navigationObjectWithPriorityNotNull(navigationObject, lclCurrentDate, nextDate);
			}
			kony.servicesapp.temp.fromDate = false;
			kony.servicesapp.date.value = moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format(kony.servicesapp.DATE_FORMAT);
			kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat); 		
			kony.servicesapp.globalOrdersViewsKA.filters.date.value = kony.servicesapp.date.value;
			kony.servicesapp.globalOrdersViewsKA.filters.date.text = kony.servicesapp.date.text;
            scopeObj.setFormModelInfo("selectedDate", moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format(kony.servicesapp.DATE_FORMAT));
            scopeObj.fetchData();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setSegmentListDataKA : " + err);
        }
    },
	//navigation object when priority abd status are null
	navigationObjectPriorityStatusNull: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + " and WorkOrder.Status_id != 'Pending' " + kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA", query, "sql");
			navigationObject.setQueryParams("segOrderListKA", {
				"x": lclCurrentDate,
				"y": nextDate
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectPriorityStatusNull : " + err);
        }
	},
	//navigation object when priority is not null
	navigationObjectWithPriorityNotNull: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var selectedPriorities = kony.servicesapp.priorities.values.split(",");
			var selectedPrioritiesQueries = "";
			var selectedPrioritiesLength = selectedPriorities.length;
			for( var i = 0; i < selectedPrioritiesLength; i++ ){
				selectedPrioritiesQueries = selectedPrioritiesQueries + "'" + selectedPriorities[i] + "'";
				if(i!= (selectedPriorities.length-1 )){
					selectedPrioritiesQueries = selectedPrioritiesQueries + ",";
				}
			}
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Priority in {z}"+ kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA",query,"sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"z": "(" + selectedPrioritiesQueries +")"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectWithPriorityNotNull : " + err);
        }
	},
	//navigation object when status is not null
	navigationObjectWithStatusNotNull: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var selectedStatus = kony.servicesapp.status.values.split(",");
			var selectedStatusQueries = "";
			var selectedStatusLength = selectedStatus.length;
			for( var i = 0; i < selectedStatusLength; i++ ){
				selectedStatusQueries = selectedStatusQueries + "'" + selectedStatus[i] + "'";
				if(i!= (selectedStatusLength-1 )){
					selectedStatusQueries = selectedStatusQueries + ",";
				}
			}
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id in {z}"+ kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA", query, "sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"z": "(" + selectedStatusQueries +")"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectWithStatusNotNull : " + err);
        }
	},
	//navigation object if priority and status are not selected
	navigationObjectWithPriorityStatus: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var selectedStatus = kony.servicesapp.status.values.split(",");
			var selectedStatusQueries = "";
			var selectedStatusLength = selectedStatus.length;
			for( var i = 0; i < selectedStatusLength; i++ ){
				selectedStatusQueries = selectedStatusQueries + "'" + selectedStatus[i] + "'";
				if(i!= (selectedStatusLength-1 )){
					selectedStatusQueries = selectedStatusQueries + ",";
				}
			}
			var selectedPriorities = kony.servicesapp.priorities.values.split(",");
			var selectedPrioritiesQueries = "";
			var selectedPrioritiesLength = selectedPriorities.length;
			for( var i = 0; i < selectedPrioritiesLength; i++ ){
				selectedPrioritiesQueries = selectedPrioritiesQueries + "'" + selectedPriorities[i] + "'";
				if(i!= (selectedPrioritiesLength-1 )){
					selectedPrioritiesQueries = selectedPrioritiesQueries + ",";
				}
			}
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id in {za} and Priority in {zb}"+kony.servicesapp.ORDERLIST_WITH_ASC;					
			navigationObject.setQuery("segOrderListKA", query, "sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"za": "(" + selectedStatusQueries +")",
				"zb": "(" + selectedPrioritiesQueries +")"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectWithPriorityStatus : " + err);
        }
	},
	//Navigation object when near ne view is selected
	navigationObjectForNearMe: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA", query, "sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"z": "Pending"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectForNearMe : " + err);
        }
	},
	//Navigation object when priority view is selected
	navigationObjectForPriority: function(navigationObject, lclCurrentDate, nextDate) {
		try {
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA",query,"sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"z": "Pending"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectForPriority : " + err);
        }
	},
	//Navigation object when status view is selected
	navigationObjectForStatus: function(navigationObject, lclCurrentDate, nextDate) {	
		try {
			var query = kony.servicesapp.ORDERLIST_WITH_FILTERS_QUERY + "and Status_id != '{z}'"+ kony.servicesapp.ORDERLIST_WITH_ASC;
			navigationObject.setQuery("segOrderListKA", query, "sql");
			navigationObject.setQueryParams("segOrderListKA", {  
				"x": lclCurrentDate,
				"y": nextDate,
				"z": "Pending"
			});
			return navigationObject;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigationObjectForStatus : " + err);
        }
	},
	//when lclIndex is 1
	lclIndexIsOne: function() {
		try {
			if(kony.servicesapp.globalOrdersViewsKA.view === null)
				kony.servicesapp.globalOrdersViewsKA.view = kony.servicesapp.TODAY;
			kony.servicesapp.date.value = kony.servicesapp.TODAY;
			kony.servicesapp.date.text = kony.servicesapp.TODAY;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic lclIndexIsOne : " + err);
        }
	},
	//setting the dates in the view
	displayDates: function(lclIndex, dateFormat) {
		try {
			kony.servicesapp.globalOrdersViewsKA.view = null;
			if(lclIndex == 0)
				kony.servicesapp.date.value = moment().subtract(1,"days").format(kony.servicesapp.DATE_FORMAT);
			else if(lclIndex == 2)
				kony.servicesapp.date.value = moment().add(1,"days").format(kony.servicesapp.DATE_FORMAT);
			else if(lclIndex == 3)
				kony.servicesapp.date.value = moment().add(2,"days").format(kony.servicesapp.DATE_FORMAT);
			else if(lclIndex == 4)
				kony.servicesapp.date.value = moment().add(3,"days").format(kony.servicesapp.DATE_FORMAT);
			kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat);
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic displayDates : " + err);
        }
	},
	//Assinging skin to calender button
    setCalendarSkinKA: function(contextData) { 
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var lclDate = "";
            var orderViewControllerExtension = scopeObj.getController().getApplicationContext().getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject();
			var NO_OF_DAYS = kony.servicesapp.NO_OF_DAYS;
            for (var i = 0; i < NO_OF_DAYS; i++) {
                lclDate = "btnDay" + i + "KA";
                formModel.setViewAttributeByProperty(lclDate, "skin", kony.servicesapp.CALENDAR_BUTTON_NORMAL_SKIN);
                formModel.performActionOnView(lclDate, "setEnabled", [true]);
            }
            if (contextData != "btnDay1KA" && orderViewControllerExtension.getFormModelInfo("viewType") == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY) {
                orderViewControllerExtension.setFormModelInfo("viewType", "");
            }else if (contextData == "btnDay1KA" && orderViewControllerExtension.getFormModelInfo("viewType") == "") {
                orderViewControllerExtension.setFormModelInfo("viewType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
            }
            formModel.setViewAttributeByProperty(contextData, "skin", kony.servicesapp.CALENDAR_BUTTON_FOCUS_SKIN);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setCalendarSkinKA : " + err);
        }
    },
	//On click of List button in OrderList form
    actionForList: function() {
		try {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexListKA", "top", "0%");
			formModel.setViewAttributeByProperty("flexListKA", "height", "76%");
			formModel.setViewAttributeByProperty("segOrderListKA", "isVisible", true);
			formModel.setViewAttributeByProperty("mapMyOrderListKA", "isVisible", false);
			formModel.setViewAttributeByProperty("btnCurrenLocation", "isVisible", false); 
			formModel.setViewAttributeByProperty("btnListOrderKA", "skin", kony.servicesapp.TAB_FOCUS_SKIN);
			formModel.setViewAttributeByProperty("btnMapShowKA", "skin", kony.servicesapp.TAB_NORMAL_SKIN);
			var bound = scopeObj.getController().getFormModel().performActionOnView("mapMyOrderListKA", "getBounds", null);
			scopeObj.setFormModelInfo("bounds", bound);
		} catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic actionForList : " + err);
		}
    },
    //On click of map button in OrderList form
    actionForMap: function() {
		try {
			var scopeObj = this;
			var formModel = scopeObj.getController().getFormModel();
			formModel.setViewAttributeByProperty("flexListKA", "top", "-18%");
			formModel.setViewAttributeByProperty("flexListKA", "height", "94%");
			formModel.setViewAttributeByProperty("mapMyOrderListKA", "isVisible", true);
			formModel.setViewAttributeByProperty("segOrderListKA", "isVisible", false);
			formModel.setViewAttributeByProperty("btnCurrenLocation", "isVisible", true);               
			formModel.setViewAttributeByProperty("btnMapShowKA", "skin", kony.servicesapp.TAB_FOCUS_SKIN);
			formModel.setViewAttributeByProperty("btnListOrderKA", "skin", kony.servicesapp.TAB_NORMAL_SKIN);
			scopeObj.getCurrentLocation(false);
		} catch (err) {
			kony.sdk.mvvm.log.error("error in Blogic actionForList : " + err);
		}
    },
	//form post show
    orderListPostShow: function() {
        try {
            var scopeObj = this;
            var isEmpty = utilities.getUtilityObj().isObjectEmpty(scopeObj.getFormModelInfo("bounds"));
            if (!isEmpty) {
                var bounds = scopeObj.getFormModelInfo("bounds");
				var boundsFlag = bounds ? ( bounds.center ? (bounds.center.lat ? true : false) : false ) : false;
                if (boundsFlag && (bounds.center.lat) && (bounds.center.lon) && bounds.center.lat != 0 && bounds.center.lon != 0) {
                    scopeObj.setMapBounds(bounds);
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic orderListPostShow : " + err);
        }
    },
	//Reseting the map pin data
    resetMapPinData: function() {
        try {
            var scopeObj = this;
            if (scopeObj.getFormModelInfo("focusPinApplied")) {
                var formModel = scopeObj.getController().getFormModel();
                scopeObj.setFormModelInfo("focusPinApplied", false);
				if(scopeObj.getFormModelInfo("mapData") instanceof Array && scopeObj.getFormModelInfo("mapData").length>0){
					formModel.setViewAttributeByProperty("mapMyOrderListKA", "locationData", scopeObj.getFormModelInfo("mapData"));
				}
				var bounds = scopeObj.getController().getFormModel().performActionOnView("mapMyOrderListKA", "getBounds", null);
				scopeObj.setFormModelInfo("bounds", bounds);
				var boundsFlag = bounds ? ( bounds.center ? (bounds.center.lat ? true : false) : false ) : false;
				if (boundsFlag &&  (bounds.center.lat) && (bounds.center.lon) && bounds.center.lat != 0 && bounds.center.lon != 0) {
					scopeObj.setMapBounds(bounds);
				}
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic orderListPostShow : " + err);
        }
    },
	//Dissplaying the list view
    showOrderListView: function() {
        try {
			var scopeObj = this;
			var controller = scopeObj.getController();
            scopeObj.setFormModelInfo("bounds", controller.getFormModel().performActionOnView("mapMyOrderListKA", "getBounds", null));
            controller.getApplicationContext().getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject().bindData();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderListView : " + err);
        }
    },
	//Setting the image of the map pin
    setMapPinImage: function(segData) {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var groupByHeader = scopeObj.getController().getApplicationContext().getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject().getFormModelInfo("viewType");            
            for (var i in segData) {
                segData[i]["pinImage"] = (groupByHeader == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS) ? utilitiesObj.getstatusMapPinImageKA(segData[i]["orgStatus"]) : utilitiesObj.getpriorityMapPinImageKA(segData[i]["orgPriority"], groupByHeader);
            }
            if ((groupByHeader != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY)) {
                scopeObj.setMapDataMap(segData,false);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setMapPinImage : " + err);
        }
    },
	//To get the current location
    getCurrentLocation: function(flag) {
        try {
            var scopeObj = this;
            var gpsSuccess = function(location) {
                scopeObj.setFormModelInfo("currentlocationFlag", true);
                var currentLocations = [];
                currentLocations.lat = location.coords.latitude;
                currentLocations.lon = location.coords.longitude;
                scopeObj.setFormModelInfo("currentLocations", currentLocations);
                scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"),flag);
            };
            var gpsFailure = function(err) {
                if (!scopeObj.getFormModelInfo("EnableGPS")) {
                    alert(utilities.getUtilityObj().geti18nValueKA("i18n.common.map.enableGPS.ValueKA"));
                    scopeObj.setFormModelInfo("EnableGPS", true);
                }
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            };
			var positionoptions = {timeout:kony.servicesapp.MAP_GPS_TIMEOUT, enableHighAccuracy : true};
            kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getCurrentLocation : " + err);
        }
    },
	//For setting the datamap of Map
    setMapDataMap: function(processedSegData,flag) {
        try {
            var scopeObj = this;
            var locationData = "";
			var formModel = scopeObj.getController().getFormModel();
			var mapLocationOrderList = [];
			var index = -1;
			var data = {
				lblTimeKA: "key2",
				imgStatusMachineStartedKA: "key3",
				lblStatusKA: "key4",
				imgPriorityMapKA: "key5",
				lblPriorityKA: "key6",
				lblInfoKA: "key7",
				img1KA: "key8"
			};
			formModel.setViewAttributeByProperty("mapMyOrderListKA", "widgetDataMapForCallout", data);
			if (scopeObj.getFormModelInfo("currentlocationFlag")) {
				index = 0;
				var currentLocations = scopeObj.getFormModelInfo("currentLocations");
				currentLocation = {
					id: index,
					lat: currentLocations.lat,
					lon: currentLocations.lon,
					name: kony.servicesapp.MAP_CURRENT_LOCATION_DESC,
					desc: kony.servicesapp.MAP_CURRENT_LOCATION_DESC,
					image: kony.servicesapp.MAP_DIRECTION_IMAGE,
					meta: {
						color: "blue",
						label: "A"
					},
					showcallout: false
				};
				mapLocationOrderList.push(currentLocation);
			}
			if (processedSegData) {
                for (var i in processedSegData) {
                    if (processedSegData[i]["lattitude"] && processedSegData[i]["longitude"] && processedSegData[i]["lattitude"] != "" && processedSegData[i]["longitude"] != "") {
                        locationData = "locationData" + i;
                        ++index;
                        locationData = {
                            id: index,
                            lat: processedSegData[i]["lattitude"],
                            lon: processedSegData[i]["longitude"],
                            name: processedSegData[i]["id"],
                            desc: processedSegData[i]["id"],
                            image: processedSegData[i]["pinImage"],
                            showcallout: true,
                            calloutData: {
                                "key2": processedSegData[i]["PlannedStartDate"],
                                "key3": processedSegData[i]["StatusImage"],
                                "key4": processedSegData[i]["Status_id"],
                                "key5": processedSegData[i]["PriorityImageMap"],
                                "key6": processedSegData[i]["Priority"],
                                "key7": processedSegData[i]["MapDescription"],
                                "key8": kony.servicesapp.MAP_CALLOUT_DOWN_ARROW_IMAGE,
                                template: flxOrderList
                            }
                        };
                        mapLocationOrderList.push(locationData);
                    }
                }
			}
			scopeObj.setFormModelInfo("mapData", mapLocationOrderList);
			if(mapLocationOrderList instanceof Array && mapLocationOrderList.length > 0){
				formModel.setViewAttributeByProperty("mapMyOrderListKA", "locationData", mapLocationOrderList);
			}           
			if(!flag){
				var isEmpty = utilities.getUtilityObj().isObjectEmpty(scopeObj.getFormModelInfo("bounds"));
				if (!isEmpty) {
					var bounds = scopeObj.getFormModelInfo("bounds");
					var boundsFlag = bounds ? ( bounds.center ? (bounds.center.lat ? true : false) : false ) : false;
					if (boundsFlag && (bounds.center.lat) && (bounds.center.lon) && bounds.center.lat != 0 && bounds.center.lon != 0) {
						scopeObj.setMapBounds(bounds);
					}
				}
			}
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setMapDataMap : " + err);
        }
    },
	//To change the imge of the pin, where "id" is the id of the pin whose image has to be changed 
    changePinImage: function(id) {
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
            var viewType = controller.getApplicationContext().getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject().getFormModelInfo("viewType");
            var formModel = controller.getFormModel();
			if(scopeObj.getFormModelInfo("mapData") instanceof Array && scopeObj.getFormModelInfo("mapData").length>0){
				formModel.setViewAttributeByProperty("mapMyOrderListKA", "locationData", scopeObj.getFormModelInfo("mapData"));
			}
            var utilitiesObj = utilities.getUtilityObj();
            var locationDataVal = formModel.getViewAttributeByProperty("mapMyOrderListKA", "locationData");
            var flag = locationDataVal[id] ? true : false;
            var flag1 = flag ? (locationDataVal[id].image ? true : false) : false;
            if (flag1 && locationDataVal[id].image != kony.servicesapp.MAP_DIRECTION_IMAGE) {
                scopeObj.setFormModelInfo("focusPinApplied", true);
                var groupByStatusFlag = false;
				if (((kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS)|| kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Scheduled || kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Started)) {
					groupByStatusFlag = true;
				}
                locationDataVal[id].image = (groupByStatusFlag == true) ? utilitiesObj.getstatusMapPinImageFocusKA(locationDataVal[id]["calloutData"]["key4"]) : utilitiesObj.getPriorityOrTodayMapPinImageFocusKA();
                if (id != 0) {
                    var firstElement = locationDataVal[0];
                    locationDataVal[0] = locationDataVal[id];
                    locationDataVal[id] = firstElement;
                }
				if(locationDataVal instanceof Array && locationDataVal.length>0){
					formModel.setViewAttributeByProperty("mapMyOrderListKA", "locationData", locationDataVal);
				}
                formModel.performActionOnView("mapMyOrderListKA", "navigateToLocation", [locationDataVal[0], true, true]);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changePinImage : " + err);
        }
	},
	//navigating to Order Execution form with data
    showOrderExecutionForm: function(selectedId,statusId) { 
        try {
            var scopeObj = this;
			var datamodel = new kony.sdk.mvvm.DataModel();
            var utilitiesObj = utilities.getUtilityObj();
			if(selectedId == null){
				var selRecord = scopeObj.getController().getFormModel().getViewAttributeByProperty("segOrderListKA", "selectedItems")[0];
				selectedId = selRecord.id;
				if(selRecord.Status_id){
					statusId = selRecord.Status_id.text ? selRecord.Status_id.text : selRecord.Status_id;
				}				
			}
            datamodel.setPrimaryKeyValueMap({"id":selectedId});
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			var rejectedVal = utilitiesObj.geti18nValueKA("i18n.common.rejectedValueKA");
            if(statusId && rejectedVal && statusId.toLowerCase() == rejectedVal.toLowerCase()){
            	alert(utilitiesObj.geti18nValueKA("i18n.order.RejectedRecordAccessError.ValueKA"));
            	return;
            }            
            navigationObject.setQueryParams("segDetailsKA", {
                "x": selectedId
            });
            navigationObject.setQueryParams("FlxTmpOrderListKA", {
                "y": selectedId
            });
            navigationObject.setQueryParams("FlxTmpWorkOrderMaterialKA", {
                "z": selectedId
            });
            navigationObject.addCustomInfo("WorkOrderId", selectedId);
            scopeObj.navigateTo(kony.servicesapp.FRMORDEREXECUTIONKA, navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderExecutionForm : " + err);
        }
    },
    formatData: function(segData, scopeObj, viewType) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var processedRowObj = {};
            var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("MONTHANDDATE");
			var finalAddress = "";
            for (var i in segData) {
                processedRowObj = {};                
                processedRowObj = scopeObj.assignToProcessedRowObj(processedRowObj, segData, finalAddress, utilitiesObj, i, timeFormat);				
                if (((kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.STATUS)|| kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Scheduled || kony.servicesapp.globalOrdersViewsKA.view == kony.servicesapp.servicesStatus.key.Started)) {
                    processedRowObj["pinImage"] = utilitiesObj.getstatusMapPinImageKA(processedRowObj["orgStatus"]);
                } else {
                    processedRowObj["pinImage"] = utilitiesObj.getpriorityMapPinImageKA(processedRowObj["orgPriority"], viewType);
                }			
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatData : " + err);
        }
    },
	//Assigning values to processedRowObj
	assignToProcessedRowObj: function(processedRowObj, segData, finalAddress, utilitiesObj, i, timeFormat) {
		try {
			processedRowObj["PlannedStartDate"] = convertTimeZone(moment(segData[i]["PlannedStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);				
			processedRowObj["orgPriority"] = segData[i]["Priority"];		
			processedRowObj["Priority"] = processedRowObj["orgPriority"] ? utilitiesObj.getPriorityTextKA(processedRowObj["orgPriority"]) : "";			
			
            processedRowObj["PriorityImage"]= {
			   "skin": utilitiesObj.getPrioritySkinKA(processedRowObj["orgPriority"])
			};
           priorityVal = segData[i]["Priority"];
		   processedRowObj["PriorityImageMap"] = utilitiesObj.getPriorityImageKA(priorityVal);
           
            processedRowObj["StatusImage"] = utilitiesObj.getStatusImageKA(segData[i]["Status_id"]);			
			processedRowObj["MapDescription"] = (utilitiesObj.dataTruncation(segData[i]["Description"], kony.servicesapp.MAP_DESCRIPTION_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...")).value;
			processedRowObj["Description"] = (utilitiesObj.dataTruncation(segData[i]["Description"], kony.servicesapp.DESCRIPTION_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...")).value; 			
			finalAddress = "";			
			if(segData[i]["Address"] && segData[i]["Address"][0]) {
				finalAddress = utilitiesObj.getOrderAddress(segData[i]["Address"][0]);				
				processedRowObj["Address_id"] = finalAddress ? (utilitiesObj.dataTruncation(finalAddress, kony.servicesapp.ADDRESS_LENGTH, kony.servicesapp.NO_OF_DOTS_AFTERTRUNCATION, "...")).value : " ";
				processedRowObj["lattitude"] = segData[i]["Address"][0]["Latitude"] ? segData[i]["Address"][0]["Latitude"] : "";				
				processedRowObj["longitude"] = segData[i]["Address"][0]["Longitude"] ? segData[i]["Address"][0]["Longitude"] : "";				
			} else{
				processedRowObj["Address_id"] = "";				
				processedRowObj["lattitude"] = "";				
				processedRowObj["longitude"] = "";
			}
			processedRowObj["orgStatus"] = segData[i]["Status_id"];			
			processedRowObj["Status_id"] = processedRowObj["orgStatus"] ? utilitiesObj.getStatusTextKA(processedRowObj["orgStatus"]) : "";			
			processedRowObj["Code"] = segData[i]["Code"];			
			processedRowObj["id"] = segData[i]["id"];			
			processedRowObj["Type_id"] = segData[i]["Type_id"];
			return processedRowObj;
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic assignToProcessedRowObj : " + err);
        }
	},
	//Set the map bounds
    setMapBounds: function(bound) {
        try {
            var locationData = {
                lat: bound.center.lat,
                lon: bound.center.lon,
                name: "1",
                desc: "1"
            };
            this.getController().getFormModel().performActionOnView("mapMyOrderListKA", "navigateToLocation", [locationData, false, false]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setMapBounds : " + err);
        }
    },
	//navigaation to order execution
	navigateToOrderExecution: function(mapid,locationdata) {
        try {
			var orderListControllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDERLISTKA).getControllerExtensionObject();
			if(locationdata && locationdata.name && locationdata.calloutData){
				orderListControllerExtension.showOrderExecutionForm(locationdata.name,locationdata.calloutData.key4)
			}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToOrderExecution : " + err);
        }
    },
	//navigation to order execution if iPhone
	navigateToOrderExecutioniPhone: function() {
        try {					
			var orderListControllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDERLISTKA).getControllerExtensionObject();
			var mapCalloutData = orderListControllerExtension.getFormModelInfo("mapCalloutData") ? orderListControllerExtension.getFormModelInfo("mapCalloutData") : false;
			if(mapCalloutData && mapCalloutData.name && mapCalloutData.calloutData){
				orderListControllerExtension.showOrderExecutionForm(mapCalloutData.name,mapCalloutData.calloutData.key4);
			}				
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToOrderExecution1 : " + err);
        }
    },
	//On back button of android
	deviceBackForAndroidOrderList : function() {
		try{
			var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
			var mapSkin = formModel.getViewAttributeByProperty("btnMapShowKA", "skin");
			if(hamburgerMenu.IS_MENU_SHOWN){
				 new hamburgerMenu().execute();
			}else if(mapSkin == kony.servicesapp.TAB_FOCUS_SKIN){
				scopeObj.actionForList();
			}
		} catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic deviceBackForAndroidOrderList : " + err);
        }		
	}
});