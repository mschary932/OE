function frmNoteListSegmentOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_5d7a7da1426048b6a11042c3fa2697d1(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_5d7a7da1426048b6a11042c3fa2697d1(eventobject, sectionNumber, rowNumber) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showNotesDetailsForm");
    } catch (e) {
        kony.print("couldnot find the method");
    }
}