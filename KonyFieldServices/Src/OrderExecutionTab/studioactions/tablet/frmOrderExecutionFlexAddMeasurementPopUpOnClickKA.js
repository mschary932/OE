function frmOrderExecutionFlexAddMeasurementPopUpOnClickKA(eventobject) {
    return AS_FlexContainer_6aec4c13280142c78177813cd16e474b(eventobject);
}

function AS_FlexContainer_6aec4c13280142c78177813cd16e474b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelMeasurementPopUp");
}