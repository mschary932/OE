function frmCompleteOrderShowDateSpinnerKA(eventobject, x, y) {
    return AS_Label_719ad3eb095c4e4090f04205a31e642f(eventobject, x, y);
}

function AS_Label_719ad3eb095c4e4090f04205a31e642f(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinner");
}