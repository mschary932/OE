function frmTaskExecutionbtnBackMapOnClickKA(eventobject) {
    return AS_Button_82f956268a4e44fd9d9378f3da2ec3ad(eventobject);
}

function AS_Button_82f956268a4e44fd9d9378f3da2ec3ad(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backMapFlexOnlineCall");
}