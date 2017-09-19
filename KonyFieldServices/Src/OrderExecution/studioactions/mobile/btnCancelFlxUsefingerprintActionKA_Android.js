function btnCancelFlxUsefingerprintActionKA_Android(eventobject) {
    return AS_Button_b3d1795d460f4c68b46261d47007e3ef(eventobject);
}

function AS_Button_b3d1795d460f4c68b46261d47007e3ef(eventobject) {
    kony.servicesapp.TOUCH_ID_ANDROID_FLAG = true;
    kony.localAuthentication.cancelAuthentication();
    frmLoginKA.flxUseFingerprintAuthKA.setVisibility(false);
}