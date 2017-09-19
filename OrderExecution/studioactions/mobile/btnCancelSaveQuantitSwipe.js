function btnCancelSaveQuantitSwipe(eventobject) {
    return AS_Button_d95a4a1cf68d4748974add8b9b92463e(eventobject);
}

function AS_Button_d95a4a1cf68d4748974add8b9b92463e(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    kony.servicesapp.currIndices = {};
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.performActionOnView("flexDetailsKA", "setEnabled", [true]);
    formModel.performActionOnView("btnBackKA", "setEnabled", [true]);
    formModel.setViewAttributeByProperty("flxEditKA", "isVisible", false);
}