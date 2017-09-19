function frmExpenseDetails_OnClick_BackToEditExpenseItem(eventobject) {
    return AS_Button_fe951d4853174543bd526934d7e0f2ec(eventobject);
}

function AS_Button_fe951d4853174543bd526934d7e0f2ec(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToEditScreen");
}