function btnCloseDeleteTaskExecKA(eventobject) {
    return AS_Button_03444aa3b19c48a4a01a8330777f2c56(eventobject);
}

function AS_Button_03444aa3b19c48a4a01a8330777f2c56(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    var controllerExtension = controller.getControllerExtensionObject();
    controllerExtension.fetchData();
}