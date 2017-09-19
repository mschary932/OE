function frmCompleteOrderViewPopUpdoNothingKA(eventobject) {
    return AS_FlexContainer_c40b136fb6824aa0bf2508f923c2a570(eventobject);
}

function AS_FlexContainer_c40b136fb6824aa0bf2508f923c2a570(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("doNothingOnDeviceBackKA");
}