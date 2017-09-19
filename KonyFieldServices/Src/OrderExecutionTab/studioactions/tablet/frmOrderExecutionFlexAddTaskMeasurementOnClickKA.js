function frmOrderExecutionFlexAddTaskMeasurementOnClickKA(eventobject) {
    return AS_FlexContainer_1431f606916e4cd29ef166a8a4aed0aa(eventobject);
}

function AS_FlexContainer_1431f606916e4cd29ef166a8a4aed0aa(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeScreenTaskMeasurement");
}