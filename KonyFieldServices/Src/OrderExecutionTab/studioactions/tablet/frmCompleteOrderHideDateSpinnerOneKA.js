function frmCompleteOrderHideDateSpinnerOneKA(eventobject) {
    return AS_Button_fd12fbeeaac54bcebf8c6e8e9f6587b3(eventobject);
}

function AS_Button_fd12fbeeaac54bcebf8c6e8e9f6587b3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideDateSpinnerOne");
}