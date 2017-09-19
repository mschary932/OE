function frmTimeAndExpenseKA_onClickDelete(eventobject, context) {
    return AS_Button_139296ef78b74b129c5f511f348ecc6b(eventobject, context);
}

function AS_Button_139296ef78b74b129c5f511f348ecc6b(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var controllerExxtensionObject = controller.getControllerExtensionObject()
    var formModel = controller.getFormModel();
    var selRecord = formModel.getViewAttributeByProperty("SegTimeExpenseKA", "selectedItems")[0];
    formModel.performActionOnView("flxContentKA", "setEnabled", [false]);
    var utilitiesObj = utilities.getUtilityObj();
    controllerExxtensionObject.setFormModelInfo("isDelete", true);
    utilitiesObj.deleteRecord(selRecord);
}