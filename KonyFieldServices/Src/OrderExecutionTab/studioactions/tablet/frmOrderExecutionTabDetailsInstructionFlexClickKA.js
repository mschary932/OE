function frmOrderExecutionTabDetailsInstructionFlexClickKA(eventobject) {
    return AS_FlexContainer_13cad461fb1243c5a416c4e17b304713(eventobject);
}

function AS_FlexContainer_13cad461fb1243c5a416c4e17b304713(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedInstruction");
}