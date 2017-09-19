function btnResCloseOnClickKA(eventobject) {
    return AS_Button_5ccc06623ca3428e83bef13ab081cf12(eventobject);
}

function AS_Button_5ccc06623ca3428e83bef13ab081cf12(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
    formModel.performActionOnView("btnBackKA", "setEnabled", [true]);
    if (kony.application.getCurrentForm().id == "frmTaskResourcesListKA" || kony.application.getCurrentForm().id == "frmOrderResourcesListKA") {
        formModel.performActionOnView("btnOptionsKA", "setEnabled", [true]);
    }
    showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxEditKA");
}