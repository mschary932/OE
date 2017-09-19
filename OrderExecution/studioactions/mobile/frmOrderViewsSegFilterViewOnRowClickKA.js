function frmOrderViewsSegFilterViewOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return p2kwiet1234563580441_segFilterViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber);
}

function p2kwiet1234563580441_segFilterViewKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    var selectedRecords = controller.getFormModel().getViewAttributeByProperty("segFilterViewKA", "selectedRowIndex");
    if (selectedRecords) {
        controller.performAction("showOrderFilterForm", [selectedRecords[1]]);
    }
}