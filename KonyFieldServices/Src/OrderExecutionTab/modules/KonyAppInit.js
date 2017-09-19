kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.appInit = function(appContext) {
    try {
		kony.sdk.mvvm.initApplicationForms(appContext);
		
		kony.servicesapp.initialise_segment_pan_defaultValues(frmTaskExecutionTabKA.segResourcesKA,kony.servicesapp.taskExecutionResourcesListPanGestureHandler);
		frmTaskExecutionTabKA.segResourcesKA.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
  
  
		//kony.servicesapp.WATCHPOSITIONCALLEDFIRSTTIME = true;
		//kony.servicesapp.initialise_segment_pan_defaultValues(frmTaskExecutionKA.segSwipeKA,kony.servicesapp.resourcesPanGestureHandler);
		//frmTaskResourcesListKA.segSwipeKA.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
		//kony.servicesapp.initialise_segment_pan_defaultValues(frmPendingOrderListKA.segPendingOrderListKA, kony.servicesapp.orderListPanGestureHandlerKA);
		//frmPendingOrderListKA.segPendingOrderListKA.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
		//kony.servicesapp.pushRegister();
       /* if(LocalAuthController.getInstance().isTouchIDSupported() && kony.servicesapp.isAppLaunchedFirstTime){
        	kony.sdk.mvvm.dismissSyncLoadingScreen();
        	if(!kony.store.getItem("REMEMBERMEFLAG")){
        		kony.sdk.mvvm.rememberMeKA();
        	}
        	kony.servicesapp.isAppLaunchedFirstTime=false;
        	frmTouchIDSetupKA.show();
        }else{
        	kony.servicesapp.showFormOrderList();
        }         */
    } catch (err) {
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

/*

kony.servicesapp.showFormOrderList = function() {
    //Get Navigation Controller
	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
	hamburgerMenu.IS_MENU_SHOWN = false;
    hamburgerMenu.IS_ANIMATION_INPROGRESS = false;
    TAG.NC.initTransitions();
	try {
		kony.timer.cancel("completeWorkorder");
	} catch (e) {
		kony.sdk.mvvm.log.error("error in Blogic cancelTimer : " + e);
	}
    var controller = appContext.getFormController(kony.servicesapp.FRMORDERLISTKA);
    var orderviewcontrollerextension = appContext.getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject();
    var orderListcontrollerextension = appContext.getFormController(kony.servicesapp.FRMORDERLISTKA).getControllerExtensionObject();
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var controllerExtension = controller.getControllerExtensionObject();
    controllerExtension.actionForList();
    orderviewcontrollerextension.setFormModelInfo("viewType",kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
	orderviewcontrollerextension.setFormModelInfo("defaultFilterApplied",true);
    controllerExtension.setCalendarSkinKA("btnDay1KA");
    var lclCurrentDate = convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
    var nextDate = moment(convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DATE_FORMAT_WITH_TIME)).add(24,"hours");
    nextDate = moment(nextDate).subtract(1,"seconds").format(kony.servicesapp.DB_DATE_FORMAT);
    navigationObject.setQueryParams("segOrderListKA", {
        "x": lclCurrentDate,
        "y": nextDate
    });
    var utilitiesObj = utilities.getUtilityObj();
	var dateFormat = utilitiesObj.geti18nValueKA("i18n.common.dateFormat.filterValueKA");
	kony.servicesapp.date.index = 1;
	kony.servicesapp.date.value = moment().format("YYYY-MM-DD");
	kony.servicesapp.date.text = moment(kony.servicesapp.date.value,kony.servicesapp.DATE_FORMAT).format(dateFormat);
	kony.servicesapp.globalOrdersViewsKA.view = "Today";
	kony.servicesapp.globalOrdersViewsKA.filters.date.value = kony.servicesapp.date.value;
	kony.servicesapp.globalOrdersViewsKA.filters.date.text = kony.servicesapp.date.text;
	kony.servicesapp.globalOrdersViewsKA.filters.date.index = kony.servicesapp.date.index;
    orderListcontrollerextension.setFormModelInfo("selectedDate",moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD));
    var utilitiesObj = utilities.getUtilityObj();
    var viewModel = controller.getFormModel();
    viewModel.setViewAttributeByProperty("mapMyOrderListKA", "zoomLevel", kony.servicesapp.mapMyOrderListKAZoomValueKA);
	//utilitiesObj.initGesturesForForms();
	// TO MOVE	
	frmOrderResourcesListKA.flexSearchKA.tbxSearchKA.onCancel=function(){
		var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMORDERRESOURCESLISTKA);
		var appContext = controller.getApplicationContext();
		var resourcesListFormControllerExtension = appContext.getFormController(kony.servicesapp.FRMORDERRESOURCESLISTKA).getControllerExtensionObject();
		resourcesListFormControllerExtension.setFormModelInfo("searchData",{});
		resourcesListFormControllerExtension.applyView(true);
	};
	frmTaskResourcesListKA.flexSearchKA.tbxSearchKA.onCancel=function(){
		var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTASKRESOURCESLISTKA);
		var appContext = controller.getApplicationContext();
		var resourcesListFormControllerExtension = appContext.getFormController(kony.servicesapp.FRMTASKRESOURCESLISTKA).getControllerExtensionObject();
		resourcesListFormControllerExtension.setFormModelInfo("searchData",{});
		resourcesListFormControllerExtension.applyView(true);
	};
	kony.servicesapp.initialise_segment_pan_defaultValues(frmTaskExecutionKA.segSwipeKA,kony.servicesapp.resourcesPanGestureHandler);
	frmTaskResourcesListKA.segSwipeKA.editStyle = constants.SEGUI_EDITING_STYLE_SWIPE;
    controller.loadDataAndShowForm(navigationObject);
	var orderexecutioncontroller = appContext.getFormController(kony.servicesapp.FRMORDEREXECUTIONKA);
    var orderexecutioncontrollerExtension = orderexecutioncontroller.getControllerExtensionObject();
    orderexecutioncontrollerExtension.watchLocation();
};

kony.servicesapp.showPendingOrderListKA = function(){
    try {
    	hamburgerMenu.IS_MENU_SHOWN = false;
        hamburgerMenu.IS_ANIMATION_INPROGRESS = false;
        TAG.NC.initTransitions();
      	kony.sdk.mvvm.syncPendingOrdersKA();
    	var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    	var controller = appContext.getFormController(kony.servicesapp.FRMPENDINGORDERLISTKA);
    	var pendingorderviewcontrollerextension = appContext.getFormController(kony.servicesapp.FRMORDERSVIEWSKA).getControllerExtensionObject();
    	var navigationObject = new kony.sdk.mvvm.NavigationObject();
    	var controllerExtension = controller.getControllerExtensionObject();
        controllerExtension.actionForList();
        pendingorderviewcontrollerextension.setFormModelInfo("viewType",kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
    	pendingorderviewcontrollerextension.setFormModelInfo("defaultFilterApplied",true);
        controllerExtension.setCalendarSkinKA("btnDay0KA");
    	var lclCurrentDate = convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DB_DATE_FORMAT);
        var nextDate = moment(convertTimeZone(moment().format(kony.servicesapp.DATE_FORMAT_YYYYMMDD),null,kony.servicesapp.remoteTimeZone,kony.servicesapp.DATE_FORMAT_WITH_TIME)).add(24,"hours");
        nextDate = moment(nextDate).subtract(1,"seconds").format(kony.servicesapp.DB_DATE_FORMAT);
        navigationObject.setQueryParams("segPendingOrderListKA", {
            "x": lclCurrentDate,
            "y": nextDate
        });
    	controller.loadDataAndShowForm(navigationObject);
    } catch (err) {
        kony.sdk.mvvm.log.error("error in showPendingOrderListKA : " + err);
    }
};
*/