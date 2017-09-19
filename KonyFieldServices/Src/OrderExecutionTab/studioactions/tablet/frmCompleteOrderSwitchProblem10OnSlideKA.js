function frmCompleteOrderSwitchProblem10OnSlideKA(eventobject) {
    return AS_Switch_3088f484e8e346ea9b28d24eb9009af6(eventobject);
}

function AS_Switch_3088f484e8e346ea9b28d24eb9009af6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["10"]);
}