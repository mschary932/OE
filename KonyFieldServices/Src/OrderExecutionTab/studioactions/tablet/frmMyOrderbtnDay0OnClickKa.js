function frmMyOrderbtnDay0OnClickKa(eventobject) {
    return AS_Button_962a7e1dcc984d00b3f602a7e5dcd959(eventobject);
}

function AS_Button_962a7e1dcc984d00b3f602a7e5dcd959(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay0KA']);
}