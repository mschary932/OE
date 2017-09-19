function frmOrderDetailsFlxInstructionOnclickKA(eventobject) {
    return AS_FlexContainer_36fd06c2a14642cfb653a794a0e5fc94(eventobject);
}

function AS_FlexContainer_36fd06c2a14642cfb653a794a0e5fc94(eventobject) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        var controllerExtension = controller.getControllerExtensionObject();
        var descDetails = controllerExtension.getFormModelInfo("flxInstructionKA");
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