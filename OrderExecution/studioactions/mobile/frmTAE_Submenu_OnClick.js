function frmTAE_Submenu_OnClick(eventobject) {
    return AS_Button_65d955ce570e4a4aa086463213704732(eventobject);
}

function AS_Button_65d955ce570e4a4aa086463213704732(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExtension = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.servicesapp.FRMTIMEANDEXPENSEKA).getControllerExtensionObject();
    controllerExtension.setFormModelInfo("previousForm", kony.servicesapp.FRMTASKEXECUTIONKA);
    controller.performAction("navigateToTimeAndExpense");
}