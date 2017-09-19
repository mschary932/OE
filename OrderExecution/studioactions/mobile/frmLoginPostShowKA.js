function frmLoginPostShowKA(eventobject) {
    return p2kwiet1234563580219_frmLoginKA_postshow_seq0(eventobject);
}

function p2kwiet1234563580219_frmLoginKA_postshow_seq0(eventobject) {
    animateLoginScreen();
    kony.servicesapp.BACKGROUNDSYNCINPROGRESS = false;
    var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
    if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmLoginKA.switchonoffKA.nativeThumbLook = true;
    }
    frmLoginKA.tbxUserIDKA.setEnabled(false);
    frmLoginKA.tbxPasswordKA.setEnabled(false);
    frmLoginKA.tbxUserIDKA.setEnabled(true);
    frmLoginKA.tbxPasswordKA.setEnabled(true);
}