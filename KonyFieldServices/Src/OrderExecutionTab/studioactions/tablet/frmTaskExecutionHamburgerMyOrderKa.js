function frmTaskExecutionHamburgerMyOrderKa(eventobject) {
    return AS_FlexContainer_fb6963fe16554234906e3fc2b25afe5a(eventobject);
}

function AS_FlexContainer_fb6963fe16554234906e3fc2b25afe5a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showMyOrderListForm");
}