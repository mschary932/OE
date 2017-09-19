function frmHMBtnManualSyncOnClickKA(eventobject) {
    return p2kwiet1234563580197_btnManualSyncKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580197_btnManualSyncKA_onClick_seq0(eventobject) {
    if (hamburgerMenu.IS_MENU_SHOWN) {
        new hamburgerMenu().execute();
    }
    kony.servicesapp.startManualSync(true);
}