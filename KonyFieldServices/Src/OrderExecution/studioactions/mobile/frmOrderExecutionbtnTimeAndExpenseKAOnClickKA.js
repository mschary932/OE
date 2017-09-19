function frmOrderExecutionbtnTimeAndExpenseKAOnClickKA(eventobject) {
    return AS_Button_0037740f0d854377b37e036df8cec0e2(eventobject);
}

function AS_Button_0037740f0d854377b37e036df8cec0e2(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTIMEANDEXPENSEKA).getControllerExtensionObject();
    controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMORDEREXECUTIONKA);
    controller.performAction("navigateToTimeAndExpense");
}