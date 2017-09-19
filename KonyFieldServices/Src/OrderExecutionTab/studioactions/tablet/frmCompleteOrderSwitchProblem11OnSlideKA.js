function frmCompleteOrderSwitchProblem11OnSlideKA(eventobject) {
    return AS_Switch_2d8e0c7127a349e4aa527a0b3f8ea1a0(eventobject);
}

function AS_Switch_2d8e0c7127a349e4aa527a0b3f8ea1a0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["11"]);
}