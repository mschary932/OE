function tmpResourceSegBtnOnConsumptionOnClickKA(eventobject, context) {
    return AS_Button_e85e49c0ec0b49349d18c49601d6b292(eventobject, context);
}

function AS_Button_e85e49c0ec0b49349d18c49601d6b292(eventobject, context) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("changeConsumedStatus");
}