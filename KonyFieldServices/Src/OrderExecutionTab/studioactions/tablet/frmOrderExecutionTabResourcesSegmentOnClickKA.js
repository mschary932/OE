function frmOrderExecutionTabResourcesSegmentOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_9c99b3dc13874ca5849f91ebee737aaa(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_9c99b3dc13874ca5849f91ebee737aaa(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showResourceExecutionForm");
}