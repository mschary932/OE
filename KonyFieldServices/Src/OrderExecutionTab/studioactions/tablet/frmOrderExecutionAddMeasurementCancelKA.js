function frmOrderExecutionAddMeasurementCancelKA(eventobject) {
    return AS_Button_4b9fc57dd6784dd1b83d2edda9ac763b(eventobject);
}

function AS_Button_4b9fc57dd6784dd1b83d2edda9ac763b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelMeasurementPopUp");
}