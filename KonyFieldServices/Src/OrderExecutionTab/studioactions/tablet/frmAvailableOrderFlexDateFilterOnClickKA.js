function frmAvailableOrderFlexDateFilterOnClickKA(eventobject) {
    return AS_FlexContainer_499cd5f869684efeb4f6819491e8094d(eventobject);
}

function AS_FlexContainer_499cd5f869684efeb4f6819491e8094d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxDateFilterKA']);
}