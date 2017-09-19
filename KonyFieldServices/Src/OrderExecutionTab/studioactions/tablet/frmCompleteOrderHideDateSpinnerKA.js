function frmCompleteOrderHideDateSpinnerKA(eventobject) {
    return AS_Button_522a23d446604d33b77c19a4a844e868(eventobject);
}

function AS_Button_522a23d446604d33b77c19a4a844e868(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinner");
}