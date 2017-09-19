function ChooseExistingImagefromGalleryOnClick(eventobject) {
    return AS_Button_fd24b17723b74ba39f5c7760527968b1(eventobject);
}

function AS_Button_fd24b17723b74ba39f5c7760527968b1(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("getImageFromGallery");
}