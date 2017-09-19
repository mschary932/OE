function frmMyOrderFlxShadowOnClickKA(eventobject) {
    return AS_FlexContainer_72ce354837e64e448c7f7d028697397e(eventobject);
}

function AS_FlexContainer_72ce354837e64e448c7f7d028697397e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}