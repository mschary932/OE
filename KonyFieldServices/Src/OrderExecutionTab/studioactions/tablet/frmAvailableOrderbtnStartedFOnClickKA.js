function frmAvailableOrderbtnStartedFOnClickKA(eventobject) {
    return AS_Button_fbb1996771794d5db8f36c2191ec8fae(eventobject);
}

function AS_Button_fbb1996771794d5db8f36c2191ec8fae(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnStartedFKA']);
}