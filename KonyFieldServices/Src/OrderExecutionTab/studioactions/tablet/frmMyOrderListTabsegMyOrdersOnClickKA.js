function frmMyOrderListTabsegMyOrdersOnClickKA(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_bedd9094504745f3b213e23462440a41(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_bedd9094504745f3b213e23462440a41(eventobject, sectionNumber, rowNumber) {
    kony.sdk.mvvm.KonyApplicationContext.init();
    var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController(kony.application.getCurrentForm().id);
    controller.performAction("showOrderExecutionForm");
}