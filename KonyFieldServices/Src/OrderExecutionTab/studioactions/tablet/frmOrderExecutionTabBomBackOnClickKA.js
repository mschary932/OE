function frmOrderExecutionTabBomBackOnClickKA(eventobject) {
    return AS_Button_f7232137c25840d58e58450faf1d5f97(eventobject);
}

function AS_Button_f7232137c25840d58e58450faf1d5f97(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backFromBom");
}