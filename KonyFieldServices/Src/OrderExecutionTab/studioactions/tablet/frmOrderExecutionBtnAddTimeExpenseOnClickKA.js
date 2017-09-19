function frmOrderExecutionBtnAddTimeExpenseOnClickKA(eventobject) {
    return AS_Button_9b2ebc1b91fb49abb7fe60a6df4a653e(eventobject);
}

function AS_Button_9b2ebc1b91fb49abb7fe60a6df4a653e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showAddTimeExpense");
}