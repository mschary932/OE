function frmAvailableOrderbtnRejectedFOnClickKA(eventobject) {
    return AS_Button_50dd9971cf90430a9e3c174c90c6c175(eventobject);
}

function AS_Button_50dd9971cf90430a9e3c174c90c6c175(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnRejectedFKA']);
}