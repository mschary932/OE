var frmResourceExecutionKAConfig = {
    "formid": "frmResourceExecutionKA",
    "frmResourceExecutionKA": {

        "entity": "Material",
        "query": "select mat.unit_id as baseunitId,wom.RequestedUnit_id as ReqId,inv.Quantity as invQuantity,inv.id as InvID ,wom.isConsumable,wom.isConsumed,wom.id as key,mat.Description,mat.PartNumber,mat.id,mat.ModelNumber,matType.Name as mat_type,wom.RequestedQuantity as Quantity,mat.Barcode,un.Description as ReqUnitDesc,(select ut.Description from Unit ut left join Material mat on mat.Unit_id =ut.id where mat.id='{y}') as baseUnitDesc ,un.id as uomId from Material mat left join MaterialType matType on matType.id=mat.Type_id  left join Inventory inv on inv.Material_id = mat.id left join TaskMaterial wom on mat.id=wom.Material_id left join Unit un on un.id=wom.RequestedUnit_Id where mat.id='{y}' and (wom.id = '{x}')",
        "querytype": "sql",
         "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    
    },
    "lblResourceName1KA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Description",
            "text": "Description"
        }
    },
     "lblResourceNumberKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "id",
            "text": "id"
        }
    },
    
    "lblResourceUnitKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Quantity",
            "text": "Quantity"
        }
    },
    "lblMaterialTypeKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "mat_type",
            "text": "mat_type"
        }
    },
    "lblUnit1KA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "unitDesc",
            "text": "unitDesc"
        }
    },
    "lblDescriptionValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Description",
            "text": "Description"
        }
    },
    "lblMeasureValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "unitDesc",
            "text": "unitDesc"
        }
    },
    "lblModelValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "ModelNumber",
            "text": "ModelNumber"
        }
    },
    "lblBarcodeValueKA": {
        "fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "Barcode",
            "text": "Barcode"
        }
    },
    "lblPartNumberValueKA" : {
    		"fieldprops": {
            "entity": "Material",
            "widgettype": "Label",
            "field": "PartNumber",
            "text": "PartNumber"
        }    
    },
    "FlexFetchDataUoMKA":{
     "fieldprops": {    
    "entity": "Material",
    "widgettype": "Label",
     "field": "PartNumber",
    "query":"select uom.UnitFrom_id,ut.description from UnitConversion uom left join Unit ut on ut.id = uom.UnitFrom_id left join Material mat on mat.id = uom.Material_id and mat.Unit_id = uom.UnitTo_id where uom.Material_id = '{x}'",
    "querytype" : "sql"
    }
    },
    "lblUomValueKA": {
      "fieldprops": {
        "entity": "Material",
        "widgettype": "Label",
        "parent": "FlexFetchDataUoMKA",
        "field": "UnitTo_id"
      }
    }
};