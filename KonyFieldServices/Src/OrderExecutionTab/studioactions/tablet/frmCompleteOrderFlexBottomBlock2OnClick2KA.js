function frmCompleteOrderFlexBottomBlock2OnClick2KA(eventobject) {
    return AS_FlexContainer_b640f12b619d4c81bb279f2136100d0c(eventobject);
}

function AS_FlexContainer_b640f12b619d4c81bb279f2136100d0c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}