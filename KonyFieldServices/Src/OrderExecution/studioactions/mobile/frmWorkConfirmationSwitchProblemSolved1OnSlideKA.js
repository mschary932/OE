function frmWorkConfirmationSwitchProblemSolved1OnSlideKA(eventobject) {
    return AS_Switch_67c1b3d0c1c0480cb31e18cd11a3022d(eventobject);
}

function AS_Switch_67c1b3d0c1c0480cb31e18cd11a3022d(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["1"]);
}