function frmMyOrderbtnDay3OnClickKA(eventobject) {
    return AS_Button_a0155c18f9a1480bb65caac6d00f9fb0(eventobject);
}

function AS_Button_a0155c18f9a1480bb65caac6d00f9fb0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay3KA']);
}