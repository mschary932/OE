function p2kwiet1234563580351_lblAddressKA_onTouchEnd_seq0(eventobject, x, y) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showFrmDirectionKA");
}