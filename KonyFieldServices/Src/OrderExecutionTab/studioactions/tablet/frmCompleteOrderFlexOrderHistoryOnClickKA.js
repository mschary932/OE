function frmCompleteOrderFlexOrderHistoryOnClickKA(eventobject) {
    return AS_FlexContainer_6671c13773d04fd1b72cb41e0332061a(eventobject);
}

function AS_FlexContainer_6671c13773d04fd1b72cb41e0332061a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderHistory");
}