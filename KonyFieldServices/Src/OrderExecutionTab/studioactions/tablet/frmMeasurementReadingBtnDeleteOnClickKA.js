function frmMeasurementReadingBtnDeleteOnClickKA(eventobject) {
    return AS_Button_b4fbadb77cf54661952c9cb608286b5e(eventobject);
}

function AS_Button_b4fbadb77cf54661952c9cb608286b5e(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDeletePopUp");
}