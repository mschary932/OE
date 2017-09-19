function frmTaskExecutionFlexInstructionContainerOnClickKA(eventobject) {
    return AS_FlexContainer_42674d6a1c1d4af4b9fc0bb15a7393b5(eventobject);
}

function AS_FlexContainer_42674d6a1c1d4af4b9fc0bb15a7393b5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedInstruction");
}