function frmTenantPreshowKA(eventobject) {
    return AS_Form_40fdba16cbe945deb64603f2e78328f6(eventobject);
}

function AS_Form_40fdba16cbe945deb64603f2e78328f6(eventobject) {
    var cred = kony.store.getItem("SdkCred");
    if (cred !== null) {
        frmTenantKA.tbxAppKeyKA.text = cred["AppKey"];
        frmTenantKA.tbxAppSecretKA.text = cred["AppSecret"];
        frmTenantKA.tbxServiceURLKA.text = cred["ServiceURL"];
        frmTenantKA.tbxVersion.text = cred["Version"];
    }
}