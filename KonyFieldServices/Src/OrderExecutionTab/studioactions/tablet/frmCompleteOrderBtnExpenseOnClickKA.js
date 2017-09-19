function frmCompleteOrderBtnExpenseOnClickKA(eventobject) {
    return AS_Button_46e3076549ad41a0b444fbee1d03fbf9(eventobject);
}

function AS_Button_46e3076549ad41a0b444fbee1d03fbf9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseSegment");
}