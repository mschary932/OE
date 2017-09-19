function frmAvailableOrderbtnNearMeOnClickKA(eventobject) {
    return AS_Button_1f25fb76c734428eb3c31c15f48bdbfd(eventobject);
}

function AS_Button_1f25fb76c734428eb3c31c15f48bdbfd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnNearMeKA']);
}