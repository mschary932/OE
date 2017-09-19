function createMesaurementCancelKA(eventobject) {
    return AS_Button_1040a47ddfb54e8c8ae291afce5fa824(eventobject);
}

function AS_Button_1040a47ddfb54e8c8ae291afce5fa824(eventobject) {
    var controllerObject = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCreateMeasurementDescriptionKA").getControllerExtensionObject();
    controllerObject.navigateBackToOrderExecution();
}