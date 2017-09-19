function btnRemoveKASwipeOnClickKA(eventobject, context) {
    return AS_Button_b65a57ef9afd40cba6b02e9282dacbf4(eventobject, context);
}

function AS_Button_b65a57ef9afd40cba6b02e9282dacbf4(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExtensionObject = controller.getControllerExtensionObject()
    var formModel = controller.getFormModel();
    var selRecord = formModel.getViewAttributeByProperty("segMeasurementKA", "selectedItems")[0];
    var utilitiesObj = utilities.getUtilityObj();
    controllerExtensionObject.removeReadings(selRecord);
}