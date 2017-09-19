function frmAvailableOrderBtnCancelPanicCallKA(eventobject) {
    return AS_Button_1d64b4cd98f6485bb80e5433fa604c74(eventobject);
}

function AS_Button_1d64b4cd98f6485bb80e5433fa604c74(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromPanicScreen");
}