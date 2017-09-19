function frmTimeAndExpenseKA_OnUndoButton(eventobject) {
    return AS_Button_988ac38f94d54bbba9d11d0d4fc41718(eventobject);
}

function AS_Button_988ac38f94d54bbba9d11d0d4fc41718(eventobject) {
    kony.timer.cancel("deleteRecord");
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flxDeleteKA", "isVisible", false);
    formModel.performActionOnView("flxContentKA", "setEnabled", [true]);
}