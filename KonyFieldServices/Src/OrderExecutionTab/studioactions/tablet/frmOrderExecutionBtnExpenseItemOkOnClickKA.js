function frmOrderExecutionBtnExpenseItemOkOnClickKA(eventobject) {
    return AS_Button_e0d9d35692ea4125831ac6e1926ff793(eventobject);
}

function AS_Button_e0d9d35692ea4125831ac6e1926ff793(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}