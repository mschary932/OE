function frmWorkConfirmationSwitchProblemSolved7OnSlideKA(eventobject) {
    return AS_Switch_558b1e9b3719479c893bb89401c4054b(eventobject);
}

function AS_Switch_558b1e9b3719479c893bb89401c4054b(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["7"]);
}