function frmWorkConfirmationBtnSaveOnClickKA(eventobject) {
    return AS_Button_ff415d66a90b40efbb2ee2fae63f4e99(eventobject);
}

function AS_Button_ff415d66a90b40efbb2ee2fae63f4e99(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("completeChecklist");
}