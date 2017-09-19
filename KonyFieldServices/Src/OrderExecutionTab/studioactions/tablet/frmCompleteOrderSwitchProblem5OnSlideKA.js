function frmCompleteOrderSwitchProblem5OnSlideKA(eventobject) {
    return AS_Switch_a389d4e826fe48dbb364e302c0252bdf(eventobject);
}

function AS_Switch_a389d4e826fe48dbb364e302c0252bdf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["5"]);
}