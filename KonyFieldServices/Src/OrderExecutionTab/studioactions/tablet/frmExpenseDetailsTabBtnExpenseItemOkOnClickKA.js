function frmExpenseDetailsTabBtnExpenseItemOkOnClickKA(eventobject) {
    return AS_Button_7714e1c6dfbf452f9e159bcf9d6eba70(eventobject);
}

function AS_Button_7714e1c6dfbf452f9e159bcf9d6eba70(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelEditExpenseItemPopUp");
}