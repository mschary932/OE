function frmMyOrderbtnStartedFOnClickKA(eventobject) {
    return AS_Button_a30b64d637384ee48ed0e6a8f6b0bf8d(eventobject);
}

function AS_Button_a30b64d637384ee48ed0e6a8f6b0bf8d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnStartedFKA']);
}