function frmAvailableOrderbtnStatusOnClickKA(eventobject) {
    return AS_Button_60e644d867014376b5a8392b5fb26dbd(eventobject);
}

function AS_Button_60e644d867014376b5a8392b5fb26dbd(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnStatusKA']);
}