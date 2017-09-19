function frmExpenseDetails_OnClick_BackEvent(eventobject) {
    return AS_Button_cb8415599d394a1e8a45f24df656b94f(eventobject);
}

function AS_Button_cb8415599d394a1e8a45f24df656b94f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}