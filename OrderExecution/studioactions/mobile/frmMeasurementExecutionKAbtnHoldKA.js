function frmMeasurementExecutionKAbtnHoldKA(eventobject) {
    return AS_Button_23a9219015de401eac3f8efbd837ea4e(eventobject);
}

function AS_Button_23a9219015de401eac3f8efbd837ea4e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeStatusForTask");
}