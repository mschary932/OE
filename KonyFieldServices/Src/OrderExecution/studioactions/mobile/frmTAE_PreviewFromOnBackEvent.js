function frmTAE_PreviewFromOnBackEvent(eventobject) {
    return AS_Button_51ab9df9d13943e19660b131acab9026(eventobject);
}

function AS_Button_51ab9df9d13943e19660b131acab9026(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}