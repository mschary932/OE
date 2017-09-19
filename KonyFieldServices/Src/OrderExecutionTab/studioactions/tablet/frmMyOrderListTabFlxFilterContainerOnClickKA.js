function frmMyOrderListTabFlxFilterContainerOnClickKA(eventobject) {
    return AS_FlexContainer_1d9d1240d26f48ec8614869747c8a45d(eventobject);
}

function AS_FlexContainer_1d9d1240d26f48ec8614869747c8a45d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCall");
}