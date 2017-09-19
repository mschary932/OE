function navigateToFrmReadingExecutionKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_6377413835334bad86652a07f1d32ebe(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_6377413835334bad86652a07f1d32ebe(eventobject, sectionNumber, rowNumber) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    controller.performAction("segmentOnRowClick");
}