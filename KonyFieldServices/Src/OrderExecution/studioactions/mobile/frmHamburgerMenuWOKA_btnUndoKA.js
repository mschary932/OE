function frmHamburgerMenuWOKA_btnUndoKA(eventobject) {
    return AS_Button_0357893852114f4e8eaf5c1e0cb871b7(eventobject);
}

function AS_Button_0357893852114f4e8eaf5c1e0cb871b7(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var controllerExtension = controller.getControllerExtensionObject();
    kony.timer.cancel("deleteMeasureReadingTimer");
    showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxRemoveReadingKA");
    controllerExtension.fetchData();
}