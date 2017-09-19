function frmMyOrderbtnNearMeOnClickKA(eventobject) {
    return AS_Button_ac4d8aa6b2484824bf03711a2fb27c39(eventobject);
}

function AS_Button_ac4d8aa6b2484824bf03711a2fb27c39(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnNearMeKA']);
}