function frmCOImagesOnClickKA(eventobject) {
    return AS_Button_2429d907ee0e452d96db4e64637f8d7a(eventobject);
}

function AS_Button_2429d907ee0e452d96db4e64637f8d7a(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmCompleteOrderKA");
    controller.performAction("showCompleteImagesForm");
}