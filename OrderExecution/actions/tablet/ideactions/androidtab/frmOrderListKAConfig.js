// config file for frmOrderList to map the result to widget
var frmOrderListKAConfig = {
    "formid": "frmOrderListKA",
    "frmOrderListKA": {
        "entity": "WorkOrder",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "segOrderListKA": {
        "fieldprops": {
            "query": " where WorkOrder.PlannedStartDate BETWEEN {x} and {y} and Status_id != 'Pending' order by WorkOrder.PlannedStartDate asc",
            "querytype": "sql",
            "entity": "WorkOrder",
            "widgettype": "Segment",
            "header_Fields": {
                "lblscheduledKA": {
                    "widgettype": "Label",
                    "text": "lblHeader",
                    "field": "lblHeader"
                },
                "imgScheduled": {
                    "widgettype": "Image",
                    "text": "imgHeader",
                    "field": "imgHeader"
                }
            },
            "field": {
                "lblTimeKA": {
                    "widgettype": "Label",
                    "field": "PlannedStartDate",
                    "text": "PlannedStartDate",
                    "alias": "PlannedStartDate"
                },
                "lblOrderNumKA": {
                    "widgettype": "Label",
                    "field": "Code",
                    "text": "Code",
                    "alias": "Code"
                },
                "lblInfoKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                "lblPriorityKA": {
                    "widgettype": "Label",
                    "field": "Priority.Description",
                    "text": "Priority",
                    "alias": "Priority"
                },
                "lblStatusKA": {
                    "widgettype": "Label",
                    "field": "Status_id",
                    "text": "Status_id",
                    "alias": "Status_id"
                },
                "imgStatusMachineStartedKA": {
                    "widgettype": "Image",
                    "field": "StatusImage",
                    "text": "StatusImage",
                    "alias": "StatusImage"
                },
                "ImgPriorityKA": {
                    "widgettype": "Image",
                    "field": "PriorityImage",
                    "text": "PriorityImage",
                    "alias": "PriorityImage"
                },
                "lblAddressKA": {
                    "widgettype": "Label",
                    "field": "Address_id",
                    "text": "Address_id",
                    "alias": "Address_id"
                }
            },
            "entity": "WorkOrder"
        }
    }
};