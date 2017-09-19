function frmTaskExecutionsegStockLocationOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_e35268f1244e4369997453a1c47dfcd9(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_e35268f1244e4369997453a1c47dfcd9(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showStockLocationDetails");
}