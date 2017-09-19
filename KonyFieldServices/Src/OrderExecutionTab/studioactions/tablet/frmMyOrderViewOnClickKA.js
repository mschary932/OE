function frmMyOrderViewOnClickKA(eventobject) {
    return AS_FlexContainer_a3328a6ea4d1427e93f92750311423d4(eventobject);
}

function AS_FlexContainer_a3328a6ea4d1427e93f92750311423d4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDownCall");
}