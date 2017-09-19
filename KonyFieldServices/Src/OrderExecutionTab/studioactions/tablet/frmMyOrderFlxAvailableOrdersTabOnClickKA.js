function frmMyOrderFlxAvailableOrdersTabOnClickKA(eventobject) {
    return AS_FlexContainer_2cd6fc242b7345419298c594dde83635(eventobject);
}

function AS_FlexContainer_2cd6fc242b7345419298c594dde83635(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showAvailableOrderListForm");
}