function frmMyOrderBtnClearAll1OnClickKA(eventobject) {
    return AS_Button_a460f8fc3a6a4a169b659f04c7bc9622(eventobject);
}

function AS_Button_a460f8fc3a6a4a169b659f04c7bc9622(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}