function frmCompleteOrderFlexAddTimeExpenseOnClickKA(eventobject) {
    return AS_FlexContainer_04be3c86af8f49bd82de0350b228ee09(eventobject);
}

function AS_FlexContainer_04be3c86af8f49bd82de0350b228ee09(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("closeAddTimeExpense");
}