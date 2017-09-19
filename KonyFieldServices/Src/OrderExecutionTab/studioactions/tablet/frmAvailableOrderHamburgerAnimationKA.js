function frmAvailableOrderHamburgerAnimationKA(eventobject) {
    return AS_Button_a0b71d5d881342c5882a7b6ece0d5916(eventobject);
}

function AS_Button_a0b71d5d881342c5882a7b6ece0d5916(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}