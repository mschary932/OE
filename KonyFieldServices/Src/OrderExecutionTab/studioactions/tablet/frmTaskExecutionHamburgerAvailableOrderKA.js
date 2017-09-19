function frmTaskExecutionHamburgerAvailableOrderKA(eventobject) {
    return AS_FlexContainer_44202be7b3e149ee9c8830ee989d018e(eventobject);
}

function AS_FlexContainer_44202be7b3e149ee9c8830ee989d018e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showAvailableOrderListForm");
}