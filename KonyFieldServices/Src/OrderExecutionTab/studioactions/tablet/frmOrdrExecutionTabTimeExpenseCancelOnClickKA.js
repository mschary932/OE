function frmOrdrExecutionTabTimeExpenseCancelOnClickKA(eventobject) {
    return AS_Button_1e62ef31cc3642699f55219310f50b20(eventobject);
}

function AS_Button_1e62ef31cc3642699f55219310f50b20(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}