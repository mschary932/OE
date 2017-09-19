function frmOrderListSegOrderListOnRowClickKA(eventobject, sectionNumber, rowNumber) {
    return p2kwiet1234563580384_segOrderListKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber);
}

function p2kwiet1234563580384_segOrderListKA_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
        var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
        controller.performAction("showOrderExecutionForm");
    } else {
        new hamburgerMenu().execute();
    }
}