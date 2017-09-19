function btnAddReadingonSwipeOnClick(eventobject, context) {
    return AS_Button_629b46e1f677498ca52a14a6993b135f(eventobject, context);
}

function AS_Button_629b46e1f677498ca52a14a6993b135f(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var controllerExxtensionObject = controller.getControllerExtensionObject();
    controllerExxtensionObject.setFormModelInfo("isDelete", false);
    var selRecord = formModel.getViewAttributeByProperty("segMeasurementKA", "selectedItems")[0];
    controller.performAction("addMeasurementReading", [selRecord]);
}