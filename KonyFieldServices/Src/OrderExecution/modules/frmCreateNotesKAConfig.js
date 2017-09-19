// config file for frmCreateNotes
var frmCreateNotesKAConfig = {
    "formid": "frmCreateNotesKA",
    "frmCreateNotesKA": {
      "entity": "WorkOrderNote",
      "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "tbxTitleValueKA": {
        "fieldprops": {
            "widgettype": "TextField",
            "entity": "WorkOrderNote",
            "field": "Title"
        }
    },
    "txtAreaNotesValueKA": {
        "fieldprops": {
            "widgettype": "TextField",
            "entity": "WorkOrderNote",
            "field": "Description"
        }
    }
};