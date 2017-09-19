function frmTaskExecutionBtnExpenseAddOnClickKA(eventobject) {
    return AS_Button_7e9e1712ee8546d1a60b387e22b8bea8(eventobject);
}

function AS_Button_7e9e1712ee8546d1a60b387e22b8bea8(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddExpensePopUp");
}