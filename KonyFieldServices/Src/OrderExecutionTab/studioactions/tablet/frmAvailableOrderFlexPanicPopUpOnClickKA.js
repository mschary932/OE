function frmAvailableOrderFlexPanicPopUpOnClickKA(eventobject) {
    return AS_FlexContainer_81be743d74fa4c888e6f4402e968757f(eventobject);
}

function AS_FlexContainer_81be743d74fa4c888e6f4402e968757f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}