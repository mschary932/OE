function frmOrderExceutionAddMeasurementDoneKA(eventobject) {
    return AS_Button_008896cd38474fcca74a0502c238cc3d(eventobject);
}

function AS_Button_008896cd38474fcca74a0502c238cc3d(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("CreateMeasurementPopUpShow");
}