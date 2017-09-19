function btnResDecrementOnClickKA(eventobject) {
    return AS_Button_21d7f761b73c4586bfa4f1986f475a66(eventobject);
}

function AS_Button_21d7f761b73c4586bfa4f1986f475a66(eventobject) {
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