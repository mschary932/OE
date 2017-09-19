function btnDataHouseKeepingStartKA(eventobject) {
    return AS_Button_3af928a4f7b1479c81ae766e94cdc747(eventobject);
}

function AS_Button_3af928a4f7b1479c81ae766e94cdc747(eventobject) {
    kony.servicesapp = kony.servicesapp || {};
    var cleanData = new kony.servicesapp.DataHouseKeeping();
    kony.ui.Alert("Are you sure you want to continue with app maintainance?", callback, constants.ALERT_TYPE_CONFIRMATION, "Yes", "No", "Continue", {});

    function callback(response) {
        if (response) {
            cleanData.cleanUpData("WorkOrder", "PlannedStartDate", kony.servicesapp.DATA_CLEAN, "OrderExecution");
            cleanData.cleanUpData("PendingOrders", "PlannedStartDate", kony.servicesapp.DATA_CLEAN, "AvailableOrders");
        }
    }
}