function frmCompleteOrderBtnPercentOnClickKA(eventobject) {
    return AS_Button_8a1a97fe65e549558e88f0d73a3e785a(eventobject);
}

function AS_Button_8a1a97fe65e549558e88f0d73a3e785a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("giveDiscountInPercent");
}