function frmTaskExecutionTabLoadingKA(eventobject) {
    return AS_Button_bfeb19fb5e964c7e84523400d7764660(eventobject);
}

function AS_Button_bfeb19fb5e964c7e84523400d7764660(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showLoading");
}