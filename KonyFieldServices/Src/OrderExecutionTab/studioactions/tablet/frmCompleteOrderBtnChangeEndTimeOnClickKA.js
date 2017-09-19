function frmCompleteOrderBtnChangeEndTimeOnClickKA(eventobject) {
    return AS_Button_e292490f11d442aa9ca5605059361ce8(eventobject);
}

function AS_Button_e292490f11d442aa9ca5605059361ce8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimePopUpFlex");
}