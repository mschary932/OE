function frmOrderExecutionTabAddNotesOnClickKA(eventobject) {
    return AS_Button_c31f15f2968d45b19c673b0bae6fc926(eventobject);
}

function AS_Button_c31f15f2968d45b19c673b0bae6fc926(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("AddNotePopUp");
}