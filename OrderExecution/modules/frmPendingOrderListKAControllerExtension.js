
/** 
 *	In this class, developer can change/override the existing methods or can create new methods if required
 */
/*
 * bussiness/orchestration/mediation logic class for frmPendingOrderListKA.
 */
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmPendingOrderListKAControllerExtension = Class(kony.sdk.mvvm.CustomFormControllerExtensionMF, {

    $statics: {
        CALENDAR_BUTTON_NORMAL_SKIN: "sknBtnFFFFFFClanProNews24KA",
        CALENDAR_BUTTON_FOCUS_SKIN: "sknBtnE4E8ECBorder1C3F64Font456484KA",
        ORDERLIST_DATABASE_DATEFORMAT: "YYYY-MM-DD",
        TAB_NORMAL_SKIN: "sknBtnFF5D6EClanProNews28BackgroundFFFFFFKA",
        TAB_FOCUS_SKIN: "sknBtnFFFFFFClanProNews28BackgroundFF5D6EKA",
        MAP_CURRENT_LOCATION_IMAGE: "current_location.png",
        MAP_NAVIGATION_IMAGE: "notification_map_navigation.png",
        MAP_CALLOUT_DOWN_ARROW_IMAGE: "map_down_arrow.png",
        MAP_CURRENT_LOCATION_DESC: "Current Location",
        NO_OF_DAYS: 3,
        DESCRIPTION_LENGTH: 42,
        MAP_DESCRIPTION_LENGTH: 25,
        ADDRESS_LENGTH: 46,
        NO_OF_DOTS_AFTERTRUNCATION: 3,
		DATE_FORMAT: "YYYY-MM-DD", 
		MAP_GPS_TIMEOUT : 15000
    },

    constructor: function(controllerObj) {
        this.$class.$super.call(this,controllerObj);
        this.setFormModelInfo("isCalendarSet", false);
        this.controllerExtensionGen = undefined;
    },

    fetchData: function() {
        try {
            if (!this.getFormModelInfo("isCalendarSet")) {
                this.setPendingOrderListCalendarKA();
				/*var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
				if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
					frmPendingOrderListKA.mapPendingOrderListKA.calloutTemplate["flxCalloutTempKA"]["onTouchStart"] = this.navigateToOrderExecution1;
				}else{
					frmPendingOrderListKA.mapPendingOrderListKA.onSelection = this.navigateToOrderExecution;
				}*/
            }
			function onPinClickCallBack(mapid,locationdata){
				var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
				var formController = INSTANCE.getFormController("frmPendingOrderListKA");
				var orderListControllerExtension = formController.getControllerExtensionObject();
				orderListControllerExtension.setFormModelInfo("mapCalloutData",locationdata);
			}
			frmPendingOrderListKA.mapPendingOrderListKA.onPinClick = onPinClickCallBack;
			if( Object.keys(kony.servicesapp.swipedIndices).length > 0){
				var animObj = kony.servicesapp.getEndStateTransAnimDefinition("-25%","0%",true);
				animObj["callbacks"] = {
					"animationEnd":function(){ 
						var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
						var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
						kony.servicesapp.rowreset=true;
						kony.servicesapp.swipedIndices={};
						kony.servicesapp.coords=[];
						kony.servicesapp.isAnimationInProgress=false;
						//return controller.$class.$superp.fetchData.call(controller);
					}
				}
				frmPendingOrderListKA.segPendingOrderListKA.animateRows({
					rows: [{
						sectionIndex: kony.servicesapp.swipedIndices["secIndex"],
						rowIndex: kony.servicesapp.swipedIndices["rowIndex"]
					}],
					widgets: ["flxPendingOrdListKA"],
					animation: animObj
				});
			}else if(kony.servicesapp.isAnimationInProgress && kony.application.getCurrentForm().id == "frmPendingOrderListKA"){
				return;
			}else{
				this.$class.$superp.fetchData.call(this);
			}
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

    bindData: function(dataMap) { //binding data to segment
        try {
            var scopeObj = this;
			var controller = scopeObj.getController();
			var contextData = controller.getContextData(); 
			var formmodel = controller.getFormModel();	
			var segData = dataMap["segPendingOrderListKA"];
			var appContext = controller.getApplicationContext();
			var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
			var viewType = ordeViewscontrollerExtension.ORDERLIST_VIEWTYPE_TODAY;
			var processedSegData = [];		
			var utilitiesObj = utilities.getUtilityObj();
          	scopeObj.actionForList();
          	var successCallBackKA = function (currentPosition){
              	processedSegData = scopeObj.formatData(segData, scopeObj, viewType, currentPosition);
              	dataMap["segPendingOrderListKA"] = {};
				dataMap["segPendingOrderListKA"]["segPendingOrderListKA"] = processedSegData;  
              	kony.application.dismissLoadingScreen();
				scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
				formmodel.showView();
            };
          	scopeObj.getCurrentLocation(processedSegData,successCallBackKA);
			/*if(contextData.getCustomInfo("fromPendingOrders")){
				
			}else{				
				var orderListFormController = appContext.getFormController("frmPendingOrderListKA");				
				var bindDataObj;
				var viewType = ordeViewscontrollerExtension.getFormModelInfo("viewType");
				formmodel.setViewAttributeByProperty("lblMyOrdersKA", "text", utilitiesObj.geti18nValueKA("i18n.order.frmPendingOrderListKA.lblMyOrdersHeaderKA.ValueKA"));
				formmodel.setViewAttributeByProperty("flxListMapBtnContainerKA", "isVisible", true);
				formmodel.setViewAttributeByProperty("flxListMapBtnContainerKA", "height", 36);
				formmodel.setViewAttributeByProperty("btnViewFilterKA", "isVisible", true);
				formmodel.setViewAttributeByProperty("lblDay0KA", "isVisible", true);
				formmodel.setViewAttributeByProperty("lblDay4KA", "isVisible", true);
				formmodel.setViewAttributeByProperty("btnDay0KA", "isVisible", true);
				formmodel.setViewAttributeByProperty("btnDay4KA", "isVisible", true);
				//formmodel.performActionOnView("mapPendingOrderListKA", "clear", []);
				processedSegData = scopeObj.formatData(segData, scopeObj, viewType);
				scopeObj.setFormModelInfo("segData", processedSegData);
				processedSegData = ordeViewscontrollerExtension.filterData(processedSegData);
				scopeObj.setFormModelInfo("mapData1", processedSegData);
				var groupByHeader = false;
				if ((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS) || (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY)) {
					var lclViewType = (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS) ? "orgStatus" : "orgPriority";
					var lclProcessSegData = utilitiesObj.convertDataToGroup(processedSegData, [lclViewType]);
					if (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS) {
						processedSegData = ordeViewscontrollerExtension.sortFormattedDataByStatus(lclProcessSegData);
					}
					if (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_PRIORITY) {
						processedSegData = ordeViewscontrollerExtension.sortFormattedDataByPriority(lclProcessSegData);
					}
					groupByHeader = true;
				}else if((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED) || (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED)){
					var filterFlag = ordeViewscontrollerExtension.getFormModelInfo("orderViewFilters1") ? true : false;
					var dateFilterFlag = ordeViewscontrollerExtension.getFormModelInfo("dateFilterApplied");
					if(!filterFlag && !dateFilterFlag){
						var workOrderStatus = kony.servicesapp.servicesStatus.key;
						var filterBasedOnStatus = (viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED) ? workOrderStatus.Scheduled : workOrderStatus.Started;
						processedSegData = ordeViewscontrollerExtension.filterDataForScheduledOrStarted(processedSegData,filterBasedOnStatus);
						//scopeObj.setFormModelInfo("segData", processedSegData);
						scopeObj.setFormModelInfo("mapData1", processedSegData);
					}
					var lclProcessSegData = utilitiesObj.convertDataToGroup(processedSegData, ["orgStatus"]);
					processedSegData = ordeViewscontrollerExtension.sortFormattedDataByStatus(lclProcessSegData);
					groupByHeader = true;
				}else if ((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME)) {
					kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
					var succ = function(lclFormattedData){
							processedSegData = lclFormattedData;
							var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segPendingOrderListKA", "widgetDataMap");
							lclWidgetDataMap["lblscheduledKA"] = "lblHeader";
							lclWidgetDataMap["imgScheduled"] = "imgHeader";
							formmodel.setViewAttributeByProperty("segPendingOrderListKA", "widgetDataMap", lclWidgetDataMap);
							dataMap["segPendingOrderListKA"] = {};
							dataMap["segPendingOrderListKA"]["segPendingOrderListKA"] = processedSegData;           
							scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
							scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"), false);
							formmodel.showView();
							kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
					}
					ordeViewscontrollerExtension.getCurrentLocation(processedSegData,succ);
				}
				
				if((viewType != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_NEARME)){
				
					if(groupByHeader){
						//********** code need to be removed after UIRT_V2 supports segment header mapping starts here
						var lclWidgetDataMap = formmodel.getViewAttributeByProperty("segPendingOrderListKA", "widgetDataMap");
						lclWidgetDataMap["lblscheduledKA"] = "lblHeader";
						lclWidgetDataMap["imgScheduled"] = "imgHeader";
						formmodel.setViewAttributeByProperty("segPendingOrderListKA", "widgetDataMap", lclWidgetDataMap);
						//******* ends here
		
					}
					dataMap["segPendingOrderListKA"] = {};
					dataMap["segPendingOrderListKA"]["segPendingOrderListKA"] = processedSegData;      
					scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"), false);
					kony.application.dismissLoadingScreen();
					scopeObj.$class.$superp.bindData.call(scopeObj,dataMap);
					formmodel.showView();
				}
			}*/
        } catch (error) {
            kony.sdk.mvvm.log.error("Error in Blogic bind data : " + error);
        }
    },

    fetchMasterData: function(successcallback, errorcallback) {
        this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
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

    showPreviousForm: function(doReload) {
        //this.$class.$superp.showPreviousForm.call(this, doReload);
    },

    navigateTo: function(formId, navObject) {
        this.$class.$superp.navigateTo.call(this, formId, navObject);
    },

    setPendingOrderListCalendarKA: function() { //Populating working dates and days to Calender buttons
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var finalDateArray = utilities.getUtilityObj().getPendingDayListKA();
            var lclDay = "";
            var lclDate = "";
            var utilityObj =utilities.getUtilityObj();
            scopeObj.setFormModelInfo("isCalendarSet", true);
            scopeObj.setFormModelInfo("workingDays", finalDateArray);
            formModel.setViewAttributeByProperty("btnDay0KA", "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.CALENDAR_BUTTON_FOCUS_SKIN);
            for (var i = 0; i < finalDateArray.length; i++) {
                lclDay = "lblDay" + i + "KA";
                lclDate = "btnDay" + i + "KA";
                formModel.setViewAttributeByProperty(lclDate, "text", finalDateArray[i][0]);
                formModel.setViewAttributeByProperty(lclDay, "text", utilityObj.geti18nValueKA("i18n.order.frmOrderListKA.lbl"+finalDateArray[i][1]+"KA.ValueKA"));
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setPendingOrderListCalendarKA : " + err);
        }
    },
    
    performFetchFormData: function(serviceName, options, successcallback, errorcallback) {
        try {
            this.$class.$superp.performFetchFormData.call(this, serviceName, options, successcallback, errorcallback);
        } catch (error) {
            kony.appfoundation.log.error("Error in Blogic perform fetch and bind data : " + error);
        }
    },

    setSegmentListDataKA: function(contextData, flag,successCallBack,errorCallBack) { //on click of calender button
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var getBoundFlag = flag ? false : true;
            if (getBoundFlag) {
                var bounds = {};
                bounds = scopeObj.getController().getFormModel().performActionOnView("mapPendingOrderListKA", "getBounds", null);
                scopeObj.setFormModelInfo("bounds", bounds);
            }
            scopeObj.setCalendarSkinKA(contextData);
            var lclIndex = contextData.charAt(6);
            var navigationObject = scopeObj.getController().getContextData();
            var lclCurrentDate = convertTimeZone(moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
            var nextDate = moment(convertTimeZone(moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"),null,kony.servicesapp.remoteTimeZone,"YYYY-MM-DD HH:mm:ss")).add(24,"hours");
            nextDate = moment(nextDate).subtract(1,"seconds").format(kony.servicesapp.DB_DATE_FORMAT);
            navigationObject.setQueryParams("segPendingOrderListKA", {
                "x": lclCurrentDate,
                "y": nextDate
            });
            scopeObj.setFormModelInfo("selectedDate", moment((scopeObj.getFormModelInfo("workingDays"))[lclIndex][2]).format("YYYY-MM-DD"));
            scopeObj.fetchData();
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setSegmentListDataKA : " + err);
        }

    },

    setCalendarSkinKA: function(contextData) { //Assinging skin to calender button
        try {
            var scopeObj = this;
            var formModel = this.getController().getFormModel();
            var lclDate = "";
            var orderViewControllerExtension = scopeObj.getController().getApplicationContext().getFormController("frmOrdersViewsKA").getControllerExtensionObject();
            for (var i = 0; i < kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.NO_OF_DAYS; i++) {
                lclDate = "btnDay" + i + "KA";
                formModel.setViewAttributeByProperty(lclDate, "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.CALENDAR_BUTTON_NORMAL_SKIN);
                formModel.performActionOnView(lclDate, "setEnabled", [true]);
            }
            if (contextData != "btnDay0KA" && orderViewControllerExtension.getFormModelInfo("viewType") == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY) {
                orderViewControllerExtension.setFormModelInfo("viewType", "");
            } else if (contextData == "btnDay0KA" && orderViewControllerExtension.getFormModelInfo("viewType") == "") {
                orderViewControllerExtension.setFormModelInfo("viewType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
            }
            formModel.setViewAttributeByProperty(contextData, "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.CALENDAR_BUTTON_FOCUS_SKIN);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setCalendarSkinKA : " + err);
        }

    },

    actionForList: function() //On click of List button in OrderList form
        {
            try {
                var scopeObj = this;
                var formModel = scopeObj.getController().getFormModel();
				formModel.setViewAttributeByProperty("flexListKA", "top", "0%");
                formModel.setViewAttributeByProperty("flexListKA", "height", "83%");
                formModel.setViewAttributeByProperty("segPendingOrderListKA", "isVisible", true);
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "isVisible", false);
                formModel.setViewAttributeByProperty("btnCurrenLocation", "isVisible", false); 
                formModel.setViewAttributeByProperty("btnListOrderKA", "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.TAB_FOCUS_SKIN);
                formModel.setViewAttributeByProperty("btnMapShowKA", "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.TAB_NORMAL_SKIN);               
                var bound = {};
                bound = this.getController().getFormModel().performActionOnView("mapPendingOrderListKA", "getBounds", null);
                this.setFormModelInfo("bounds", bound);
            } catch (err) {
                kony.sdk.mvvm.log.error("error in Blogic actionForList : " + err);
            }

        },

    actionForMap: function() //On click of map button in OrderList form
        {
            try {
                var scopeObj = this;
                var formModel = scopeObj.getController().getFormModel();
				formModel.setViewAttributeByProperty("flexListKA", "top", "-10%");
                formModel.setViewAttributeByProperty("flexListKA", "height", "93%");
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "isVisible", true);
                formModel.setViewAttributeByProperty("segPendingOrderListKA", "isVisible", false);
                formModel.setViewAttributeByProperty("btnCurrenLocation", "isVisible", true);               
                formModel.setViewAttributeByProperty("btnMapShowKA", "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.TAB_FOCUS_SKIN);
                formModel.setViewAttributeByProperty("btnListOrderKA", "skin", kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.TAB_NORMAL_SKIN);                
                scopeObj.getCurrentLocation(false);
            } catch (err) {
                kony.sdk.mvvm.log.error("error in Blogic actionForList : " + err);
            }

        },

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
    resetMapPinData: function() {
        try {
            var scopeObj = this;
            var flag = scopeObj.getFormModelInfo("focusPinApplied");
            flag = flag ? true : false;
            if (flag) {
                var formModel = scopeObj.getController().getFormModel();
                scopeObj.setFormModelInfo("focusPinApplied", false);
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "locationData", scopeObj.getFormModelInfo("mapData"));
                var bounds = this.getController().getFormModel().performActionOnView("mapPendingOrderListKA", "getBounds", null);
                this.setFormModelInfo("bounds", bounds);
				var boundsFlag = bounds ? ( bounds.center ? (bounds.center.lat ? true : false) : false ) : false;
                if (boundsFlag &&  (bounds.center.lat) && (bounds.center.lon) && bounds.center.lat != 0 && bounds.center.lon != 0) {
                    scopeObj.setMapBounds(bounds);
                }
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic orderListPostShow : " + err);
        }

    },
    showOrderListView: function() {
        try {
			var scopeObj = this;
            var bound = {};
            bound = scopeObj.getController().getFormModel().performActionOnView("mapPendingOrderListKA", "getBounds", null);
            scopeObj.setFormModelInfo("bounds", bound);
            var appContext = scopeObj.getController().getApplicationContext();
            var controllerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
			//controllerExtension.setFormModelInfo("viewType1",null);
            controllerExtension.bindData();

        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderListView : " + err);
        }
    },
    setMapPinImage: function(segData) {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var controller = scopeObj.getController();
            var appContext = controller.getApplicationContext();
            var ordeViewscontrollerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
            var groupByHeader = ordeViewscontrollerExtension.getFormModelInfo("viewType");
            
            for (var i in segData) {

                segData[i]["pinImage"] = (groupByHeader == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS) ? utilitiesObj.getstatusMapPinImageKA(segData[i]["orgStatus"]) : utilitiesObj.getpriorityMapPinImageKA(segData[i]["orgPriority"], groupByHeader);

            }
            if ((groupByHeader != kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY)) {
                this.setMapDataMap(segData,false);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setMapPinImage : " + err);
        }
    },
    getCurrentLocation: function(flag, callBackKA) {
        try {
            var scopeObj = this;
            var utilitiesObj = utilities.getUtilityObj();
            var msg = utilitiesObj.geti18nValueKA("i18n.common.map.enableGPS.ValueKA");
            var gpsSuccess = function(location) {
                /*scopeObj.setFormModelInfo("currentlocationFlag", true);
                var currentLocations = [];
                currentLocations.lat = location.coords.latitude;
                currentLocations.lon = location.coords.longitude;*/
              	callBackKA({lat : location.coords.latitude ,lon : location.coords.longitude});
                /*scopeObj.setFormModelInfo("currentLocations", currentLocations);
                scopeObj.setMapDataMap(scopeObj.getFormModelInfo("mapData1"),flag);*/
            }
            var gpsFailure = function(err) {
              	callBackKA(null);
                /*var flag = scopeObj.getFormModelInfo("EnableGPS");
                flag = flag ? true : false;
                if (!flag) {
                    alert(msg);
                    scopeObj.setFormModelInfo("EnableGPS", true);
                }
                kony.print("gpsFailure() ---------> START");
                kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();*/
            }
			var positionoptions = {timeout:kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_GPS_TIMEOUT,
								   enableHighAccuracy : true};
            kony.location.getCurrentPosition(gpsSuccess, gpsFailure,positionoptions);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic getCurrentLocation : " + err);
        }

    },
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
                    imgPriorityKA: "key5",
                    lblPriorityKA: "key6",
                    lblInfoKA: "key7",
                    img1KA: "key8"
                };
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "widgetDataMapForCallout", data);
                if (scopeObj.getFormModelInfo("currentlocationFlag")) {
                    index = 0;
                    var currentLocations = scopeObj.getFormModelInfo("currentLocations");
                    var currentLat = currentLocations.lat;
                    var currentLon = currentLocations.lon;
                    currentLocation = {
                        id: index,
                        lat: currentLat,
                        lon: currentLon,
                        name: kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_CURRENT_LOCATION_DESC,
                        desc: kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_CURRENT_LOCATION_DESC,
                        image: kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_CURRENT_LOCATION_IMAGE,
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
                                "key5": processedSegData[i]["PriorityImage"],
                                "key6": processedSegData[i]["Priority"],
                                "key7": processedSegData[i]["MapDescription"],
                                "key8": kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_CALLOUT_DOWN_ARROW_IMAGE,
                                template: flxOrderList
                            }
                        };
                        mapLocationOrderList.push(locationData);
                    }

                }
			}
                this.setFormModelInfo("mapData", mapLocationOrderList);
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "locationData", mapLocationOrderList);
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
    changePinImage: function(id) {
        try {
            var scopeObj = this;
            var appContext = scopeObj.getController().getApplicationContext();
            var controllerExtension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
            var viewType = controllerExtension.getFormModelInfo("viewType");
            var formModel = scopeObj.getController().getFormModel();
            formModel.setViewAttributeByProperty("mapPendingOrderListKA", "locationData", scopeObj.getFormModelInfo("mapData"));
            var utilitiesObj = utilities.getUtilityObj();
            var locationDataVal = formModel.getViewAttributeByProperty("mapPendingOrderListKA", "locationData");
            var flag = locationDataVal[id] ? true : false;
            var flag1 = flag ? (locationDataVal[id].image ? true : false) : false;
            if (flag1 && locationDataVal[id].image != kony.sdk.mvvm.frmPendingOrderListKAControllerExtension.MAP_CURRENT_LOCATION_IMAGE) {
                scopeObj.setFormModelInfo("focusPinApplied", true);
                var status = locationDataVal[id]["calloutData"]["key4"];
                var groupByStatusFlag = false;
                 if ((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED)) {
                 	groupByStatusFlag = true;
                 }
                locationDataVal[id].image = (groupByStatusFlag == true) ? utilitiesObj.getstatusMapPinImageFocusKA(status) : utilitiesObj.getPriorityOrTodayMapPinImageFocusKA();
                if (id != 0) {
                    var firstElement = locationDataVal[0];
                    locationDataVal[0] = locationDataVal[id];
                    locationDataVal[id] = firstElement;
                }
                formModel.setViewAttributeByProperty("mapPendingOrderListKA", "locationData", locationDataVal);
                formModel.performActionOnView("mapPendingOrderListKA", "navigateToLocation", [locationDataVal[0], true, true]);
            }
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic changePinImage : " + err);
        }


    },
    showOrderExecutionForm: function(selectedId,statusId) { //navigating to Order Execution form with data
        try {
            var formmodel = this.getController().getFormModel();
            var datamodel = new kony.sdk.mvvm.DataModel();
            var utilitiesObj = utilities.getUtilityObj();
			if(selectedId == null){
				var selRecord = formmodel.getViewAttributeByProperty("segPendingOrderListKA", "selectedItems")[0];
				selectedId = selRecord.id;
				if(selRecord.Status_id){
					statusId = selRecord.Status_id.text ? selRecord.Status_id.text : selRecord.Status_id;
				}				
			}
            var obj = {"id":selectedId};
            datamodel.setPrimaryKeyValueMap(obj);
            var navigationObject = new kony.sdk.mvvm.NavigationObject();
            navigationObject.setDataModel(datamodel, kony.sdk.mvvm.OperationType.FILTER_BY_PRIMARY_KEY, "form");
			var rejectedVal = utilitiesObj.geti18nValueKA("i18n.common.rejectedValueKA");
            if(statusId && rejectedVal && statusId.toLowerCase() == rejectedVal.toLowerCase()){
            	var rejectedRecordError = utilitiesObj.geti18nValueKA("i18n.order.RejectedRecordAccessError.ValueKA");
            	alert(rejectedRecordError);
            	return;
            }            
            navigationObject.setQueryParams("segDetailsKA", {
                "x": selectedId
            });
            navigationObject.setQueryParams("flxOrderListKA", {
                "y": selectedId
            });
            navigationObject.setQueryParams("flxWorkOrderMaterialKA", {
                "z": selectedId
            });
            navigationObject.addCustomInfo("WorkOrderId", selectedId);
            this.navigateTo("frmOrderExecutionKA", navigationObject);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic showOrderExecutionForm : " + err);
        }

    },

    formatData: function(segData, scopeObj, viewType, currentPosition) {
        try {
            var utilitiesObj = utilities.getUtilityObj();
            var processedSegData = [];
            var processedRowObj = {};
            //var timeFormat = utilitiesObj.geti18nValueKA("i18n.common.HHMMFormatKA");TIMEHOURSANDMIN
			var timeFormat = kony.servicesapp.constants.getServiceConstantsObj().getDateTimeFormat("TIMEHOURSANDMIN");
          	var destinationLoc;
            for (var i in segData) {
                processedRowObj = {};                
                processedRowObj["PlannedStartDate"] = convertTimeZone(moment(segData[i]["PlannedStartDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
				processedRowObj["PlannedEndDate"] = convertTimeZone(moment(segData[i]["PlannedEndDate"],kony.servicesapp.DB_DATE_FORMAT).format(),kony.servicesapp.remoteTimeZone,null,timeFormat);
				processedRowObj["PlannedStartDate"] = processedRowObj["PlannedStartDate"] + " - " + processedRowObj["PlannedEndDate"];
				processedRowObj["ORDER_TYPE"] = segData[i]["ORDER_TYPE"] ? segData[i]["ORDER_TYPE"] : "";
				processedRowObj["OBJECT_TYPE"] = segData[i]["OBJECT_TYPE"] ? segData[i]["OBJECT_TYPE"] : "";
                processedRowObj["orgPriority"] = segData[i]["Priority"] ? segData[i]["Priority"] : "";
                processedRowObj["Priority"] = processedRowObj["orgPriority"] ? utilitiesObj.getPriorityTextKA(processedRowObj["orgPriority"]) : "";
                processedRowObj["PriorityImage"] = utilitiesObj.getPriorityImageKA(processedRowObj["orgPriority"]);
                processedRowObj["MapDescription"] = segData[i]["Description"];  
                processedRowObj["Description"] = processedRowObj["MapDescription"];
				if(segData[i]["Address_id"]){
                  	processedRowObj["Address_id"] = utilitiesObj.getOrderAddress(segData[i]);
                  	processedRowObj["lattitude"] = segData[i]["Latitude"]? segData[i]["Latitude"] : "";
                  	processedRowObj["longitude"] = segData[i]["Longitude"] ? segData[i]["Longitude"] : "";
                }else{
                  	processedRowObj["Address_id"] = "";
                  	processedRowObj["lattitude"] = "";
                  	processedRowObj["longitude"] = "";
                }
				processedRowObj["orgStatus"] = (segData[i]["Status_id"] == kony.servicesapp.SCHEDULED) ? kony.servicesapp.REQUESTED : segData[i]["Status_id"];
				processedRowObj["StatusImage"] = utilitiesObj.getStatusImageKA(processedRowObj["orgStatus"]);
                processedRowObj["Status_id"] = processedRowObj["orgStatus"] ? utilitiesObj.getStatusTextKA(processedRowObj["orgStatus"]) : "";
                processedRowObj["Code"] = segData[i]["Code"];
                processedRowObj["id"] = segData[i]["id"];
                if ((viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STATUS || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_SCHEDULED || viewType == kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_STARTED)) {
                    processedRowObj["pinImage"] = utilitiesObj.getstatusMapPinImageKA(processedRowObj["orgStatus"]);
                } else {
                    processedRowObj["pinImage"] = utilitiesObj.getpriorityMapPinImageKA(processedRowObj["orgPriority"], viewType);
                }
				if(segData[i]["Status_id"].toUpperCase() == "PENDING"){
					processedRowObj["metaInfo"] = {
						editMode: constants.SEGUI_EDIT_MODE_DELETE,
						editModeCustomConfig: [{
							title: utilitiesObj.geti18nValueKA("i18n.frmOrderListKA.btnAcceptKA"),
							backgroundColor: "ff5d6e",
							callback: kony.servicesapp.pendingOrderAcceptCallbackKA
						}]
					}
				}
              	destinationLoc = {lat : processedRowObj["lattitude"] ,lon : processedRowObj["longitude"]};
              	processedRowObj["eta"] = (currentPosition && currentPosition.lat && currentPosition.lon && processedRowObj["lattitude"] && processedRowObj["longitude"]) ? utilitiesObj.toConvertMins(kony.map.distanceBetween(currentPosition, destinationLoc)) : "";
                processedSegData.push(processedRowObj);
            }
            return processedSegData;
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic formatData : " + err);
        }

    },
    setMapBounds: function(bound) {
        try {
            var scopeObj = this;
            var formModel = scopeObj.getController().getFormModel();
            var lat1 = bound.center.lat;
            var lon1 = bound.center.lon;
            var locationData = {
                lat: lat1,
                lon: lon1,
                name: "1",
                desc: "1"
            };
            formModel.performActionOnView("mapPendingOrderListKA", "navigateToLocation", [locationData, false, false]);
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic setMapBounds : " + err);
        }
    },
	navigateToOrderExecution: function(mapid,locationdata) {
        try {	
				//alert(locationdata);
				var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
				var formController = INSTANCE.getFormController("frmPendingOrderListKA");
				var orderListControllerExtension = formController.getControllerExtensionObject();
				if(locationdata && locationdata.name && locationdata.calloutData){
					orderListControllerExtension.showOrderExecutionForm(locationdata.name,locationdata.calloutData.key4)
				}
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToOrderExecution : " + err);
        }
    },
	navigateToOrderExecution1: function() {
        try {	
				
				var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
				var formController = INSTANCE.getFormController("frmPendingOrderListKA");
				var orderListControllerExtension = formController.getControllerExtensionObject();
				var mapCalloutData = orderListControllerExtension.getFormModelInfo("mapCalloutData") ? orderListControllerExtension.getFormModelInfo("mapCalloutData") : false;
				if(mapCalloutData){
					if(mapCalloutData.name && mapCalloutData.calloutData){
						orderListControllerExtension.showOrderExecutionForm(mapCalloutData.name,mapCalloutData.calloutData.key4)
					}
				}
				
        } catch (err) {
            kony.sdk.mvvm.log.error("error in Blogic navigateToOrderExecution1 : " + err);
        }
    },
	acceptPendingOrderKA : function(seguiWidget, section, row){
		var scopeObj, credStore, INSTANCE, formModel, selectedRecord, controller, query, appFactoryInstance, ORMController, entityCtrlr, recordObject;
		try {
			scopeObj = this;
			credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
			INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();	
          	controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);	          
			formModel = controller.getFormModel();
			if(kony.sdk.mvvm.Utils.getPlatformName() == kony.sdk.mvvm.Platforms["IPHONE"]){				
				selectedRecord = formModel.getViewAttributeByProperty("segPendingOrderListKA", "data")[row];
			}else{
				selectedRecord = formModel.getViewAttributeByProperty("segPendingOrderListKA", "selectedItems")[0];
			}
			kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Updating Order");
			recordObject = new kony.sdk.mvvm.persistent.Record("PendingOrders");					
			recordObject.set("Code", selectedRecord.Code);
			recordObject.set("id", selectedRecord.id);
			recordObject.set("OBJECT_TYPE", selectedRecord.OBJECT_TYPE);
			recordObject.setInfo("options", kony.servicesapp.APP_OPTIONS);
			recordObject.setInfo("serviceName", kony.servicesapp.AO_OBJECT_SERVICE_NAME);
			var onSuccess = function(res) {
				controller.getControllerExtensionObject().fetchData();
				if (kony.sdk.mvvm.isNetworkAvailabile()) {
					kony.servicesapp.backgroundSyncOnStatusChangeKA();
				}				
			}
			var onError = function() {
				alert("error while accepting order");
				kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			}
			if(selectedRecord.OBJECT_TYPE == "NTF"){
				recordObject.set("Accept", "X");
				recordObject.set("Convert_To_WO", "X");
				scopeObj.saveRecord(recordObject, onSuccess, onError);
			}else if(selectedRecord.OBJECT_TYPE == "ORD"){
				recordObject.set("Status_id", "Scheduled");
				query = "SELECT WorkCenter_id FROM SystemUser where id = '"+credStore[kony.sdk.mvvm.credStoreUsername].toUpperCase()+"'";
				entityCtrlr = controller.getApplicationContext().getModel("SystemUser", kony.servicesapp.OE_OBJECT_SERVICE_NAME, kony.servicesapp.APP_OPTIONS);
				entityCtrlr.executeSelectQuery(query, successCallBackKA, errorCallBackKA);
				function successCallBackKA(response){
					if(response && response[0]){						
						recordObject.set("WorkCenter_id", response[0]["WorkCenter_id"]);
						scopeObj.saveRecord(recordObject, onSuccess, onError);
					}
				}
				function errorCallBackKA(err){
					kony.sdk.mvvm.log.info("WorkCenter Error");
				}
			}
        }catch(err){
            kony.sdk.mvvm.log.error("error in Blogic acceptPendingOrderKA : " + err);
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        }
	}
});
