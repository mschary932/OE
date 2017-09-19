function frmHamburgerMenubtnUndoOnCickKA(eventobject) {
    return AS_Button_169ad358efde48b8a98a756d05ad2289(eventobject);
}

function AS_Button_169ad358efde48b8a98a756d05ad2289(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    var controllerExtension = controller.getControllerExtensionObject();
    kony.timer.cancel("deleteReadingsTimer");
    showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxRemoveKA");
    controllerExtension.fetchData();
}