function btnSaveQuantityOnSwipeActionKA(eventobject) {
    return AS_Button_efe81c488f6f4bfc877b0dc79576c4b7(eventobject);
}

function AS_Button_efe81c488f6f4bfc877b0dc79576c4b7(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var utilitiesObj = utilities.getUtilityObj();
    var secIndex = kony.servicesapp.currIndices["secIndex"];
    var rowIndex = kony.servicesapp.currIndices["rowIndex"];
    var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "data")[secIndex][1][rowIndex];
    var resourcesUtilityObj = ResourcesUtility.getUtilityObj();
    resourcesUtilityObj.updateQuantity(true, formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), selRecord.InventoryQuantity, selRecord.womID, selRecord.ReqId, selRecord.baseunitId, selRecord.Material_id);
}