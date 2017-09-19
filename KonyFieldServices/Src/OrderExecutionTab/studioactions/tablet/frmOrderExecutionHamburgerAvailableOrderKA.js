function frmOrderExecutionHamburgerAvailableOrderKA(eventobject) {
    return AS_FlexContainer_b078e30be4e546f59f8eb402f716fd52(eventobject);
}

function AS_FlexContainer_b078e30be4e546f59f8eb402f716fd52(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showAvailableOrderListForm");
}