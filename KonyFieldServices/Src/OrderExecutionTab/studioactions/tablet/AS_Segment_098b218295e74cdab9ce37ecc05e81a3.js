function AS_Segment_098b218295e74cdab9ce37ecc05e81a3(eventobject, sectionNumber, rowNumber) {
    //var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("backToListView");
}