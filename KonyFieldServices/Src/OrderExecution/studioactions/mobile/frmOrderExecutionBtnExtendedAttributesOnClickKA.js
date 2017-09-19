function frmOrderExecutionBtnExtendedAttributesOnClickKA(eventobject) {
    return AS_Button_164c75d43a89417cbaa8f3b75ee1cc8f(eventobject);
}

function AS_Button_164c75d43a89417cbaa8f3b75ee1cc8f(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showExtendedObjectFormKA");
    } catch (err) {}
}