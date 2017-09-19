function frmMyOrderbtnPriorityOnClickKA(eventobject) {
    return AS_Button_413df6a24de24138837aa1928103aa7f(eventobject);
}

function AS_Button_413df6a24de24138837aa1928103aa7f(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnPriorityKA']);
}