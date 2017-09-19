function frmAvailableOrderbtnDay4OnClickKA(eventobject) {
    return AS_Button_917a6e2939254c818cf0a4f2b16fa087(eventobject);
}

function AS_Button_917a6e2939254c818cf0a4f2b16fa087(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay4KA']);
}