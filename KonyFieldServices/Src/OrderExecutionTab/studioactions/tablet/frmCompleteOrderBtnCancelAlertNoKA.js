function frmCompleteOrderBtnCancelAlertNoKA(eventobject) {
    return AS_Button_3a86afe71bf2472685c43d0a08a70aed(eventobject);
}

function AS_Button_3a86afe71bf2472685c43d0a08a70aed(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}