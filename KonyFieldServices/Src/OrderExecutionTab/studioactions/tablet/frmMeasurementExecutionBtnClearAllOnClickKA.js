function frmMeasurementExecutionBtnClearAllOnClickKA(eventobject) {
    return AS_Button_56a0af12faaf4b499d6620b04dce743c(eventobject);
}

function AS_Button_56a0af12faaf4b499d6620b04dce743c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}