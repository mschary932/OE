function frmOrderExecutionTabNotesListSegmentOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_198ed954da244eb38ed23fe831a894e5(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_198ed954da244eb38ed23fe831a894e5(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showDetailsOfNotes");
}