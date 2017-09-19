function frmCustomerSignOffPostShowKA(eventobject) {
    return AS_Form_e58e433ed8814475a3e8bbe0fef0a06c(eventobject);
}

function AS_Form_e58e433ed8814475a3e8bbe0fef0a06c(eventobject) {
    var platFormName = kony.sdk.mvvm.Utils.getPlatformName();
    if (platFormName == kony.sdk.mvvm.Platforms["IPHONE"] || platFormName == 'ipad') {
        frmCustomerSignOffKA.switchProblemSolved1KA.nativeThumbLook = true;
    }
}