function frmMyOrderbtnScheduledFOnClickKA(eventobject) {
    return AS_Button_856005fb84ea4e0bb2f5d7f24681270d(eventobject);
}

function AS_Button_856005fb84ea4e0bb2f5d7f24681270d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnScheduledFKA']);
}