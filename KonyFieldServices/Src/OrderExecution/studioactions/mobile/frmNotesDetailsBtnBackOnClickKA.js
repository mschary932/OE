function frmNotesDetailsBtnBackOnClickKA(eventobject) {
    return AS_Button_658a50715c9f4bdf9088da4c7940ed60(eventobject);
}

function AS_Button_658a50715c9f4bdf9088da4c7940ed60(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPreviousForm", [true]);
}