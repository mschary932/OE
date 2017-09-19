function createMeasurementDoneKA(eventobject) {
    return AS_Button_e0dff8c846e0479b9feee47b0875d554(eventobject);
}

function AS_Button_e0dff8c846e0479b9feee47b0875d554(eventobject) {
    var controllerObject = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCreateMeasurementDescriptionKA").getControllerExtensionObject();
    controllerObject.createMeasurementNavigation();
}