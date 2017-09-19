function frmOrderViewsSegOrderViewOnRowClickKA(eventobject, sectionNumber, rowNumber, selectedState) {
    return p2kwiet1234563580441_segOrderViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState);
}

function p2kwiet1234563580441_segOrderViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber, selectedState) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segOrderViewKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("onRowClickOfSegView", [selectedRecords[1]]);
    }
}