function frmMeasurmentReadingDetailsBackKA(eventobject) {
    return AS_Button_8465260440ed40f6a1b8e59c602dba23(eventobject);
}

function AS_Button_8465260440ed40f6a1b8e59c602dba23(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showMeasurementReadings");
}