function frmTaskExecutionBtnApplyViewsOnClickKA(eventobject) {
    return AS_Button_d314bf2db2d94b398f8e8a7f0209a243(eventobject);
}

function AS_Button_d314bf2db2d94b398f8e8a7f0209a243(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onHidePopUpCallOne");
}