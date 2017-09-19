function frmAvailableOrderStatusFilterOnClickKA(eventobject) {
    return AS_FlexContainer_38cfb98e4a4445ddba70127e9f0f8390(eventobject);
}

function AS_FlexContainer_38cfb98e4a4445ddba70127e9f0f8390(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onFilterDrill", ['flxStatusFilterKA']);
}