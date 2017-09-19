function frmAvailableOrderFlxAvailableOrdersTabOnClickKA(eventobject) {
    return AS_FlexContainer_99b4a27fda8142e198b1e2ca019f0828(eventobject);
}

function AS_FlexContainer_99b4a27fda8142e198b1e2ca019f0828(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showHamburgerMenu");
    controller.performAction("showAndHideShadow");
    controller.performAction("showAvailableOrderListForm");
}