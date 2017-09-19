function frmTaskExecutionTabSubmenuTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_08a79799abb74ed5b3f7b30c4122cf4a(eventobject);
}

function AS_FlexContainer_08a79799abb74ed5b3f7b30c4122cf4a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeExpense");
}