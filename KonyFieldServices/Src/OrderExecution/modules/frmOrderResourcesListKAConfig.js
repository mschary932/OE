
var frmOrderResourcesListKAConfig = {
    "formid": "frmOrderResourcesListKA",
    "frmOrderResourcesListKA": {
        "entity": "Material",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segSwipeKA": {
        "fieldprops": {
            "query": "select inv.id as InvID,inv.Quantity as InventoryQuantity,inv.IsLeaf,wom.id as womID,wom.RequestedUnit_id as ReqId,mat.unit_id as baseunitId,(select ifnull((select 'Scheduled'  from  WorkOrderMaterial wom1 where wom1.WorkOrder_id ='{x}' and wom1.Material_id=mat.id ), ifnull(( select 'Paused'  from  WorkOrderMaterial wom1 where wom1.WorkOrder_id ='{x}'and wom1.Material_id=mat.id), ifnull(( select 'Started'  from  WorkOrderMaterial wom1 where wom1.WorkOrder_id ='{x}'and wom1.Material_id=mat.id),ifnull(( select 'Completed'  from  WorkOrderMaterial wom1 where wom1.WorkOrder_id ='{x}' and wom1.Material_id=mat.id),'Scheduled'))))) as workOrderStatus ,   wom.isConsumable,MIN(wom.isConsumed) as isConsumed,mat.id as Code,mat.Description as Description, unt.Description as ReqUnitDesc,(select ut.Description from Unit ut where ut.id = mat.Unit_id) as baseUnit,  (select case when MIN(wom.isConsumed) is 'Y' then inv.quantity ELSE (inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) end as AQ) as AvailableQuantity, (select  SUM(ifnull(wom1.RequestedQuantity,0)*ifnull(uom.Factor,1)) from WorkOrderMaterial wom1 where wom1.WorkOrder_id = '{x}' and wom1.isConsumed='Y'  and  wom1.Material_id = mat.id) as ConsumedQuantity,  matType.name as MaterialType,SUM(wom.RequestedQuantity*ifnull(uom.Factor,1)) as RequestedQuantity  from Material mat   left outer join WorkOrderMaterial wom on wom.Material_id = mat.id and (wom.WorkOrder_id = '{x}') left outer join Unit unt on unt.id = wom.RequestedUnit_id left join Inventory inv on inv.material_id =  wom.material_id  left join MaterialType matType on matType.id=mat.Type_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id  where(wom.WorkOrder_id = '{x}' and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as DECIMAL(10,2))>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as DECIMAL(10,2))>0))) GROUP by mat.id, wom.isConsumable ORDER BY  wom.isConsumed ASC,mat.Description ASC,wom.isConsumable DESC",
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
              "text" : "isConsumedImage",
              "alias" : "isConsumedImage"
            },
              "btnBOMSegmentKA":{
                "widgettype": "Button",
              	"field": "IsLeaf",
              	"text" : "IsLeaf",
              	"alias" : "IsLeaf"
              }
            },

            "entity": "Material"
        }
    }
};