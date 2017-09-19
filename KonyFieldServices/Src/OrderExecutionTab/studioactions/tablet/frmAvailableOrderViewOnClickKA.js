function frmAvailableOrderViewOnClickKA(eventobject) {
    return AS_FlexContainer_e45d5b3e07aa4d9c91d27d869208aaef(eventobject);
}

function AS_FlexContainer_e45d5b3e07aa4d9c91d27d869208aaef(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDownCall");
}