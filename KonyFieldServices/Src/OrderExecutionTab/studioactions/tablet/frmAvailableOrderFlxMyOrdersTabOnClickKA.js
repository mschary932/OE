function frmAvailableOrderFlxMyOrdersTabOnClickKA(eventobject) {
    return AS_FlexContainer_e9815e57d5fb45c59f8d7d874b043113(eventobject);
}

function AS_FlexContainer_e9815e57d5fb45c59f8d7d874b043113(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showMyOrderListForm");
}