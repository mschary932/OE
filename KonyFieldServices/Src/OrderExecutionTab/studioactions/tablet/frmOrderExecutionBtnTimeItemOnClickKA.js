function frmOrderExecutionBtnTimeItemOnClickKA(eventobject) {
    return AS_Button_5e9fe215fe684c9a8cef33d3b3ed1642(eventobject);
}

function AS_Button_5e9fe215fe684c9a8cef33d3b3ed1642(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showSegment");
}