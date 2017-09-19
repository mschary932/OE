function frmMeasurementExecutionKAbtnCompleteKA(eventobject) {
    return AS_Button_4fc24b8e90e746428060948445e75e55(eventobject);
}

function AS_Button_4fc24b8e90e746428060948445e75e55(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeStatusForTask");
}