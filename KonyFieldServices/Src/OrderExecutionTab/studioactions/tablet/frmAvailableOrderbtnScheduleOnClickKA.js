function frmAvailableOrderbtnScheduleOnClickKA(eventobject) {
    return AS_Button_819e39c2c32348de89f0fb510b48dbc3(eventobject);
}

function AS_Button_819e39c2c32348de89f0fb510b48dbc3(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnScheduleKA']);
}