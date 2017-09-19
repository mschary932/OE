function btnResIncrementOnClickKA(eventobject) {
    return AS_Button_a288150eee4d48bd8a9eceea46265ccc(eventobject);
}

function AS_Button_a288150eee4d48bd8a9eceea46265ccc(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    var utilitiesObj = utilities.getUtilityObj();
    formModel.setViewAttributeByProperty("tbxQuantityKA", "text", String(utilitiesObj.roundNumber(formModel.getViewAttributeByProperty("tbxQuantityKA", "text"), 2) + 1));
}