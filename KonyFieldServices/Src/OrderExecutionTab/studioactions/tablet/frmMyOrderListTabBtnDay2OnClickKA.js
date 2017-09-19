function frmMyOrderListTabBtnDay2OnClickKA(eventobject) {
    return AS_Button_e8b08e2fb6604470b7078af2d5b1b7ea(eventobject);
}

function AS_Button_e8b08e2fb6604470b7078af2d5b1b7ea(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay2KA']);
}