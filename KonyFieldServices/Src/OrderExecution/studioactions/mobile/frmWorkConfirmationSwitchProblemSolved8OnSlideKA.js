function frmWorkConfirmationSwitchProblemSolved8OnSlideKA(eventobject) {
    return AS_Switch_4c52dce2a6e842a8b70f565aed80290e(eventobject);
}

function AS_Switch_4c52dce2a6e842a8b70f565aed80290e(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["8"]);
}