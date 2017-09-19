function frmCompleteOrderSwitchProblem7OnSlideKA(eventobject) {
    return AS_Switch_b03873326bbe4c218ea0289a559d2d2e(eventobject);
}

function AS_Switch_b03873326bbe4c218ea0289a559d2d2e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["7"]);
}