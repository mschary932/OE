function frmAvailableOrderbtnStartedOnClickKA(eventobject) {
    return AS_Button_49aa4fca7b584c5696bded69cd4502ea(eventobject);
}

function AS_Button_49aa4fca7b584c5696bded69cd4502ea(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnStartedKA']);
}