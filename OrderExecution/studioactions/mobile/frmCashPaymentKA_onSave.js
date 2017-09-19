function frmCashPaymentKA_onSave(eventobject) {
    return AS_Button_daf0be5a16c14bfebcff55f2387d1302(eventobject);
}

function AS_Button_daf0be5a16c14bfebcff55f2387d1302(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("createPaymentRecord");
}