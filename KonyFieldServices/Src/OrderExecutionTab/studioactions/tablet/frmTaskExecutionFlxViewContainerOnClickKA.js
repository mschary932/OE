function frmTaskExecutionFlxViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_db11eed51cbf40bbb0384ce699844f59(eventobject);
}

function AS_FlexContainer_db11eed51cbf40bbb0384ce699844f59(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}