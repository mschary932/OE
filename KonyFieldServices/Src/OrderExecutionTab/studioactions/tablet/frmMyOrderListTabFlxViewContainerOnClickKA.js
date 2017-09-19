function frmMyOrderListTabFlxViewContainerOnClickKA(eventobject) {
    return AS_FlexContainer_ea7042e5d6af4dcaac29de2d9ae30940(eventobject);
}

function AS_FlexContainer_ea7042e5d6af4dcaac29de2d9ae30940(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}