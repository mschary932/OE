function frmStockLocationListSegRowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_c3f50b142caf4e5288b3c8e63ba818d2(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_c3f50b142caf4e5288b3c8e63ba818d2(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToStockLocationDetails");
}