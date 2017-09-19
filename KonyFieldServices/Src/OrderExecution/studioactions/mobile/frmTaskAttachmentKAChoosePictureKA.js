function frmTaskAttachmentKAChoosePictureKA(eventobject) {
    return AS_Button_14421e094c05474ba5847d55942c39e4(eventobject);
}

function AS_Button_14421e094c05474ba5847d55942c39e4(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmTaskAttachmentKA");
    controller.performAction("getImageFromGallery");
}