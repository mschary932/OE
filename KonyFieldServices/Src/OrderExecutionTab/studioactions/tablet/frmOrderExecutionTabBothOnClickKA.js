function frmOrderExecutionTabBothOnClickKA(eventobject) {
    return AS_Button_40498c9a97ab48d68db7d805e0b4d3b9(eventobject);
}

function AS_Button_40498c9a97ab48d68db7d805e0b4d3b9(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showBothSegment");
}