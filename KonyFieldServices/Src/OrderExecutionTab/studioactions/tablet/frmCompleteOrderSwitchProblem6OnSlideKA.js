function frmCompleteOrderSwitchProblem6OnSlideKA(eventobject) {
    return AS_Switch_e6e8cfad2c44412d810fd12dd827abdb(eventobject);
}

function AS_Switch_e6e8cfad2c44412d810fd12dd827abdb(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggleConfirmation", ["6"]);
}