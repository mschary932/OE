function frmavailableOrderbtnDay0OnClickKA(eventobject) {
    return AS_Button_b61f283854a647808d69aa7b3e54dba1(eventobject);
}

function AS_Button_b61f283854a647808d69aa7b3e54dba1(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay0KA']);
}