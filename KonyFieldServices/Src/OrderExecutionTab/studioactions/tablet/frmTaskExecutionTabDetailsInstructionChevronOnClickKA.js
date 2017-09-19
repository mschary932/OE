function frmTaskExecutionTabDetailsInstructionChevronOnClickKA(eventobject) {
    return AS_Button_b550ed5978834b28aae1065da32d1356(eventobject);
}

function AS_Button_b550ed5978834b28aae1065da32d1356(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailedInstruction");
}