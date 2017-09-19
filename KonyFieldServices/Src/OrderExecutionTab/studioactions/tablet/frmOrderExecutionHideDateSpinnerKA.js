function frmOrderExecutionHideDateSpinnerKA(eventobject) {
    return AS_Button_9d5fb246f1ef4969abbb68021de70e9e(eventobject);
}

function AS_Button_9d5fb246f1ef4969abbb68021de70e9e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinner");
}