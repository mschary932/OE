function AS_Switch_bc2e541b7e8b4571ad1956292f732585(eventobject) {
    var controller = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmOrderCompleteCheckListKA");
    controller.performAction("switchSlideCallback", ["1"]);
}