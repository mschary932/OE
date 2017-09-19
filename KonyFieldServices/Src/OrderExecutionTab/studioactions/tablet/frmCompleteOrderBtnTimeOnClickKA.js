function frmCompleteOrderBtnTimeOnClickKA(eventobject) {
    return AS_Button_4f2db0dc2ed143108cebb4431170e33b(eventobject);
}

function AS_Button_4f2db0dc2ed143108cebb4431170e33b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showTimeSegment");
}