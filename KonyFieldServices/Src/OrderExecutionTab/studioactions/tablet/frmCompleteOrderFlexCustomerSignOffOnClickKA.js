function frmCompleteOrderFlexCustomerSignOffOnClickKA(eventobject) {
    return AS_FlexContainer_4263bbe53cc94ea482650b259697280b(eventobject);
}

function AS_FlexContainer_4263bbe53cc94ea482650b259697280b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSignOffFlex");
}