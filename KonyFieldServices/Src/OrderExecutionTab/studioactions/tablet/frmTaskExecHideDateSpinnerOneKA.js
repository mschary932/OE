function frmTaskExecHideDateSpinnerOneKA(eventobject) {
    return AS_Button_361b530de6774455a76249ebbb5ac916(eventobject);
}

function AS_Button_361b530de6774455a76249ebbb5ac916(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinnerOne");
}