function frmOrderExecutionOrderNotesDetailsBackKA(eventobject) {
    return AS_Button_e74a62d4ca68431eb480b7239a5dedb9(eventobject);
}

function AS_Button_e74a62d4ca68431eb480b7239a5dedb9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showNotesList");
}