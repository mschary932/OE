function frmMeasurementReadingShowPopUpKA(eventobject) {
    return AS_Button_a67ddb17b736488993492dfc5f049fc4(eventobject);
}

function AS_Button_a67ddb17b736488993492dfc5f049fc4(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showEditPopUp");
}