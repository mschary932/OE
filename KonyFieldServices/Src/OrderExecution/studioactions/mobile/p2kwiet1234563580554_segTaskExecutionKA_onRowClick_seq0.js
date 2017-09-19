function p2kwiet1234563580554_segTaskExecutionKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("navigateToResourceExecution");
}