function frmNewTaskBtnCancelOnClickKA(eventobject) {
    return AS_Button_ea2eca7e18f448ecac7c19105b2670c8(eventobject);
}

function AS_Button_ea2eca7e18f448ecac7c19105b2670c8(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBackToOrderExecution");
}