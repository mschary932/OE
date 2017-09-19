function btnDecrementActionKA(eventobject) {
    return AS_Button_1628fa7f76bc4dd6b91420d86ee39d99(eventobject);
}

function AS_Button_1628fa7f76bc4dd6b91420d86ee39d99(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var utilitiesObj = utilities.getUtilityObj();
    var decrementedQuantity = utilitiesObj.roundNumber(formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), 2) - 1;
    if (decrementedQuantity < 0) {
        return;
    }
    formModel.setViewAttributeByProperty("tbxQuantityKA", "text", String(utilitiesObj.roundNumber(formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), 2) - 1));;
}