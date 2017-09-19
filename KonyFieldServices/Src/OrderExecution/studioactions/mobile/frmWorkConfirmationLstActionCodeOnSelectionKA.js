function frmWorkConfirmationLstActionCodeOnSelectionKA(eventobject) {
    return AS_ListBox_f8b8be096e5a4b0780a31c79852c67c4(eventobject);
}

function AS_ListBox_f8b8be096e5a4b0780a31c79852c67c4(eventobject) {
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    frmController.performAction("setListBox");
}