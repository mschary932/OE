// config file for frmNoteList to map the result to widget
var frmNotesListKAConfig = {
    "formid": "frmNotesListKA",
    "frmNotesListKA": {
      "entity": "WorkOrderNote",
      "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "segNotesListKA": {
      "fieldprops": {
			"query": "select (case when (won.modifiedby !='' and won.lastmodifiedts>=won.createdts)then won.modifiedby else won.createdby end) as userID, won.*, sysur.FirstName,sysur.LastName from  WorkOrderNote won left join SystemUser sysur on sysur.id=UPPER(userID) where won.WorkOrder_id = '{x}' order by won.createdts desc,won.lastmodifiedts desc", 
      		"querytype":"sql",
      		"entity": "WorkOrderNote",
            "widgettype":"Segment",
            "field": {
            "lblCreatedUpdatedOnKA": {
              "widgettype": "Label",
              "field": "createdby",
              "text": "createdby",
              "alias": "createdby"
            },
            "lblDurationKA": {
              "widgettype": "Label",
              "field": "createdts",
              "text": "createdts",
              "alias": "createdts"
            },
            "lblTimeKA": {
              "widgettype": "Label",
              "field": "Note_id",
              "text": "Note_id",
              "alias": "Note_id"
            },
            "lblNotesDescKA": {
              "widgettype": "Label",
              "field": "Title",
              "text": "Title",
              "alias": "Title"
            },
            "lblCreatedByKA": {
              "widgettype": "Label",
              "field": "modifiedby",
              "text": "modifiedby",
              "alias": "modifiedby"
            }
        },
        "entity": "WorkOrderNote"
      }
    }
};