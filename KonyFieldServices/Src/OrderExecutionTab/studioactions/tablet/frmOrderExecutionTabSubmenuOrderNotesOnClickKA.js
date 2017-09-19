function frmOrderExecutionTabSubmenuOrderNotesOnClickKA(eventobject) {
    return AS_FlexContainer_9db02c39b2dd471f98ec4219805db7b9(eventobject);
}

function AS_FlexContainer_9db02c39b2dd471f98ec4219805db7b9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderNotes");
}