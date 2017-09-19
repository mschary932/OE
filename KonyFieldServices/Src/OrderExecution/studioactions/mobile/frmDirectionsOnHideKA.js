function frmDirectionsOnHideKA(eventobject) {
    return AS_Form_343f8d6f744f4363978a07356c7d7cb6(eventobject);
}

function AS_Form_343f8d6f744f4363978a07356c7d7cb6(eventobject) {
    try {
        var watchID = kony.sdk.mvvm.frmDirectionsKAControllerExtension.WATCHID;
        kony.location.clearWatch(watchID);
    } catch (err) {
        kony.sdk.mvvm.log.error("error in Blogic onHideOfForm : " + err);
    }
}