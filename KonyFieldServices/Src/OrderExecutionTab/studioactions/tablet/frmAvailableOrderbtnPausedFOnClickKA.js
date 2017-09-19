function frmAvailableOrderbtnPausedFOnClickKA(eventobject) {
    return AS_Button_08099308ef6741d8a4fbf88adbf589d0(eventobject);
}

function AS_Button_08099308ef6741d8a4fbf88adbf589d0(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnPausedFKA']);
}