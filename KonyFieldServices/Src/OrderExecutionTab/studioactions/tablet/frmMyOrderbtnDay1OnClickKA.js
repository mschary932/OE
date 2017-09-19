function frmMyOrderbtnDay1OnClickKA(eventobject) {
    return AS_Button_694200435c3241e2827e1200ac390922(eventobject);
}

function AS_Button_694200435c3241e2827e1200ac390922(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay1KA']);
}