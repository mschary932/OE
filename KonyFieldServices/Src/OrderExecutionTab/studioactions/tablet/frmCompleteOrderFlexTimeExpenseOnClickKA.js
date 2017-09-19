function frmCompleteOrderFlexTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_96b8dbf47b3849349ef1017b34b82347(eventobject);
}

function AS_FlexContainer_96b8dbf47b3849349ef1017b34b82347(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeExpense");
}