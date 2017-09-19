function frmTaskExecutionDetailsInstructionFlexOnClickKA(eventobject) {
    return AS_FlexContainer_47f13ccb85634ae3815c590214ef743a(eventobject);
}

function AS_FlexContainer_47f13ccb85634ae3815c590214ef743a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedInstruction");
}