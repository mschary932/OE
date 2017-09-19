function frmCompleteOrderFlexBottomBlock2OnClickKA(eventobject) {
    return AS_FlexContainer_62f09bc9142e4d9db0c71e1fedf86cc5(eventobject);
}

function AS_FlexContainer_62f09bc9142e4d9db0c71e1fedf86cc5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}