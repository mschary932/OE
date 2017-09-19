function frmMeasurementExecutionStartKA(eventobject) {
    return AS_Button_b53d95021ad04d878a9d24212300bffe(eventobject);
}

function AS_Button_b53d95021ad04d878a9d24212300bffe(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("startMeasurementExecution");
}