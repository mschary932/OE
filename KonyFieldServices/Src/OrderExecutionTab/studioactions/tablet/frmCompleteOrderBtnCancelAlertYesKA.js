function frmCompleteOrderBtnCancelAlertYesKA(eventobject) {
    return AS_Button_2f7abe540fa94484b28224f36927d675(eventobject);
}

function AS_Button_2f7abe540fa94484b28224f36927d675(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("saveMyCurrentInformation");
}