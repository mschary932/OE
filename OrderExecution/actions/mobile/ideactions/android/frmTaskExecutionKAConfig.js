var frmTaskExecutionKAConfig = {
    "formid": "frmTaskExecutionKA",
    "frmTaskExecutionKA": {
        "widgettype": "Label",
        "entity": "Task",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "lblDayandTimeKA": {
        "fieldprops": {
            "entity": "Task",
            "widgettype": "Label",
            "field": "StartDate"
        }
    },
    "lblStatusKA": {
        "fieldprops": {
            "entity": "Task",
            "widgettype": "Label",
            "field": "Status_id"
        }
    },
    "lblTaskDescriptionKA": {
        "fieldprops": {
            "entity": "Task",
            "widgettype": "Label",
            "field": "Description"
        }
    },
    "flxStrtKA": {
        "fieldprops": {
            "entity": "Task",
            "query": "select (ifnull(v1.value1,0)+v3.value3) - v2.value2 as Timer from " + "(select sum(strftime('\%s',changeTime)) as value1 from StopWatch where StopWatch.Status_id = 'Paused' and StopWatch.Task_id = {x} and StopWatch.WorkOrder_id = {y}) as v1 " + "CROSS JOIN " + "(select sum(strftime('\%s',changeTime)) as value2 from StopWatch where StopWatch.Status_id = 'Started' and StopWatch.Task_id = {x} and StopWatch.WorkOrder_id = {y}) as v2 " + "CROSS JOIN " + "(SELECT " + "CASE WHEN Status_id is 'Paused' THEN 0 " + "WHEN Status_id is 'Completed' THEN (select case WHEN (count(\*)\%2) is 0 then strftime('\%s',changeTime) ELSE 0 END AS value4 from StopWatch where StopWatch.Task_id = {x} and StopWatch.WorkOrder_id = {y}) " + "ELSE strftime('\%s',datetime('now')) " + "END AS value3 " + "FROM StopWatch where StopWatch.Task_id = {x} and StopWatch.WorkOrder_id = {y} ORDER BY rowid DESC LIMIT 1) as v3",
            "querytype": "sql",
            "widgettype": "flexcontainer",
            "field": "StartDate"
        }
    },
    "lblTimerKA": {
        "fieldprops": {
            "entity": "Task",
            "widgettype": "Label",
            "field": "Description",
            "parent": "flxStrtKA"
        }
    },
    "segTaskExecutionKA": {
        "fieldprops": {
            "query": "select inv.id as InvID,inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,(wom.isConsumed),wom.material_id ,mat.id as Code,mat.Description as Description,unt.id as ReqUnitID,unt.Description as ReqUnitDescription,(select ut.Description from Unit ut where ut.id = mat.Unit_id) as baseUnit,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity, matType.name as MaterialType,(wom.RequestedQuantity) as RequestedQuantity from Material mat left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.TaskComp_id = {x}) left outer join Unit unt on unt.id = mat.Unit_id left join Inventory inv on inv.material_id =  wom.material_id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where(wom.TaskComp_id ={x}) and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as int)>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as int)>0)) GROUP by mat.id, wom.isConsumable ORDER BY mat.Description ASC",
            "querytype": "sql",
            "entity": "Material",
            "widgettype": "Segment",
            "field": {
                "lblMaterialKA": {
                    "widgettype": "Label",
                    "field": "MaterialName",
                    "text": "MaterialName"
                },
                "lblTypeKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description"
                },
                "lblUsedQuantityValueKA": {
                    "widgettype": "Label",
                    "field": "RequestedQuantity",
                    "text": "RequestedQuantity"
                },
                "lblAvaialableQuantityValueKA": {
                    "widgettype": "Label",
                    "field": "AvailableQuantity",
                    "text": "AvailableQuantity"
                },
                "lblCodeKA": {
                    "widgettype": "Label",
                    "field": "Material_id",
                    "text": "Material_id"
                },
                "btnConssumedKA": {
                    "widgettype": "Label",
                    "field": "isConsumedImage",
                    "text": "isConsumedImage"
                }
            }
        }
    }
};