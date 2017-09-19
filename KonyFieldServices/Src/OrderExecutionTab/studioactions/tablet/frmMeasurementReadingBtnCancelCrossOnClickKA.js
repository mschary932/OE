function frmMeasurementReadingBtnCancelCrossOnClickKA(eventobject) {
    return AS_Button_73b0eaf47c2b42a59d50c7765626d785(eventobject);
}

function AS_Button_73b0eaf47c2b42a59d50c7765626d785(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelDeletePopUp");
}