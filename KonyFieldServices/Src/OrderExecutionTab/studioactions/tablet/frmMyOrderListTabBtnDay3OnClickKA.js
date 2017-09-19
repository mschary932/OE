function frmMyOrderListTabBtnDay3OnClickKA(eventobject) {
    return AS_Button_e51e42cfd3d84ca2a46059507ce5dc01(eventobject);
}

function AS_Button_e51e42cfd3d84ca2a46059507ce5dc01(eventobject) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("onDayButtonClick", ['btnDay3KA']);
}