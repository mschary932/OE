function frmTaskExecutionBtnExtendedAttributesOnClickKA(eventobject) {
    return AS_Button_f1899bae13f24401827df225fc503cac(eventobject);
}

function AS_Button_f1899bae13f24401827df225fc503cac(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExtendedObjectFormKA");
}