function frmOrderExecutionFlexAddExpensePopupOnClickKA(eventobject) {
    return AS_FlexContainer_93207ea265624ff68c4e442ecd0ee407(eventobject);
}

function AS_FlexContainer_93207ea265624ff68c4e442ecd0ee407(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddExpenseItemPopUp");
}