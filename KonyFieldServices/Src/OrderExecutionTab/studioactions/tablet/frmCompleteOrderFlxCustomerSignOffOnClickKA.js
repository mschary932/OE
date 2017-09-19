function frmCompleteOrderFlxCustomerSignOffOnClickKA(eventobject) {
    return AS_FlexContainer_37235bb1354d43fdb4e550b926aaf6f2(eventobject);
}

function AS_FlexContainer_37235bb1354d43fdb4e550b926aaf6f2(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSignOffFlex");
}