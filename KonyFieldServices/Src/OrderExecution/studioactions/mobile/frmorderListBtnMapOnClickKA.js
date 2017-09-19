function frmorderListBtnMapOnClickKA(eventobject) {
    return AS_Button_4089bee27fa040b7aeed01e6098c2299(eventobject);
}

function AS_Button_4089bee27fa040b7aeed01e6098c2299(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("actionForMap");
}