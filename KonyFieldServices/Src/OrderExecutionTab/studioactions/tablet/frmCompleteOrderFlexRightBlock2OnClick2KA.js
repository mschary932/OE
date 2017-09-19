function frmCompleteOrderFlexRightBlock2OnClick2KA(eventobject) {
    return AS_FlexContainer_4c34fb4d60b54b48966beb9f3f5f481a(eventobject);
}

function AS_FlexContainer_4c34fb4d60b54b48966beb9f3f5f481a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}