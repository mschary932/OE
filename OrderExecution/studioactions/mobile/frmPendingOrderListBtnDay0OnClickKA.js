function frmPendingOrderListBtnDay0OnClickKA(eventobject) {
    return AS_Button_4c05f0a489794ee295fadf67d9ba7885(eventobject);
}

function AS_Button_4c05f0a489794ee295fadf67d9ba7885(eventobject) {
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    if (!hamburgerMenu.IS_MENU_SHOWN) {
        controller.performAction("setSegmentListDataKA", [this.id]);
    } else {
        new hamburgerMenu().execute();
    }
}