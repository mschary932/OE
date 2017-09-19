function frmTaskExecShowDateSpinnerKA(eventobject, x, y) {
    return AS_Label_a1a58a22204c401b9e8df65ed249587a(eventobject, x, y);
}

function AS_Label_a1a58a22204c401b9e8df65ed249587a(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinner");
}