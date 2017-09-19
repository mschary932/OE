function frmOASegOAOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_43984b7db6a74c48844dd098957a08ce(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_43984b7db6a74c48844dd098957a08ce(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("openAttachment");
}