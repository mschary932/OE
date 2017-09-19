function frmCreateNotesBtnCancelOnClickKA(eventobject) {
    return AS_Button_c77285da456c44bbbd1b17be3f6e2723(eventobject);
}

function AS_Button_c77285da456c44bbbd1b17be3f6e2723(eventobject) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = instance.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBackToList", [true]);
}