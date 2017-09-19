function frmOrderExecutionForwardChevronInstructionKA(eventobject) {
    return AS_Button_df0e8c26de4b4a9ea130ade037c2127e(eventobject);
}

function AS_Button_df0e8c26de4b4a9ea130ade037c2127e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedInstruction");
}