function frmTaskExecutionTabHideViewUpKA(eventobject) {
    return AS_FlexContainer_bfed42baeed4455a9eb6e56ec79084e0(eventobject);
}

function AS_FlexContainer_bfed42baeed4455a9eb6e56ec79084e0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}