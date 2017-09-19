function frmAvailableOrderFlxShadowOnClickKA(eventobject) {
    return AS_FlexContainer_4cbedf8fcfeb4c338d9f7417c80b8a10(eventobject);
}

function AS_FlexContainer_4cbedf8fcfeb4c338d9f7417c80b8a10(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}