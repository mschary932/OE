function frmWorkConfirmationSwitchProblemSolved10OnSlideKA(eventobject) {
    return AS_Switch_de77e97e16b641048db07425c37d833f(eventobject);
}

function AS_Switch_de77e97e16b641048db07425c37d833f(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["10"]);
}