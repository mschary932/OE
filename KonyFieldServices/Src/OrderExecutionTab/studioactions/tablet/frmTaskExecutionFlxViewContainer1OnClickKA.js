function frmTaskExecutionFlxViewContainer1OnClickKA(eventobject) {
    return AS_FlexContainer_af77505630af46a58c9dc3b5cce92202(eventobject);
}

function AS_FlexContainer_af77505630af46a58c9dc3b5cce92202(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCallOne");
}