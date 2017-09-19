var frmOrderResourceDetailsKAConfig = {
    "formid": "frmOrderResourceDetailsKA",
    "frmOrderResourceDetailsKA": {
        "entity": "Material",
        "query": "select mat.Description,inv.Quantity,(wom.RequestedQuantity) as RequestedQuantity,mat.id as Code from Material mat left join WorkOrderMaterial wom on wom.Material_id = mat.id left join Inventory inv on inv.Material_id = mat.id where mat.id= {x} and (wom.WorkOrder_id = {y}or wom.TaskComp_id ={z}) group by Code,wom.RequestedUnit_id",
        "querytype": "sql",
        "objectServiceOptions": {
            "access": "offline"
        },
        "objectServiceName": "OrderExecution"
    },
    "lblMaterialNameValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Description"
        }
    },
    "lblMatrialIdNumberValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Code"
        }
    },
    "lblQuantityNeededValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "RequestedQuantity"
        }
    },
    "lblAvailableValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Quantity"
        }
    }
};