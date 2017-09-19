function frmStockDetailsRequestTransferBtnClick(eventobject) {
    return AS_Button_c7dfa6740c3a4859a80dd2c74df85b3a(eventobject);
}

function AS_Button_c7dfa6740c3a4859a80dd2c74df85b3a(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var controllerExxtensionObject = controller.getControllerExtensionObject();
    controllerExxtensionObject.setFormModelInfo("isDelete", false);
    var materialDescription = formModel.getViewAttributeByProperty("lblStockLocationNameKA", "text");
    var quantity = formModel.getViewAttributeByProperty("lblQuantityKA", "text");
    quantity = quantity.split(" ");
    // var requestedQuantityNumber=quantity[0];
    var requestedQuantityNumber = "1";
    var reqUnitDescription = quantity[1];
    var selRecord = {
        "MaterialDescription": materialDescription,
        "RequestedQuantityNumber": requestedQuantityNumber,
        "ReqUnitDescription": reqUnitDescription,
    };
    //formModel.setViewAttributeByProperty("tbxQuantityKA","text",selRecord.RequestedQuantity);
    var utilitiesObj = utilities.getUtilityObj();
    utilitiesObj.editQuantity(selRecord);
    formModel.setViewAttributeByProperty("flxEditKA", "isVisible", true);
}