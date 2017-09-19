function frmCompleteOrderSwitchProblemOnSlideKA(eventobject) {
    return AS_Switch_fcfa40f37f66421a9b639c0606bbd378(eventobject);
}

function AS_Switch_fcfa40f37f66421a9b639c0606bbd378(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("switchToggle");
}