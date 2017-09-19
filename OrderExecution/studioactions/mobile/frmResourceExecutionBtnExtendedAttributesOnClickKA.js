function frmResourceExecutionBtnExtendedAttributesOnClickKA(eventobject) {
    return AS_Button_a362301f894f4921b2528fd2cdedc8f7(eventobject);
}

function AS_Button_a362301f894f4921b2528fd2cdedc8f7(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExtendedObjectFormKA");
}