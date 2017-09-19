function frmOrderExecutionTabDetailsContactChevronOnClickKA(eventobject) {
    return AS_Button_b10fa6d010bf4df0b5bfd9bb56c56d4d(eventobject);
}

function AS_Button_b10fa6d010bf4df0b5bfd9bb56c56d4d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showContactDetails");
}