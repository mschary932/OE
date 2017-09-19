function frmCustomerSignOffSwitchProblemSolvedOnSlideKA(eventobject) {
    return AS_Switch_9b7e889652ae4cce82d89e9bdf86ccbe(eventobject);
}

function AS_Switch_9b7e889652ae4cce82d89e9bdf86ccbe(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("switchSlideCallback");
}