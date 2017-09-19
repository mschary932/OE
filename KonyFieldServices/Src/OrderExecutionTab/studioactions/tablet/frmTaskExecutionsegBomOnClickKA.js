function frmTaskExecutionsegBomOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_a449a6440e41446ab8734f81893359a9(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_a449a6440e41446ab8734f81893359a9(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOnlineCallsFlex");
}