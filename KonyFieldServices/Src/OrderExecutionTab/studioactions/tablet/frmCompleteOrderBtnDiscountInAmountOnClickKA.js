function frmCompleteOrderBtnDiscountInAmountOnClickKA(eventobject) {
    return AS_Button_2d253a87053047deb577a5d9ca316d05(eventobject);
}

function AS_Button_2d253a87053047deb577a5d9ca316d05(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("giveDiscountInAmount");
}