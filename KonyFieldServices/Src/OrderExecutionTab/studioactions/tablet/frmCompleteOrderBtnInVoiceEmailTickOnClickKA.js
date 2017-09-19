function frmCompleteOrderBtnInVoiceEmailTickOnClickKA(eventobject) {
    return AS_Button_28e16f11d4e2442381b57f97280cac2f(eventobject);
}

function AS_Button_28e16f11d4e2442381b57f97280cac2f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelEmailPopUp");
}