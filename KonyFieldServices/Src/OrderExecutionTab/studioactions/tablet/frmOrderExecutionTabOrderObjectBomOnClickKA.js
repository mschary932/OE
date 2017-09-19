function frmOrderExecutionTabOrderObjectBomOnClickKA(eventobject) {
    return AS_Button_4d8b20ed6f1045c0aa16a54547074236(eventobject);
}

function AS_Button_4d8b20ed6f1045c0aa16a54547074236(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderResources");
    controller.performAction("showBomFlex");
}