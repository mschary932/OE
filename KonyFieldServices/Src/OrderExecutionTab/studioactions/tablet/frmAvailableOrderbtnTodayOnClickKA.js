function frmAvailableOrderbtnTodayOnClickKA(eventobject) {
    return AS_Button_ab09c7b3e435415dba6474827d06a40b(eventobject);
}

function AS_Button_ab09c7b3e435415dba6474827d06a40b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnTodayKA']);
}