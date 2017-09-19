function frmMeasurementReadingBtnImageItemCancelledOnClickKA(eventobject) {
    return AS_Button_c8b001e7037346218f15768825f482ce(eventobject);
}

function AS_Button_c8b001e7037346218f15768825f482ce(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("cancelReadingCreation");
}