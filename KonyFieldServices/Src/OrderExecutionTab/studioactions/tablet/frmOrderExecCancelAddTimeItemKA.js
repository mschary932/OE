function frmOrderExecCancelAddTimeItemKA(eventobject) {
    return AS_Button_38abf6dfcfd847e181a1957e1e0182f7(eventobject);
}

function AS_Button_38abf6dfcfd847e181a1957e1e0182f7(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelAddTimeItemPopUp");
}