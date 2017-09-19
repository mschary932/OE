function frmTaskDetailsFlxInfoOnClickKA(eventobject) {
    return AS_FlexContainer_f9eb4d523db944a6a395aa78d8d4436f(eventobject);
}

function AS_FlexContainer_f9eb4d523db944a6a395aa78d8d4436f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExtension = controller.getControllerExtensionObject();
    var descDetails = controllerExtension.getFormModelInfo("flexContainerInfoKA");
    controller = INSTANCE.getFormController("frmDescriptionDetailsKA");
    controllerExtension = controller.getControllerExtensionObject();
    controllerExtension.setFormModelInfo("descDetails", descDetails);
    if (descDetails.isTruncated) {
        controller.loadDataAndShowForm(null);
    }
}