function frmCompleteOrderbtnTimeAndExpenseOnClickKA(eventobject) {
    return AS_Button_c55d4d130a8f4e83a53179e834f553d3(eventobject);
}

function AS_Button_c55d4d130a8f4e83a53179e834f553d3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTIMEANDEXPENSEKA).getControllerExtensionObject();
    controllerExtension.setFormModelInfo("previousForm", "frmCompleteOrderKA");
    controller.performAction("navigateToTimeAndExpense");
}