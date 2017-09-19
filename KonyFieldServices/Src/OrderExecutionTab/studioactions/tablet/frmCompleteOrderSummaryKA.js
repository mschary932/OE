function frmCompleteOrderSummaryKA(eventobject) {
    return AS_FlexContainer_5b323fc45af34e8eb2a6ec978336ffd3(eventobject);
}

function AS_FlexContainer_5b323fc45af34e8eb2a6ec978336ffd3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderSummary");
}