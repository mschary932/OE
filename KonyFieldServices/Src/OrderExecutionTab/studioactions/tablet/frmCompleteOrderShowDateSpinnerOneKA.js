function frmCompleteOrderShowDateSpinnerOneKA(eventobject, x, y) {
    return AS_Label_228c3b0a1f814310957abbffe52c8ffa(eventobject, x, y);
}

function AS_Label_228c3b0a1f814310957abbffe52c8ffa(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinnerOne");
}