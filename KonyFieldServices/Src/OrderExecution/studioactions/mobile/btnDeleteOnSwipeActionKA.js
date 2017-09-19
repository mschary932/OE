function btnDeleteOnSwipeActionKA(eventobject, context) {
    return AS_Button_9de8ba184541419eab593f5d5002d7c8(eventobject, context);
}

function AS_Button_9de8ba184541419eab593f5d5002d7c8(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExxtensionObject = controller.getControllerExtensionObject()
    var formModel = controller.getFormModel();
    var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
    //formModel.setViewAttributeByProperty("tbxQuantityKA","text",selRecord.RequestedQuantity);
    var utilitiesObj = utilities.getUtilityObj();
    controllerExxtensionObject.setFormModelInfo("isDelete", true);
    utilitiesObj.deleteQuantity(selRecord);
}