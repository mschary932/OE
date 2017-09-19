function frmExpenseDetailshideDateSpinnerKA(eventobject) {
    return AS_Button_ab2e3b0fabc8428f924d8283ad828bed(eventobject);
}

function AS_Button_ab2e3b0fabc8428f924d8283ad828bed(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinner");
}