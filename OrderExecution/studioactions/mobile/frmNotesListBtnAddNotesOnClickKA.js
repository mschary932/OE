function frmNotesListBtnAddNotesOnClickKA(eventobject) {
    return AS_Button_06ef9eab629f4326a158f9a09cb34164(eventobject);
}

function AS_Button_06ef9eab629f4326a158f9a09cb34164(eventobject) {
    var instance = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var listController = instance.getFormController("frmNotesListKA");
    listController.performAction("navigateToAdd");
}