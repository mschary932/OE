function frmCompleteOrderBtnBackEmailOnClickKA(eventobject) {
    return AS_Button_860321777dcc44f1980eadc6f43d9a70(eventobject);
}

function AS_Button_860321777dcc44f1980eadc6f43d9a70(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromSendEmailKA");
}