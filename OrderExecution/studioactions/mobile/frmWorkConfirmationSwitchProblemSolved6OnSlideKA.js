function frmWorkConfirmationSwitchProblemSolved6OnSlideKA(eventobject) {
    return AS_Switch_2f7faa36cdb0453abb252089312b98b0(eventobject);
}

function AS_Switch_2f7faa36cdb0453abb252089312b98b0(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["6"]);
}