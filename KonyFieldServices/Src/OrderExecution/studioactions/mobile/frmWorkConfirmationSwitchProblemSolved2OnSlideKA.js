function frmWorkConfirmationSwitchProblemSolved2OnSlideKA(eventobject) {
    return AS_Switch_91cde582cc5c463195e8cbc27f4b0c86(eventobject);
}

function AS_Switch_91cde582cc5c463195e8cbc27f4b0c86(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["2"]);
}