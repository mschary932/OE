function frmTaskExecutionFlexViewGroup2OnClickKA(eventobject) {
    return AS_FlexContainer_feef9212f5714d3798252f73a1c43774(eventobject);
}

function AS_FlexContainer_feef9212f5714d3798252f73a1c43774(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showViewFilterOne");
}