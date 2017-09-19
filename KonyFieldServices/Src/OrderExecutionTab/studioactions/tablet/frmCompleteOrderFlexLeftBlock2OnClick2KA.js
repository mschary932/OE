function frmCompleteOrderFlexLeftBlock2OnClick2KA(eventobject) {
    return AS_FlexContainer_697ec5cf428049889f06de06f9cb79c5(eventobject);
}

function AS_FlexContainer_697ec5cf428049889f06de06f9cb79c5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}