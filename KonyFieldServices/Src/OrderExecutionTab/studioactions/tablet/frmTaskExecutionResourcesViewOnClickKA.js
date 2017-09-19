function frmTaskExecutionResourcesViewOnClickKA(eventobject) {
    return AS_FlexContainer_f1630664ca98415a853aacdd1779e0e5(eventobject);
}

function AS_FlexContainer_f1630664ca98415a853aacdd1779e0e5(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showViewFilter");
}