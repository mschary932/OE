function frmOrderExecutionShowDateSpinnerOneKa(eventobject, x, y) {
    return AS_Label_99039860b955466f9c3b8398d5a55abf(eventobject, x, y);
}

function AS_Label_99039860b955466f9c3b8398d5a55abf(eventobject, x, y) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDateSpinnerOne");
}