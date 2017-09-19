function frmCompleteOrderTabSubmenuOrderSummaryOnClickKA(eventobject) {
    return AS_FlexContainer_88805ceb55434289833a8c73d97faf4a(eventobject);
}

function AS_FlexContainer_88805ceb55434289833a8c73d97faf4a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderSummary");
}