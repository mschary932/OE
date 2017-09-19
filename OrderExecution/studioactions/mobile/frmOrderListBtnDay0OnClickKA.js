function frmOrderListBtnDay0OnClickKA(eventobject) {
    return p2kwiet1234563580384_btnDay0KA_onClick_seq0(eventobject);
}

function p2kwiet1234563580384_btnDay0KA_onClick_seq0(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("setSegmentListDataKA", [this.id]);
    } else {
        new hamburgerMenu().execute();
    }
}