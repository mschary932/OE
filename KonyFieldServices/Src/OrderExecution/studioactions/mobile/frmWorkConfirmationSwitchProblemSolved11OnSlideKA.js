function frmWorkConfirmationSwitchProblemSolved11OnSlideKA(eventobject) {
    return AS_Switch_c406ca423dfd42e8882580862845e644(eventobject);
}

function AS_Switch_c406ca423dfd42e8882580862845e644(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["11"]);
}