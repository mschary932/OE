function frmMyOrderbtnstartedOnClickKA(eventobject) {
    return AS_Button_5bab8274e0154cd29c3dc80a5d66b732(eventobject);
}

function AS_Button_5bab8274e0154cd29c3dc80a5d66b732(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnStartedKA']);
}