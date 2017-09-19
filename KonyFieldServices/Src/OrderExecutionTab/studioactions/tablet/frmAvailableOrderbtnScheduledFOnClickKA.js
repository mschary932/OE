function frmAvailableOrderbtnScheduledFOnClickKA(eventobject) {
    return AS_Button_44293ea6e3504f088bea351ab84840be(eventobject);
}

function AS_Button_44293ea6e3504f088bea351ab84840be(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onStatusFilterClick", ['btnScheduledFKA']);
}