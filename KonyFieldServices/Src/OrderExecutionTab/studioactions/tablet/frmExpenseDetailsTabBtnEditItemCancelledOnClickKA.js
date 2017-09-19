function frmExpenseDetailsTabBtnEditItemCancelledOnClickKA(eventobject) {
    return AS_Button_eec96ef154fb4114b666ae055a5ffea0(eventobject);
}

function AS_Button_eec96ef154fb4114b666ae055a5ffea0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelEditExpenseItemPopUp");
}