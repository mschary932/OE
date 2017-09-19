function frmCompleteOrderBtnDoneFill2OnClickKA(eventobject) {
    return AS_Button_a192fdd69c3841ca8d09d5c06b28ee5f(eventobject);
}

function AS_Button_a192fdd69c3841ca8d09d5c06b28ee5f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showConfirmationPopUpFlex");
}