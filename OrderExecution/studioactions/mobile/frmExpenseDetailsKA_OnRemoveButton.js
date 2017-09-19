function frmExpenseDetailsKA_OnRemoveButton(eventobject) {
    return AS_Button_e63cc0f059624ae189a12853b2da45e5(eventobject);
}

function AS_Button_e63cc0f059624ae189a12853b2da45e5(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("removeRecord");
}