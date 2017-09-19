function frmAvailableOrderbtnday3OnClickKa(eventobject) {
    return AS_Button_2abb58ed422b496cafe5003f1ee2b2fb(eventobject);
}

function AS_Button_2abb58ed422b496cafe5003f1ee2b2fb(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay3KA']);
}