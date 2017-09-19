function frmTAE_DetailsDeviceBackOnClick(eventobject) {
    return AS_Form_3a33321efcd4498ea10c72e7be784c79(eventobject);
}

function AS_Form_3a33321efcd4498ea10c72e7be784c79(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack");
}