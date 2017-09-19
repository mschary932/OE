function frmOrderExecAddExpenseItemKA(eventobject) {
    return AS_Button_9a11299c82b24466afa41ff3962b15bc(eventobject);
}

function AS_Button_9a11299c82b24466afa41ff3962b15bc(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddExpensePopUp");
}