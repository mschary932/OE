kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.appInit = function(appContext) {
    try {
        kony.sdk.mvvm.initApplicationForms(appContext);
        if (LocalAuthController.getInstance().isTouchIDSupported() && kony.servicesapp.isAppLaunchedFirstTime) {
            kony.sdk.mvvm.dismissSyncLoadingScreen();
            if (!kony.store.getItem("REMEMBERMEFLAG")) {
                kony.sdk.mvvm.rememberMeKA();
            }
            kony.servicesapp.isAppLaunchedFirstTime = false;
            frmTouchIDSetupKA.show();
        } else {
            showFormOrderList();
        }
    } catch (err) {
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

function showFormOrderList() {
    //Get Navigation Controller
    var appContext = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    hamburgerMenu.IS_MENU_SHOWN = false;
    hamburgerMenu.IS_ANIMATION_INPROGRESS = false;
    TAG.NC.initTransitions();
    var controller = appContext.getFormController("frmOrderListKA");
    var orderviewcontrollerextension = appContext.getFormController("frmOrdersViewsKA").getControllerExtensionObject();
    var orderListcontrollerextension = appContext.getFormController("frmOrderListKA").getControllerExtensionObject();
    var navigationObject = new kony.sdk.mvvm.NavigationObject();
    var controllerExtension = controller.getControllerExtensionObject();
    controllerExtension.actionForList();
    orderviewcontrollerextension.setFormModelInfo("viewType", kony.sdk.mvvm.frmOrdersViewsKAControllerExtension.ORDERLIST_VIEWTYPE_TODAY);
    controllerExtension.setCalendarSkinKA("btnDay1KA");
    var lclCurrentDate = convertTimeZone(moment().format("YYYY-MM-DD"), null, kony.servicesapp.remoteTimeZone, "YYYYMMDDHHmmss");
    var nextDate = moment(convertTimeZone(moment().format("YYYY-MM-DD"), null, kony.servicesapp.remoteTimeZone, "YYYY-MM-DD HH:mm:ss")).add(24, "hours");
    nextDate = moment(nextDate).subtract(1, "seconds").format("YYYYMMDDHHmmss");
    navigationObject.setQueryParams("segOrderListKA", {
        "x": lclCurrentDate,
        "y": nextDate
    });
    orderListcontrollerextension.setFormModelInfo("selectedDate", moment().format("YYYY-MM-DD"));
    var utilitiesObj = utilities.getUtilityObj();
    var viewModel = controller.getFormModel();
    viewModel.setViewAttributeByProperty("mapMyOrderListKA", "zoomLevel", kony.servicesapp.mapMyOrderListKAZoomValueKA);
    utilitiesObj.initGesturesForForms();
    controller.loadDataAndShowForm(navigationObject);
};