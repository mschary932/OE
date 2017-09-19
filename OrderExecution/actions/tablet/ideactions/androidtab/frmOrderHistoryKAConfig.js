var frmOrderHistoryKAConfig = {
    "formid": "frmOrderHistoryKA",
    "frmOrderHistoryKA": {
        "entity": "WorkOrderHistory",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "segOrderHistoryKA": {
        "fieldprops": {
            "query": "select woh.*,sysur.FirstName,sysur.LastName,sysur.MobilePhone from  SystemUser sysur  left join WorkOrderHistory woh on  woh.WorkCenter_id = sysur.WorkCenter_id where woh.order_id = {x} ORDER BY StartDate DESC",
            "querytype": "sql",
            "entity": "WorkOrderHistory",
            "widgettype": "Segment",
            "field": {
                "lblDateKA": {
                    "widgettype": "Label",
                    "field": "StartDate",
                    "text": "StartDate",
                    "alias": "StartDate"
                },
                "lblTimeKA": {
                    "widgettype": "Label",
                    "field": "EndDate",
                    "text": "EndDate",
                    "alias": "EndDate"
                },
                "lblDescKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                "lblDurationKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Duration",
                    "alias": "Duration"
                },
                "lblContactKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "WorkCenter_id",
                    "alias": "WorkCenter_id"
                },
                "lblWorkIdKA": {
                    "widgettype": "Label",
                    "field": "Code",
                    "text": "Code",
                    "alias": "Code"
                },
                /*"imgStatusKA": {
                    "widgettype": "Image",
                       "field": "StatusImage",
             			 "text" : "StatusImage",
             			 "alias" : "StatusImage"            
                },*/
"lblStatusKA": {
                    "widgettype": "Label",
                    "field": "Status_id",
                    "text": "Status_id",
                    "alias": "Status_id"
                }
            },
            "entity": "WorkOrderHistory"
        }
    }
};