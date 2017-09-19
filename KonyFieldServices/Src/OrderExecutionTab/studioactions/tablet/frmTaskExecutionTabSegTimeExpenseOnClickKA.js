function frmTaskExecutionTabSegTimeExpenseOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_468329e34e99417ebedd18c9e6a56160(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_468329e34e99417ebedd18c9e6a56160(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showExpenseDetailsForm");
}