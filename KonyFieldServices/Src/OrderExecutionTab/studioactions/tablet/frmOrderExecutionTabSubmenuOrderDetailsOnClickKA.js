function frmOrderExecutionTabSubmenuOrderDetailsOnClickKA(eventobject) {
    return AS_FlexContainer_936fb393d173469397a58a1e28500064(eventobject);
}

function AS_FlexContainer_936fb393d173469397a58a1e28500064(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderDetails");
}