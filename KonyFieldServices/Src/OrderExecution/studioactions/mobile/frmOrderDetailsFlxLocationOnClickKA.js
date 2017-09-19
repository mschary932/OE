function frmOrderDetailsFlxLocationOnClickKA(eventobject) {
    return AS_FlexContainer_2d82366427bf46878fa8c7d4bf69d1c1(eventobject);
}

function AS_FlexContainer_2d82366427bf46878fa8c7d4bf69d1c1(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        var controllerExtension = controller.getControllerExtensionObject();
        var descDetails = controllerExtension.getFormModelInfo("flxLocationKA");
        controller = INSTANCE.getFormController("frmDescriptionDetailsKA");
        controllerExtension = controller.getControllerExtensionObject();
        controllerExtension.setFormModelInfo("descDetails", descDetails);
        if (descDetails.isTruncated) {
            controller.loadDataAndShowForm(null);
        }
    } catch (err) {
        kony.sdk.mvvm.log.error(" " + err);
    }
}