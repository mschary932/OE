function frmOrderExecutionStepNavigationOnClickKA(eventobject) {
    return AS_Button_8679c86a41a54cd29cbee13e79dde1ad(eventobject);
}

function AS_Button_8679c86a41a54cd29cbee13e79dde1ad(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("startStepNavigation");
}