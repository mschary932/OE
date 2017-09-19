function frmCompleteOrderFlexTopBlock2OnClick2KA(eventobject) {
    return AS_FlexContainer_b86b2cba7f0c42578f2c43a173073d9c(eventobject);
}

function AS_FlexContainer_b86b2cba7f0c42578f2c43a173073d9c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}