var frmNotesDetailsKAConfig = {
    "formid": "frmNotesDetailsKA",
    "frmNotesDetailsKA": {
      "entity": "WorkOrderNote",
      "objectServiceOptions":{
      	"access":"offline"
      },
	  "query":"select createdbydetails.*,sysU.FirstName as modFirstName,sysU.LastName as modLastName from (select sys.FirstName as createdFirstName,sys.LastName as createdLastName,won.*,won.modifiedby as modi from WorkOrderNote won left join SystemUser sys on UPPER(won.createdby)=sys.id  where won.Note_Id = '{x}') as createdbydetails left join SystemUser as sysU on UPPER(createdbydetails.modi)=sysU.id;",
	  "querytype" : "sql",
      "objectServiceName":"OrderExecution"
    },
     "lblNotesDescKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "Title"
      }
    },
    "lblUpdatedCreatedOnKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "lastmodifiedts"
      }
    },
    "lblUpdatedCreatedByKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "modifiedby"
      }
    },
    "lblDescKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "Description"
      }
    },
     "lblCreatedOnValKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "createdts"
      }
    },
    "lblCreatedByValKA": {
      "fieldprops": {
        "entity": "WorkOrderNote",
        "widgettype": "Label",
        "field": "createdby"
      }
    }
};