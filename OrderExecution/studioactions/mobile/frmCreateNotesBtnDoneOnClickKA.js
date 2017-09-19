function frmCreateNotesBtnDoneOnClickKA(eventobject) {
    return AS_Button_71ea5c4557964ed5a3f9d8be050d82bf(eventobject);
}

function AS_Button_71ea5c4557964ed5a3f9d8be050d82bf(eventobject) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var addController = instance.getFormController("frmCreateNotesKA");
    addController.saveData();
}