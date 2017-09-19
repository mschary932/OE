function frmTouchIDSetupPreShowKA(eventobject) {
    return p2kwiet1234563580624_frmTouchIDSetupKA_preshow_seq0(eventobject);
}

function p2kwiet1234563580624_frmTouchIDSetupKA_preshow_seq0(eventobject) {
    var credStore = kony.store.getItem(kony.sdk.mvvm.credStoreName);
    var storedUsername;
    var key;
    if (credStore !== null && credStore !== undefined) {
        key = credStore[kony.sdk.mvvm.credStoreSecretKey];
        //storedUsername = kony.appfoundation.decryptData(key, credStore[kony.appfoundation.credStoreUsername]);
        storedUsername = credStore[kony.sdk.mvvm.credStoreUsername];
    }
    frmTouchIDSetupKA.lblUserNameKA.text = storedUsername;
}