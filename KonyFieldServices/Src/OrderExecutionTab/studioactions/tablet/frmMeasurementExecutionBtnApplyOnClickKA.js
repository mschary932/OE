function frmMeasurementExecutionBtnApplyOnClickKA(eventobject) {
    return AS_Button_4542a0b4cf8e404bab68afa150815d14(eventobject);
}

function AS_Button_4542a0b4cf8e404bab68afa150815d14(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}