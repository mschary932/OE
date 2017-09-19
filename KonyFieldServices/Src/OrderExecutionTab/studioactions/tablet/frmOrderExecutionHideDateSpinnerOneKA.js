function frmOrderExecutionHideDateSpinnerOneKA(eventobject) {
    return AS_Button_2a2036c59c5f4c5f823cd25f64358bbe(eventobject);
}

function AS_Button_2a2036c59c5f4c5f823cd25f64358bbe(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinnerOne");
}