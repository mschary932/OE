function frmMeasurementExecutionAddCreateMeasurementKA(eventobject) {
    return AS_Button_41bb7618d7c743cf97fe3ec599089c37(eventobject);
}

function AS_Button_41bb7618d7c743cf97fe3ec599089c37(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadings");
}