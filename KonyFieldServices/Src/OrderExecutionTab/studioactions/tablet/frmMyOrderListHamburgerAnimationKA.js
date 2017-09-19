function frmMyOrderListHamburgerAnimationKA(eventobject) {
    return AS_Button_907e37de3ece4b6bbb1c9734776f3ba1(eventobject);
}

function AS_Button_907e37de3ece4b6bbb1c9734776f3ba1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
}