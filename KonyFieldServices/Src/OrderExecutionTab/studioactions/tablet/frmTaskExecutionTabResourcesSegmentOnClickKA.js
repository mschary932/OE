function frmTaskExecutionTabResourcesSegmentOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_27cf5eb84b534afc88d9cda7e3b9fbc9(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_27cf5eb84b534afc88d9cda7e3b9fbc9(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResourceExecutionForm");
}