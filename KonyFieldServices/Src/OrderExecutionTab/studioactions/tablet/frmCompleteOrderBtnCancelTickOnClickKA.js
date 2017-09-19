function frmCompleteOrderBtnCancelTickOnClickKA(eventobject) {
    return AS_Button_0dcdb45d3717462e980d3c975e6bec33(eventobject);
}

function AS_Button_0dcdb45d3717462e980d3c975e6bec33(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showCompleteOrderMainPageOne");
}