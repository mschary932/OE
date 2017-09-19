function frmOrderExecutionDateSpinnerShowKA(eventobject, x, y) {
    return AS_Label_1451e2bd7ebe4dc38dc6b88f8545194a(eventobject, x, y);
}

function AS_Label_1451e2bd7ebe4dc38dc6b88f8545194a(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinner");
}