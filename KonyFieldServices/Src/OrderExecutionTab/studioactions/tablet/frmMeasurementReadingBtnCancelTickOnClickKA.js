function frmMeasurementReadingBtnCancelTickOnClickKA(eventobject) {
    return AS_Button_b81340a791744adc96a85f14e84a476f(eventobject);
}

function AS_Button_b81340a791744adc96a85f14e84a476f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementExecutionForm");
}