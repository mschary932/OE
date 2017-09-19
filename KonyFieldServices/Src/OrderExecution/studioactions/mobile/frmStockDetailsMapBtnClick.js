function frmStockDetailsMapBtnClick(eventobject) {
    return AS_Button_82f0d805554d46f49ba777a01c374d0b(eventobject);
}

function AS_Button_82f0d805554d46f49ba777a01c374d0b(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFrmDirectionKA");
}