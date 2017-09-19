function btnQuantityOnDoneKA(eventobject, changedtext) {
    return AS_TextField_c2036478679546d19f307d7e9f0a21c7(eventobject, changedtext);
}

function AS_TextField_c2036478679546d19f307d7e9f0a21c7(eventobject, changedtext) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var utilitiesObj = utilities.getUtilityObj();
    var secIndex = kony.servicesapp.currIndices["secIndex"];
    var rowIndex = kony.servicesapp.currIndices["rowIndex"];
    //alert("inSave"+JSON.stringify(kony.servicesapp.currIndices));
    //alert("inSave"+JSON.stringify(kony.servicesapp.swipedIndices));
    var selRecord = formModel.getViewAttributeByProperty("segSwipeKA", "data")[secIndex][1][rowIndex];
    var resourcesUtilityObj = ResourcesUtility.getUtilityObj();
    resourcesUtilityObj.updateQuantity(true, formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), selRecord.InventoryQuantity, selRecord.womID, selRecord.ReqId, selRecord.baseunitId, selRecord.Material_id);
}