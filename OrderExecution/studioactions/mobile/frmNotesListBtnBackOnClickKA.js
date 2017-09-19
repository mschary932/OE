function frmNotesListBtnBackOnClickKA(eventobject) {
    return AS_Button_6096007af3934e209c4c2d506557edec(eventobject);
}

function AS_Button_6096007af3934e209c4c2d506557edec(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}