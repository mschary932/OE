function btnResourceCancelDeleteOnClickKA(eventobject) {
    return AS_Button_297bedabb5e6459daa59372f225b5bab(eventobject);
}

function AS_Button_297bedabb5e6459daa59372f225b5bab(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    var controllerExtension = controller.getControllerExtensionObject();
    controllerExtension.setFormModelInfo("isDelete", true);
    kony.timer.cancel("deleteResourceTimer");
    showHideHamburgerMenuKA(kony.application.getCurrentForm(), frmHamburgerMenuWOKA, false, "flxDeleteKA");
    controllerExtension.fetchData();
}