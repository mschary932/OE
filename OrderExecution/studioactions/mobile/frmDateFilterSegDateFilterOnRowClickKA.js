function frmDateFilterSegDateFilterOnRowClickKA(eventobject, sectionNumber, rowNumber, selectedState) {
    return p2kwiet1234563580139_segDateFilterKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState);
}

function p2kwiet1234563580139_segDateFilterKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segDateFilterKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("onRowClickOfSegFilter", [selectedRecords[1]]);
    }
}