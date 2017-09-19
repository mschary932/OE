function frmTAE_onClick_AddEvent(eventobject) {
    return AS_Button_8d6d82981a5f433ba0488ab7cab70f9c(eventobject);
}

function AS_Button_8d6d82981a5f433ba0488ab7cab70f9c(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToFormAddTimeExpenseKA");
}