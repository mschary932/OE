function frmMyOrderbtnDay4OnClickKA(eventobject) {
    return AS_Button_6df789f6ae5149f1ad1cae4c479aef4b(eventobject);
}

function AS_Button_6df789f6ae5149f1ad1cae4c479aef4b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay4KA']);
}