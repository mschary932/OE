function frmMeasurementExecutionFormBackKA(eventobject) {
    return AS_Button_0098ff06ea024f44be411517c3cf8160(eventobject);
}

function AS_Button_0098ff06ea024f44be411517c3cf8160(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("FormBack");
}