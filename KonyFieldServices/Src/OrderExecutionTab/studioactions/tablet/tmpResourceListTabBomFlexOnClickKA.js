function tmpResourceListTabBomFlexOnClickKA(eventobject, context) {
    return AS_FlexContainer_dd685b128c5e471db4716ab38eca4bd3(eventobject, context);
}

function AS_FlexContainer_dd685b128c5e471db4716ab38eca4bd3(eventobject, context) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBomFlex");
}