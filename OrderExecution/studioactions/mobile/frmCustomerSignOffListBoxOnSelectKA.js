function frmCustomerSignOffListBoxOnSelectKA(eventobject) {
    return AS_ListBox_b958818663714ebd899af4c5585964bf(eventobject);
}

function AS_ListBox_b958818663714ebd899af4c5585964bf(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCustomerSignOffKA");
    controller.performAction("onSelectListBox");
}