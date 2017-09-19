function frmCompleteOrderSwitchProblem8OnSlideKA(eventobject) {
    return AS_Switch_a948629aa3824c338dc27249bf940823(eventobject);
}

function AS_Switch_a948629aa3824c338dc27249bf940823(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["8"]);
}