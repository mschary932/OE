function frmCOmpleteOrderTimeExpenseAddKA(eventobject) {
    return AS_Button_efe221c088b842a19cb36a86af232ee6(eventobject);
}

function AS_Button_efe221c088b842a19cb36a86af232ee6(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddExpensePopUp");
}