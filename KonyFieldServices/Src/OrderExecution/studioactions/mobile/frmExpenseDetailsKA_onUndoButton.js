function frmExpenseDetailsKA_onUndoButton(eventobject) {
    return AS_Button_72a2656fe1ad4ef98f6562cc622b4765(eventobject);
}

function AS_Button_72a2656fe1ad4ef98f6562cc622b4765(eventobject) {
    kony.timer.cancel("deleteTimeExpenseRecord");
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formModel = controller.getFormModel();
    formModel.setViewAttributeByProperty("flxDeleteKA", "isVisible", false);
    formModel.performActionOnView("flexMainKA", "setEnabled", [true]);
}