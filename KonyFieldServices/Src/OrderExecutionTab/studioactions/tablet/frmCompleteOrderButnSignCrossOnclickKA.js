function frmCompleteOrderButnSignCrossOnclickKA(eventobject) {
    return AS_Button_97fa0f473e844680a257ca2d85e48f81(eventobject);
}

function AS_Button_97fa0f473e844680a257ca2d85e48f81(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelConfirmationAndCancelPopUp");
}