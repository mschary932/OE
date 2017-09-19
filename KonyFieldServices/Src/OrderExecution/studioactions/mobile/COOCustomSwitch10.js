function COOCustomSwitch10(eventobject) {
    return AS_TPW_91f14b4ff28448b9acc306765a8e5b8a(eventobject);
}

function AS_TPW_91f14b4ff28448b9acc306765a8e5b8a(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["10"]);
}