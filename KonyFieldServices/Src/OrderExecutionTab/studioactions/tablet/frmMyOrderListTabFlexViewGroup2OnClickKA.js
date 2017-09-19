function frmMyOrderListTabFlexViewGroup2OnClickKA(eventobject) {
    return AS_FlexContainer_a67fadd0d78b416fa5de198d67ba2c00(eventobject);
}

function AS_FlexContainer_a67fadd0d78b416fa5de198d67ba2c00(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onImgDownCall");
}