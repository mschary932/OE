function frmAvailableOrderFlxDateFilterOnClickKA(eventobject) {
    return AS_FlexContainer_725ff6041ed0468da72d869c4aad8d0a(eventobject);
}

function AS_FlexContainer_725ff6041ed0468da72d869c4aad8d0a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxDateFilterKA']);
}