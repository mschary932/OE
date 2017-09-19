function btnResQuantityEditOnClickKA(eventobject, context) {
    return AS_Button_ac2ca60a750541228f1252dbebe4f932(eventobject, context);
}

function AS_Button_ac2ca60a750541228f1252dbebe4f932(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var controllerExxtensionObject = controller.getControllerExtensionObject();
    controllerExxtensionObject.setFormModelInfo("isDelete", false);
    var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "selectedItems")[0];
    //formModel.setViewAttributeByProperty("tbxQuantityKA","text",selRecord.RequestedQuantity);
    var utilitiesObj = utilities.getUtilityObj();
    utilitiesObj.editQuantity(selRecord);
    formModel.setViewAttributeByProperty("flxEditKA", "isVisible", true);
}