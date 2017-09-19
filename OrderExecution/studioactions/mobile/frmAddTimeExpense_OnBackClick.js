function frmAddTimeExpense_OnBackClick(eventobject) {
    return AS_Button_de62a56f42784f609d7fe8c1f13cb29f(eventobject);
}

function AS_Button_de62a56f42784f609d7fe8c1f13cb29f(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}