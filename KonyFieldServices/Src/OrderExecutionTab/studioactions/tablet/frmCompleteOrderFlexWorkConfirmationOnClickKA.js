function frmCompleteOrderFlexWorkConfirmationOnClickKA(eventobject) {
    return AS_FlexContainer_a0d83793a1de442aaee2e3f87f7f02b9(eventobject);
}

function AS_FlexContainer_a0d83793a1de442aaee2e3f87f7f02b9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showWorkConfirmationFlex");
}