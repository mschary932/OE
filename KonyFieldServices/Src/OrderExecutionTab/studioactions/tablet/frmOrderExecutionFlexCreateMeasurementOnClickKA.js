function frmOrderExecutionFlexCreateMeasurementOnClickKA(eventobject) {
    return AS_FlexContainer_49fbd32451da4484a0ba4f51dd2ae319(eventobject);
}

function AS_FlexContainer_49fbd32451da4484a0ba4f51dd2ae319(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("CreateMeasurementPopUpHide");
}