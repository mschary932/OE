function frmOrderExecutionCreateMeasurementPopUpCancelKA(eventobject) {
    return AS_Button_9ac3a46f206245f5873a69098c6c15b3(eventobject);
}

function AS_Button_9ac3a46f206245f5873a69098c6c15b3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("CreateMeasurementPopUpHide");
}