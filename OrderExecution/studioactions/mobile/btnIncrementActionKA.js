function btnIncrementActionKA(eventobject) {
    return AS_Button_487c301a057344dab067ed9f824d2202(eventobject);
}

function AS_Button_487c301a057344dab067ed9f824d2202(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var utilitiesObj = utilities.getUtilityObj();
    formModel.setViewAttributeByProperty("tbxQuantityKA", "text", String(utilitiesObj.roundNumber(formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), 2) + 1));
}