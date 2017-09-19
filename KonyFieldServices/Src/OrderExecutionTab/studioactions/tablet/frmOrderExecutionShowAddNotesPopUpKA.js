function frmOrderExecutionShowAddNotesPopUpKA(eventobject) {
    return AS_Button_7622a750aef546bbbb13e72bea18223e(eventobject);
}

function AS_Button_7622a750aef546bbbb13e72bea18223e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("AddNotePopUp");
}