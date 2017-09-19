function frmPendingOrderListBtnCurrentLocationOnClickKA(eventobject) {
    return AS_Button_11dcf69986164f83bf8629049a844924(eventobject);
}

function AS_Button_11dcf69986164f83bf8629049a844924(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var utilitiesObj = utilities.getUtilityObj();
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen(utilitiesObj.geti18nValueKA("i18n.common.showLoadingKA"));
    controller.performAction("getCurrentLocation", [true]);
}