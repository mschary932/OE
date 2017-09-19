var frmTaskResourcesListKAConfig = {
    "formid": "frmTaskResourcesListKA",
    "frmTaskResourcesListKA": {
      "entity": "Material",
      "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segSwipeKA": {
      "fieldprops": {
			"query":"select inv.id as InvID,inv.Quantity as InventoryQuantity,inv.IsLeaf as IsLeaf,mat.unit_id as baseunitId,wom.RequestedUnit_id as ReqId,taskEnt.Status_id as taskStatus,wom.ItemNumber,wom.id as womID,wom.isConsumable,(wom.isConsumed) ,mat.id as Code,mat.Description as Description,unt.id as ReqUnitID,unt.Description as ReqUnitDescription,(select ut.Description from Unit ut where ut.id = mat.Unit_id) as baseUnit,(select case when wom.isConsumed is 'Y' then inv.quantity ELSE (inv.quantity - SUM(ifnull(wom.RequestedQuantity,0)*ifnull(uom.Factor,1))) end as AQ) as AvailableQuantity, matType.name as MaterialType,(wom.RequestedQuantity) as RequestedQuantity from Material mat left outer join TaskMaterial wom on wom.Material_id = mat.id and (wom.TaskComp_id = '{x}') left outer join Unit unt on unt.id = wom.RequestedUnit_id left join Inventory inv on inv.material_id =  wom.material_id left join MaterialType matType on matType.id=mat.Type_id left join Task taskEnt on taskEnt.id = wom.TaskComp_id left join UnitConversion uom on wom.RequestedUnit_id = uom.UnitFrom_id and wom.Material_id=uom.Material_id and mat.Unit_id = uom.UnitTo_id where(wom.TaskComp_id ='{x}') and ((wom.isConsumable='Y' and cast(wom.RequestedQuantity as DECIMAL(10,2))>0) or (wom.isConsumable='N' and cast(wom.RequestedQuantity as DECIMAL(10,2))>0)) GROUP by mat.id, wom.isConsumable, wom.id ORDER BY  wom.isConsumed ASC,mat.Description ASC,wom.isConsumable DESC", 
      		"querytype":"sql",
            "widgettype":"Segment",
			"field":{
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