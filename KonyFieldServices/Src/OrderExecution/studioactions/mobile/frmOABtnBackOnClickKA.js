function frmOABtnBackOnClickKA(eventobject) {
    return AS_Button_45fb2b105b6e429d91e065488e5398d6(eventobject);
}

function AS_Button_45fb2b105b6e429d91e065488e5398d6(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}