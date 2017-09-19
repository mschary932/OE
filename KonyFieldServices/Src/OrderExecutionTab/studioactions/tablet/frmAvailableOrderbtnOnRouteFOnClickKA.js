function frmAvailableOrderbtnOnRouteFOnClickKA(eventobject) {
    return AS_Button_d2637556db4c4e25a2060f6a4c9a5324(eventobject);
}

function AS_Button_d2637556db4c4e25a2060f6a4c9a5324(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnOnRouteFKA']);
}