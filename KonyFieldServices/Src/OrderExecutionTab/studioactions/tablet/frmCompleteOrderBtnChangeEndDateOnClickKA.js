function frmCompleteOrderBtnChangeEndDateOnClickKA(eventobject) {
    return AS_Button_a89f379660564b5cac02f85873a1cdb4(eventobject);
}

function AS_Button_a89f379660564b5cac02f85873a1cdb4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDatePopUpFlex");
}