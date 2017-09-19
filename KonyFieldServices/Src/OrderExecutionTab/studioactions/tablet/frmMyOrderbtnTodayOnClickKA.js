function frmMyOrderbtnTodayOnClickKA(eventobject) {
    return AS_Button_1781a78ca03f4a07bae8c549cb919a9a(eventobject);
}

function AS_Button_1781a78ca03f4a07bae8c549cb919a9a(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnTodayKA']);
}