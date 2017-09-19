function frmOrderExecutionCreateMeasurementDoneKA(eventobject) {
    return AS_Button_91706a9b50e64674a1d051fa43084cc8(eventobject);
}

function AS_Button_91706a9b50e64674a1d051fa43084cc8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("AddMeasurement");
}