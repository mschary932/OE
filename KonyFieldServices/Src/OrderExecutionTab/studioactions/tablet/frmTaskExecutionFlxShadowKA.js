function frmTaskExecutionFlxShadowKA(eventobject) {
    return AS_FlexContainer_7494f0282bb04bc59e9a6f5c81b1ac97(eventobject);
}

function AS_FlexContainer_7494f0282bb04bc59e9a6f5c81b1ac97(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}