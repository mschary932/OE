function tmpStocksRequestBtnClick(eventobject, context) {
    return AS_Button_5c08f108a5d347568bcd2d439b2b49ec(eventobject, context);
}

function AS_Button_5c08f108a5d347568bcd2d439b2b49ec(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("requestStockTransfer");
}