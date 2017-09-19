function frmExpenseDetailsTabBtnCancelCrossOnClickKA(eventobject) {
    return AS_Button_d0176dad09384b6598c2270b680e7d18(eventobject);
}

function AS_Button_d0176dad09384b6598c2270b680e7d18(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelConfirmationAndCancelPopUp");
}