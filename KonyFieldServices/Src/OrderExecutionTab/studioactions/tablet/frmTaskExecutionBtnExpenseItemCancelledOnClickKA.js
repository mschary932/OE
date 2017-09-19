function frmTaskExecutionBtnExpenseItemCancelledOnClickKA(eventobject) {
    return AS_Button_f097b4beccf644e99e1c0f584db08c3c(eventobject);
}

function AS_Button_f097b4beccf644e99e1c0f584db08c3c(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}