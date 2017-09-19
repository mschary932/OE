function frmLoginPreShowKA(eventobject) {
    return p2kwiet1234563580219_frmLoginKA_preshow_seq0(eventobject);
}

function p2kwiet1234563580219_frmLoginKA_preshow_seq0(eventobject) {
    frmLoginKA.flxInnerKA.opacity = 0;
    frmLoginKA.tbxUserIDKA.opacity = 0;
    frmLoginKA.tbxPasswordKA.opacity = kony.servicesapp.OPACITY_0;
    frmLoginKA.tbxPasswordKA.autoSuggestions = false;
    frmLoginKA.btnLoginKA.opacity = 0;
    frmLoginKA.flxSwitchKA.opacity = 0;
    var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
    if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmLoginKA.flxSwitchToggleKA.width = "56dp";
        frmLoginKA.flxSwitchToggleKA.height = "100%";
        frmLoginKA.switchonoffKA.nativeThumbLook = true;
    }
    kony.servicesapp.populateUserCredentialsFromStore();
    frmLoginKA.lblVersionNumberKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("VERSION_NUMBER");
    frmLoginKA.lblBuildNoKA.text = kony.servicesapp.constants.getServiceConstantsObj().getValue("BUILD_NUMBER");
    if (kony.servicesapp.isAppLaunchedFirstTime) animateLoginScreen();
    frmLoginKA.flxUseFingerprintAuthKA.setVisibility(false);
    frmLoginKA.FlxTouchAuthTryAgainFailKA.setVisibility(false);
}