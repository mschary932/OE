function p2kwiet1234563580269_frmOrderCompleteCheckListKA_preshow_seq0(eventobject) {
    var platFormName = kony.appfoundation.Utils.getPlatformName();
    if (platFormName == kony.appfoundation.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmWorkConfirmationKA.switchProblemSolKA.nativeThumbLook = true;
        frmWorkConfirmationKA.switchRegResourceKA.nativeThumbLook = true;
        frmWorkConfirmationKA.switchClnLocKA.nativeThumbLook = true;
    }
}