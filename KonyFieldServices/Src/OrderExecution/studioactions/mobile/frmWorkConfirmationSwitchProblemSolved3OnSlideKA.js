function frmWorkConfirmationSwitchProblemSolved3OnSlideKA(eventobject) {
    return AS_Switch_13c79f7bdd81488eba2ed890f3a44afc(eventobject);
}

function AS_Switch_13c79f7bdd81488eba2ed890f3a44afc(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["3"]);
}