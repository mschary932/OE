var frmOrderExecutionKAConfig = {
    "formid": "frmOrderExecutionKA",
    "frmOrderExecutionKA": {
        "entity": "WorkOrder",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution",
        "additionalFields": ["Address.AddressLine1", "Address.AddressLine2", "Address.AddressLine3", "Address.City_id", "Address.Region_id", "Address.Zipcode", "Address.Latitude", "Address.Longitude"]
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
            "field": "Code"
        }
    },
	"lblTypeKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Type_id"
        }
    },
    "lblPriorityKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Priority",
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
            "query": "select co.FirstName,co.LastName,co.id from Contact co, WorkOrderContact wco where wco.Contact_id=co.id and wco.Sequence= '1' and wco.WorkOrder_id = '{y}'",
            "querytype": "sql",
            "field": "Instructions"
        }
    },
  "FlxTmpEventIdsKA": {
        "fieldprops": {
            "entity": "EventSurvey",
            "widgettype": "Label",
            "query": "select evnt.EventType_id from EventSurveyDefinition evnt",
            "querytype": "sql",
            "field": "EventType_id"
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
            "query": "select inv.id as InvID,inv.Quantity as InventoryQuantity,mat.id as Material_ID," +
                "(select  SUM(ifnull(wom1.RequestedQuantity,0)*ifnull(uom.Factor,1)) from TaskMaterial wom1 where wom1.WorkOrder_id = '{z}' and wom1.isConsumed='Y'  and  wom1.Material_id = mat.id) as ConsumedQuantity, " +
                "SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity from Material mat " +
                "left  join TaskMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = '{z}') " +
                "		left  join Unit unt on unt.id = wom.RequestedUnit_id " +
                "				left join Task taskEnt on taskEnt.id=wom.TaskComp_id " +
                "				left join Inventory inv on inv.material_id =  wom.material_id " +
                "				left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id " +
                "				where wom.WorkOrder_id = '{z}' and wom.isConsumable='Y'" +
                "				GROUP by mat.id, wom.isConsumable",
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
            "query": "  where Task.WorkOrder_id = '{x}'",
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
                },
                "imgMeasurementKA": {
                    "widgettype": "Image",
                    "field": "MeasurementImage",
                    "text": "MeasurementImage",
                    "alias": "MeasurementImage"
                },
                "lblMeasurementKA": {
                    "widgettype": "Label",
                    "field": "Type_id",
                    "text": "Type_id",
                    "alias": "Type_id"
                }
            },
            "entity": "Task"
        }
    }
};