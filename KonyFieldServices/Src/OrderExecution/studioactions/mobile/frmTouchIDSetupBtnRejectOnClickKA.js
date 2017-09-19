function frmTouchIDSetupBtnRejectOnClickKA(eventobject) {
    return p2kwiet1234563580624_btnRejectKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580624_btnRejectKA_onClick_seq0(eventobject) {
    kony.store.setItem("isTouchIDEnabled", false);
    if (kony.application.getPreviousForm().id !== "frmSettingsKA") kony.servicesapp.showFormOrderList();
    else frmSettingsKA.show();
}