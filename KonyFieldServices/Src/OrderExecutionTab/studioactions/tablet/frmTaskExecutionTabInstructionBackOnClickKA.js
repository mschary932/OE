function frmTaskExecutionTabInstructionBackOnClickKA(eventobject) {
    return AS_Button_22a6bf7135e440809a84c2cd8ffd2ed8(eventobject);
}

function AS_Button_22a6bf7135e440809a84c2cd8ffd2ed8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskDetailsBackInstruction");
}