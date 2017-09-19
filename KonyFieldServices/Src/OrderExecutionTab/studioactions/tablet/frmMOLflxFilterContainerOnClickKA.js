function frmMOLflxFilterContainerOnClickKA(eventobject) {
    return AS_FlexContainer_361e11f03ecd4c729464759f0c3c439f(eventobject);
}

function AS_FlexContainer_361e11f03ecd4c729464759f0c3c439f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}