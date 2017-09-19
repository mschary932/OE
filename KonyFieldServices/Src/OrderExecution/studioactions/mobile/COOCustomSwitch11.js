function COOCustomSwitch11(eventobject) {
    return AS_TPW_99ddde7f3cd64f629877dd74068b3277(eventobject);
}

function AS_TPW_99ddde7f3cd64f629877dd74068b3277(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmWorkConfirmationKA");
    controller.performAction("switchSlideCallback", ["11"]);
}