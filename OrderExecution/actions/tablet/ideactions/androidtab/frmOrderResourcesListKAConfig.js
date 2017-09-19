var frmOrderResourcesListKAConfig = {
    "formid": "frmOrderResourcesListKA",
    "frmOrderResourcesListKA": {
        "entity": "Material",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "segDetailskA": {
        "fieldprops": {
            "query": "select inv.Quantity as InventoryQuantity,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description,unt.Description as ReqUnitDesc,(select ut.Description from Unit ut where ut.id = mat.Unit_id) as baseUnit,(inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) as AvailableQuantity, matType.name as MaterialType,SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity from Material mat left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = {x}) left outer join Unit unt on unt.id = mat.Unit_id left join Inventory inv on inv.material_id =  wom.material_id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where(wom.WorkOrder_id = {x}) and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as int)>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as int)>0)) GROUP by mat.id, wom.isConsumable ORDER BY mat.Description ASC",
            "querytype": "sql",
            "entity": "Material",
            "widgettype": "Segment",
            "field": {
                "lblTypeKA": {
                    "widgettype": "Label",
                    "text": "Description",
                    "field": "Description",
                    "alias": "Description"
                },
                "lblCodeKA": {
                    "widgettype": "Label",
                    "text": "Code",
                    "field": "Code",
                    "alias": "Code"
                },
                "lblMaterialKA": {
                    "widgettype": "Label",
                    "text": "MaterialType",
                    "field": "MaterialType",
                    "alias": "MaterialType"
                },
                "lblUsedQuantityValueKA": {
                    "text": "RequestedQuantity",
                    "field": "RequestedQuantity",
                    "alias": "RequestedQuantity"
                },
                "lblAvaialableQuantityValueKA": {
                    "widgettype": "Label",
                    "text": "AvailableQuantity",
                    "field": "AvailableQuantity",
                    "alias": "AvailableQuantity"
                },
                "btnConssumedKA": {
                    "widgettype": "Image",
                    "field": "isConsumedImage",
                    "text": "isConsumedImage",
                    "alias": "isConsumedImage"
                }
            },
            "entity": "Material"
        }
    }
};