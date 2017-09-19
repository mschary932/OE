function frmEditExpenseItem_OnClick_BackEvent(eventobject) {
    return AS_Button_f8930e1abff54c36b53db6d7920e917c(eventobject);
}

function AS_Button_f8930e1abff54c36b53db6d7920e917c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}