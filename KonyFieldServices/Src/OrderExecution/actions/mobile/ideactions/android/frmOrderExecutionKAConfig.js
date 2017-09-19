var frmOrderExecutionKAConfig = {
    "formid": "frmOrderExecutionKA",
    "frmOrderExecutionKA": {
        "entity": "WorkOrder",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "lblTimeKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "PlannedStartDate"
        }
    },
    "lblOrderNumKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "id"
        }
    },
    "lblPriorityKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            //  "field": "Priority_id"
            "field": "Priority"
        }
    },
    "lblStatusKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Status_id"
        }
    },
    "lblInfoKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Description"
        }
    },
    "FlxTmpOrderListKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "query": "select co.FirstName,co.LastName,co.id from Contact co, WorkOrderContact wco where wco.Contact_id=co.id and wco.Sequence= '1' and wco.WorkOrder_id = {y}",
            "querytype": "sql",
            "field": "Instructions"
        }
    },
    "lblNameKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "parent": "FlxTmpOrderListKA",
            "field": "ContactName"
        }
    },
    "FlxTmpWorkOrderMaterialKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "query": "select wom.id,wom.isConsumed,wom.isConsumable from WorkOrderMaterial wom left join WorkOrder wo on wom.Workorder_id = wo.id where wo.id = {z}",
            "querytype": "sql",
            "field": "Instructions"
        }
    },
    "lblWorkOrderMaterialIdKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "parent": "FlxTmpWorkOrderMaterialKA",
            "field": "id"
        }
    },
    "lblAddressKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Address_id"
        }
    },
    "segDetailsKA": {
        "fieldprops": {
            //"query":"Select WorkOrder.PlannedStartDate as PlannedStartDate, WorkOrder.id as id,	WorkOrder.Description as Description, Priority.description as Priority,	Status.Description as Status FROM WorkOrder left join Status on Status.id = WorkOrder.Status_id left join Priority on WorkOrder.Priority = Priority.id  ORDER BY WorkOrder.PlannedStartDate ASC",
            // "query": "  where Task.WorkOrder_id = {x} order by Task.id asc",
            "query": "  where Task.WorkOrder_id = {x}",
            "querytype": "sql",
            "entity": "Task",
            "widgettype": "Segment",
            "field": {
                "lbltaskDesc": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                "lblId": {
                    "widgettype": "Label",
                    "field": "id",
                    "text": "id",
                    "alias": "id"
                },
                "imgProgressKA": {
                    "widgettype": "Image",
                    "field": "StatusImage",
                    "text": "StatusImage",
                    "alias": "StatusImage"
                },
                "lbltasknum": { // should be removed in latest MVVM drops
                    "widgettype": "Label",
                    "field": "Task_num",
                    "text": "Task_num",
                    "alias": "Task_num"
                },
                "lblProgress": {
                    "widgettype": "Label",
                    "field": "Status_id",
                    "text": "Status_id",
                    "alias": "Status_id"
                }
            },
            "entity": "Task"
        }
    }
};