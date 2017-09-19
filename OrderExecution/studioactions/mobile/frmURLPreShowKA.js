function frmURLPreShowKA(eventobject) {
    return p2kwiet1234563580638_frmURLKA_preshow_seq0(eventobject);
}

function p2kwiet1234563580638_frmURLKA_preshow_seq0(eventobject) {
    var credStore = kony.store.getItem(kony.appfoundation.credStoreName);
    var storedTenant;
    var storedHostName;
    if (credStore !== null && credStore !== undefined) {
        key = credStore[kony.appfoundation.credStoreSecretKey];
        storedTenant = credStore[kony.appfoundation.credStoreTenant];
        storedHostName = credStore[kony.appfoundation.credStoreHostName];
    }
    if (storedTenant && storedHostName && storedTenant == kony.appfoundation.tenant) {
        frmTanentKA.tbxTenantKA.text = storedTenant;
        frmTanentKA.tbxURLKA.text = storedHostName;
    } else {
        frmTanentKA.tbxTenantKA.text = kony.appfoundation.tenant;
        frmTanentKA.tbxURLKA.text = kony.appfoundation.tenantURL;
    }
}