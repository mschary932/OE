function frmMyOrderFlxMyOrdersTabOnClickKA(eventobject) {
    return AS_FlexContainer_57d82c241cd4475aa7cfa5dc7b342310(eventobject);
}

function AS_FlexContainer_57d82c241cd4475aa7cfa5dc7b342310(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showMyOrderListForm");
}