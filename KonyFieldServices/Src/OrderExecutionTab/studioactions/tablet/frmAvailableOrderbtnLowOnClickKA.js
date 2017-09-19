function frmAvailableOrderbtnLowOnClickKA(eventobject) {
    return AS_Button_f5277d09687a4ad3ad9848df3280c031(eventobject);
}

function AS_Button_f5277d09687a4ad3ad9848df3280c031(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onPriorityFilterClick", ['btnLowKA']);
}