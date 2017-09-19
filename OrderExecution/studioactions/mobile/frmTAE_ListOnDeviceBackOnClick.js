function frmTAE_ListOnDeviceBackOnClick(eventobject) {
    return AS_Form_b89fa49460684080b4fc8ed55d0ad389(eventobject);
}

function AS_Form_b89fa49460684080b4fc8ed55d0ad389(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}