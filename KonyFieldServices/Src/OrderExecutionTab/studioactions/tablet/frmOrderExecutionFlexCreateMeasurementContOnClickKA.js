function frmOrderExecutionFlexCreateMeasurementContOnClickKA(eventobject) {
    return AS_FlexContainer_2a0356478d7540c6b452079dad23e522(eventobject);
}

function AS_FlexContainer_2a0356478d7540c6b452079dad23e522(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}