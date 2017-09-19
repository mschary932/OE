function frmExpenseDetailsTabBtnCancelTickOnClickKA(eventobject) {
    return AS_Button_a6d486d293e24ab09b5bf763cbfa907e(eventobject);
}

function AS_Button_a6d486d293e24ab09b5bf763cbfa907e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTaskExecutionForm");
}