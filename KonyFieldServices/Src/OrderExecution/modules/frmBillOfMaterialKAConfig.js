//Type your code here
var frmBillOfMaterialKAConfig={
  "formid":"frmBillOfMaterialKA",
  "frmBillOfMaterialKA":{
    "entity":"ObjectBOM",
    "objectServiceOptions":{
      "access":"online"
    },
    "objectServiceName":"ObjectBOM",
    //"additionalFields":["ObjectBOM.Child_id","ObjectBOM.ChildDescription","ObjectBOM.IsLeaf","ObjectBOM.ObjectType"],
    
  },
  "segBOMKA":{
    "fieldprops":{
      "entity":"ObjectBOM",
      "widgettype":"Segment",
      "additionalFields":["ObjectBOM.Parent_id","ObjectBOM.ParentDescription"],
      "query":"&$filter=Parent_id eq '{x}' and ObjectType eq '{y}'",
    	"querytype":"odata",
      "field":{
        "lblComponentIDKA":{
      		"widgettype":"Label",
      		"field":"Child_id",
          	"text": "Child_id",
            "alias": "Child_id"
        },
        "lblComponentDescriptionKA":{
          "widgettype":"Label",
      		"field":"ChildDescription",
          	"text": "ChildDescription",
            "alias": "ChildDescription"
        },
        "lblObjectTypeKA":{
          "widgettype":"Label",
      		"field":"ObjectType",
          	"text": "ObjectType",
            "alias": "ObjectType"    		
          },
        "btnBOMSegmentKA":{
          "widgettype":"Button",
          "field":"IsLeaf",
          "text": "IsLeaf",
          "alias": "IsLeaf"
        }
        },
      }
    }
  
  
};