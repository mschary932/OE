function frmMeasurementExecutionFlxViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_f4f398af85be45b8a9dc1fa1247c5539(eventobject);
}

function AS_FlexContainer_f4f398af85be45b8a9dc1fa1247c5539(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}