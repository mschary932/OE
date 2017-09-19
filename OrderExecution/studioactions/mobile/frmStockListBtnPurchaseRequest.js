function frmStockListBtnPurchaseRequest(eventobject) {
    return AS_Button_202ecce5824844f5a894774886a7d0b3(eventobject);
}

function AS_Button_202ecce5824844f5a894774886a7d0b3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("editQuantity");
}