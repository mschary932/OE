function frmOrderExecutionTabSubmenuOrderHistoryOnClickKA(eventobject) {
    return AS_FlexContainer_15b68913305f4703bfed7e1f07e57bbd(eventobject);
}

function AS_FlexContainer_15b68913305f4703bfed7e1f07e57bbd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderHistory");
}