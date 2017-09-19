function frmOrderExecutionTabSubmenuOrderResourcesOnClickKA(eventobject) {
    return AS_FlexContainer_39376b904b274ee1807cce46b7f6a67f(eventobject);
}

function AS_FlexContainer_39376b904b274ee1807cce46b7f6a67f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderResources");
}