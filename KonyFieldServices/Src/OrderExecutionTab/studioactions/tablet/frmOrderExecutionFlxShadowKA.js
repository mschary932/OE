function frmOrderExecutionFlxShadowKA(eventobject) {
    return AS_FlexContainer_acd995e2a55b449a9d64479cb198c6af(eventobject);
}

function AS_FlexContainer_acd995e2a55b449a9d64479cb198c6af(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}