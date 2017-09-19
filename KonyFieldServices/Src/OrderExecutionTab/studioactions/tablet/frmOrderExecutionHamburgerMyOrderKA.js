function frmOrderExecutionHamburgerMyOrderKA(eventobject) {
    return AS_FlexContainer_c03e7c9868fa42bd82994ca517ab6096(eventobject);
}

function AS_FlexContainer_c03e7c9868fa42bd82994ca517ab6096(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showMyOrderListForm");
}