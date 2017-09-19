function frmCompleteOrderFlexTimePopupOnClickKA(eventobject) {
    return AS_FlexContainer_fa83fc171f9240f69cf26ab2e46f12f6(eventobject);
}

function AS_FlexContainer_fa83fc171f9240f69cf26ab2e46f12f6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothing");
}