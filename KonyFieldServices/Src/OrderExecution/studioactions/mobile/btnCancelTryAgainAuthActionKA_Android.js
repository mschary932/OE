function btnCancelTryAgainAuthActionKA_Android(eventobject) {
    return AS_Button_0e615dd07318438a9cdb5d11163abf7b(eventobject);
}

function AS_Button_0e615dd07318438a9cdb5d11163abf7b(eventobject) {
    kony.servicesapp.TOUCH_ID_ANDROID_FLAG = true;
    kony.localAuthentication.cancelAuthentication();
    frmLoginKA.FlxTouchAuthTryAgainFailKA.setVisibility(false);
}