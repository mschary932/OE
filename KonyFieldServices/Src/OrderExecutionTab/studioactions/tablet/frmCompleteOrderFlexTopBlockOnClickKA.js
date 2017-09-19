function frmCompleteOrderFlexTopBlockOnClickKA(eventobject) {
    return AS_FlexContainer_38fd7f1ce9b2497892a9efd4c6f50020(eventobject);
}

function AS_FlexContainer_38fd7f1ce9b2497892a9efd4c6f50020(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideTimePopUpFlex");
}