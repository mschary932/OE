function frmHistoryBackKA(eventobject) {
    return AS_Button_4920d80af9c9404e83d77e57105ba046(eventobject);
}

function AS_Button_4920d80af9c9404e83d77e57105ba046(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateBack", [true]);
}