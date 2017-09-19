function frmMyOrderBtnBackToMainMenuOnClickKA(eventobject) {
    return AS_Button_f940ccf366474fdbac54c8003310d5f7(eventobject);
}

function AS_Button_f940ccf366474fdbac54c8003310d5f7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromSettingScreen");
}