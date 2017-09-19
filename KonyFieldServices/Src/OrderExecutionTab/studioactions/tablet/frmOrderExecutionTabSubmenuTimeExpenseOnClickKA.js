function frmOrderExecutionTabSubmenuTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_927f05aa3c4e4530a6cd35521e85c99e(eventobject);
}

function AS_FlexContainer_927f05aa3c4e4530a6cd35521e85c99e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeExpense");
}