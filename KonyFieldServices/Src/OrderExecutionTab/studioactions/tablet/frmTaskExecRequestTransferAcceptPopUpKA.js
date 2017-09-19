function frmTaskExecRequestTransferAcceptPopUpKA(eventobject) {
    return AS_Button_e986f35586d14721bd153c3d5abdf426(eventobject);
}

function AS_Button_e986f35586d14721bd153c3d5abdf426(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onAcceptRequestTransferPopUp");
}