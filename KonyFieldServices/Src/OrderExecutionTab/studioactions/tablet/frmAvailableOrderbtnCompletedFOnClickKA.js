function frmAvailableOrderbtnCompletedFOnClickKA(eventobject) {
    return AS_Button_3f212ec5571f404894bdbcbf39a94e3b(eventobject);
}

function AS_Button_3f212ec5571f404894bdbcbf39a94e3b(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnCompletedFKA']);
}