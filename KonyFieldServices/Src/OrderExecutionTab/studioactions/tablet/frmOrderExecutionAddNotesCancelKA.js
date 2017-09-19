function frmOrderExecutionAddNotesCancelKA(eventobject) {
    return AS_Button_4a9c4b7cd3094a659d72fe520cc34625(eventobject);
}

function AS_Button_4a9c4b7cd3094a659d72fe520cc34625(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddNotes");
}