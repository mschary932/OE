function frmOrderExecutionOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return p2kwiet1234563580351_segDetailsKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber);
}

function p2kwiet1234563580351_segDetailsKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    try {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showTaskExecutionForm");
    } catch (e) {}
}