function AS_Button_1a83b40c667246de8bf6b3b4bec9acf3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderResources");
    controller.performAction("showBomFlex");
}