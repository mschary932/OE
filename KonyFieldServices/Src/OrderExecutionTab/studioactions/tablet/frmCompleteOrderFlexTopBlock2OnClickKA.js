function frmCompleteOrderFlexTopBlock2OnClickKA(eventobject) {
    return AS_FlexContainer_f711c38b164b4919ac5904574e6ecc8f(eventobject);
}

function AS_FlexContainer_f711c38b164b4919ac5904574e6ecc8f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}