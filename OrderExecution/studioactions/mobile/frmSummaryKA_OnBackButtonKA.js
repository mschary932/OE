function frmSummaryKA_OnBackButtonKA(eventobject) {
    return AS_Button_aeafcb91eea04ec69590be37a9f394a1(eventobject);
}

function AS_Button_aeafcb91eea04ec69590be37a9f394a1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}