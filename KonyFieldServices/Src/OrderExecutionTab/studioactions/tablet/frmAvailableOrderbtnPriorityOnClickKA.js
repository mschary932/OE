function frmAvailableOrderbtnPriorityOnClickKA(eventobject) {
    return AS_Button_069b984d55824c438514323cbc95e42d(eventobject);
}

function AS_Button_069b984d55824c438514323cbc95e42d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onViewsButtonClick", ['btnPriorityKA']);
}