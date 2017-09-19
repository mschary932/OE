function frmREbtnRemoveOnClickKA(eventobject) {
    return AS_Button_b38a59d8bcb646caac2b71e338df0512(eventobject);
}

function AS_Button_b38a59d8bcb646caac2b71e338df0512(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onRemoveCall");
}