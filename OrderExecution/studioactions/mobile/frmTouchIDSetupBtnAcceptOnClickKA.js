function frmTouchIDSetupBtnAcceptOnClickKA(eventobject) {
    return p2kwiet1234563580624_btnAcceptKA_onClick_seq0(eventobject);
}

function p2kwiet1234563580624_btnAcceptKA_onClick_seq0(eventobject) {
    kony.store.setItem("isTouchIDEnabled", true);
    kony.store.setItem("REMEMBERMEFLAG", true);
    kony.servicesapp.savePassword();
    if (kony.application.getPreviousForm().id !== "frmSettingsKA") kony.servicesapp.showFormOrderList();
    else frmSettingsKA.show();
}