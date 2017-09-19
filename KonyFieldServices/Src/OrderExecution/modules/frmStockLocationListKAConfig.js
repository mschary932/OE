var frmStockLocationListKAConfig = {
    "formid": "frmStockLocationListKA",
    "frmStockLocationListKA": {
      "widgettype": "Label",
      "entity": "Material",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "lblTypeKA": {
      "fieldprops": {
        "entity": "Material",
        "widgettype": "Label",
        "field": "mat_type",
        "parent" : "flxMaterialDetailsKA"
      }
    },
    "lblResourceIDKA": {
      "fieldprops": {
        "entity": "Material",
        "widgettype": "Label",
        "field": "id",
        "parent" : "flxMaterialDetailsKA"
      }
    },
    "lblDescKA": {
      "fieldprops": {
        "entity": "Material",
        "widgettype": "Label",
        "field": "mat_desc",
        "parent" : "flxMaterialDetailsKA"
      }
    },   
   "flxMaterialDetailsKA" : {
		"fieldprops" : {
			"entity" : "Material",
			"query" : "select Material.id,Material.Description as mat_desc,Material.Unit_id,Material.Type_id,MaterialType.Name as mat_type,Unit.Description,Inventory.Quantity as InvQuantity from Material,MaterialType,Unit,Inventory where Material.id='{x}' AND Unit.id=Material.Unit_id AND MaterialType.id=Material.Type_id AND Inventory.Material_id=Material.id",
			"querytype" : "sql",
			"widgettype" : "flexcontainer",
			 "field": "id"
		}
	},
	"lblUsedQuantityKA" : {
		"fieldprops" : {
			"entity" : "Material",
			"widgettype" : "Label",
			"field" : "InvQuantity",
			"parent" : "flxMaterialDetailsKA"
		}
	}
};