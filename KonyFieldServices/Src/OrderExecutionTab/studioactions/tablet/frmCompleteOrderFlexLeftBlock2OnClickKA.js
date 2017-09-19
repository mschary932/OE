function frmCompleteOrderFlexLeftBlock2OnClickKA(eventobject) {
    return AS_FlexContainer_f6b3f6ef025146688ecbfb7017e718cf(eventobject);
}

function AS_FlexContainer_f6b3f6ef025146688ecbfb7017e718cf(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDatePopUpFlex");
}