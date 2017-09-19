function frmWorkConfirmationSwitchProblemSolved5OnSlideKA(eventobject) {
    return AS_Switch_b124ee7a23db4cc29ad44a308f41885d(eventobject);
}

function AS_Switch_b124ee7a23db4cc29ad44a308f41885d(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["5"]);
}