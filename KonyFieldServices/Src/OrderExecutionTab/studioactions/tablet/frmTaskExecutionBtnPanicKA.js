function frmTaskExecutionBtnPanicKA(eventobject) {
    return AS_Button_e9c2a42c3c644aa291087d1378db3d73(eventobject);
}

function AS_Button_e9c2a42c3c644aa291087d1378db3d73(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showPanicScreen");
}