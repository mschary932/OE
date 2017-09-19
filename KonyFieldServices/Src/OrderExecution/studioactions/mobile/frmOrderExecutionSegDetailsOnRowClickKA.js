function frmOrderExecutionSegDetailsOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return p2kwiet1234563580351_segDetailsKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber);
}

function p2kwiet1234563580351_segDetailsKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var formmodel = controller.getFormModel();
    controller.performAction("showTaskExecutionForm");
}