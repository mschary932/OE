function frmStockDetailsCallBtnClick(eventobject) {
    return AS_Button_79a1993e1930415e806c22725a0e6930(eventobject);
}

function AS_Button_79a1993e1930415e806c22725a0e6930(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("callContact");
}