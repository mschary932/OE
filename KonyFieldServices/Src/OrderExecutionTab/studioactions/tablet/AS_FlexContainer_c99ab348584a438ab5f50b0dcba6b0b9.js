function AS_FlexContainer_c99ab348584a438ab5f50b0dcba6b0b9(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBomFlex");
}