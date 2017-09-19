function frmOrderExecAddExpenseDonePopUpKA(eventobject) {
    return AS_Button_e3c720dc90a74dd99dadc58673a6c121(eventobject);
}

function AS_Button_e3c720dc90a74dd99dadc58673a6c121(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}