function frmCompleteOrderSwitchProblem9OnSlideKA(eventobject) {
    return AS_Switch_3ad0c5783191477b97d861ee5dba0e38(eventobject);
}

function AS_Switch_3ad0c5783191477b97d861ee5dba0e38(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["9"]);
}