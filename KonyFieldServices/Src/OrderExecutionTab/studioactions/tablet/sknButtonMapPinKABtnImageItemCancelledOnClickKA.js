function sknButtonMapPinKABtnImageItemCancelledOnClickKA(eventobject) {
    return AS_Button_9aa79a3a79ad410f8620f18f0df11869(eventobject);
}

function AS_Button_9aa79a3a79ad410f8620f18f0df11869(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("hideEditTimePopUp");
}