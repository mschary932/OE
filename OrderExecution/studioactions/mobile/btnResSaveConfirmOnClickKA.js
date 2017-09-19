function btnResSaveConfirmOnClickKA(eventobject) {
    return AS_Button_fee6238679bd430598da38a47adac698(eventobject);
}

function AS_Button_fee6238679bd430598da38a47adac698(eventobject) {
    if (kony.application.getCurrentForm().id == "frmStockLocationListKA" || kony.application.getCurrentForm().id == "frmStockLocationDetailsKA" || kony.application.getCurrentForm().id == "frmResourceExecutionKA") {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        var formModel = controller.getFormModel();
        var quantity = formModel.getViewAttributeByProperty("tbxQuantityKA", "text");
        var baseUnit = formModel.getViewAttributeByProperty("lblUnitKA", "text");
        if (quantity && quantity.length > 0) {
            var requiredQuantity = parseInt(quantity);
            if (requiredQuantity > 0) {
                quantity = quantity + " " + baseUnit;
                if (kony.application.getCurrentForm().id == "frmStockLocationDetailsKA") {
                    controller.performAction("requestStockTransfer", [quantity]);
                } else {
                    controller.performAction("requestPurchase", [quantity]);
                }
            } else {
                var utilitiesObj = utilities.getUtilityObj();
                alert(utilitiesObj.geti18nValueKA("i18n.common.materialQuantity.lowerLimitError.ValueKA"));
            }
        } else {
            var utilitiesObj = utilities.getUtilityObj();
            alert(utilitiesObj.geti18nValueKA("i18n.common.materialQuantity.emptyError.ValueKA"));
        }
    } else {
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
}