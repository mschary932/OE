function tmpStocksCallBtnClick(eventobject, context) {
    return AS_Button_a46d508c624d4c61b1f9057e8b92f5f6(eventobject, context);
}

function AS_Button_a46d508c624d4c61b1f9057e8b92f5f6(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("callContact");
}