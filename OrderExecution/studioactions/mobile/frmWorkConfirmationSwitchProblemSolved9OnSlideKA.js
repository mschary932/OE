function frmWorkConfirmationSwitchProblemSolved9OnSlideKA(eventobject) {
    return AS_Switch_d0d9663ee4f24f3bba849de8020b28b3(eventobject);
}

function AS_Switch_d0d9663ee4f24f3bba849de8020b28b3(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["9"]);
}