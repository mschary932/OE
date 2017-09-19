function frrmOABPostShowKA(eventobject) {
    return AS_Form_7ea9e8649f5e4877bf531d66ae1e7be3(eventobject);
}

function AS_Form_7ea9e8649f5e4877bf531d66ae1e7be3(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("loadBrowserData");
}