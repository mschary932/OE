function frmStockLocationDetailsBackBtnClick(eventobject) {
    return AS_Button_f5115cd3e32e40b89cc7508aa9f1e8fe(eventobject);
}

function AS_Button_f5115cd3e32e40b89cc7508aa9f1e8fe(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack", [false]);
}