var frmOrderDetailsKAConfig = {
    "formid": "frmOrderDetailsKA",
    "frmOrderDetailsKA": {
      "entity": "WorkOrder",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
	  "additionalFields":["Address.AddressLine1","Address.AddressLine2", "Address.AddressLine3", "Address.City_id", "Address.Region_id", "Address.Zipcode","Address.Latitude","Address.Longitude"]
    },
    "lblTime": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "PlannedStartDate"
      }
    },
    "lblOrderValueIDKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblPriorityValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Priority"
      }
    },
    "lblStatusValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Status_id"
      }
    },
     "blDescriptionKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Description"
      }
    },
    "flxParentContactKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "query" :"select co.FirstName,co.LastName,co.id from Contact co, WorkOrderContact wco where wco.Contact_id=co.id and wco.Sequence= '1' and wco.WorkOrder_id = '{x}'",
        "querytype" : "sql",
        "field" : "Instructions"
      }
    },
    "lblContactDescriptionKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "parent": "flxParentContactKA",
        "field": "ContactName"
      }
    },
     "lblInstructionsValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Instructions"
      }
    },
    "lblLocationValueKA": {
     "fieldprops": {
      "entity": "WorkOrder",
      "widgettype": "Label",
       "field": "location"
     }
     },
    "flxObjectKA": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "additionalFields":["OrderObject.ObjectType"],
        "query" :"select Description,ObjectType from OrderObject where WorkOrder_id = '{x}'",
        "querytype" : "sql",
		"field": "Status_id"
      }
    },
    "lblObjectDescriptionKA": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "parent": "flxObjectKA",
        "field": "Description"
      }
    },
    "flxDurationKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
		"field": "Status_id",
        "query" : "select sum(taskduration)  as duration from (select (select ((ifnull(v1.value1,0) + ifnull(v3.value3,0)) - ifnull(v2.value2,0)) as Timer from "
			 + "(select sum(strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2)))) as value1 from StopWatch where StopWatch.Status_id = 'Paused' and StopWatch.task_id = ta.task_num and StopWatch.WorkOrder_id = ta.workorder_id) as v1 "
			 + "CROSS JOIN "
			 + "(select sum(strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2)))) as value2 from StopWatch where StopWatch.Status_id = 'Started' and StopWatch.task_id = ta.task_num and StopWatch.WorkOrder_id = ta.workorder_id) as v2 "
			 + "CROSS JOIN "
			 + "(SELECT "
			 + "CASE WHEN Status_id is 'Paused' THEN 0 "
			 + "WHEN Status_id is 'Completed' THEN (select case WHEN (count(\*)\%2) is 0 then strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2))) ELSE 0 END AS value4 from StopWatch where StopWatch.task_id = ta.task_num and StopWatch.WorkOrder_id = ta.workorder_id) "
			 + "ELSE strftime('\%s',datetime('now')) "
			 + "END AS value3 "
			 + "FROM StopWatch where StopWatch.task_id = ta.task_num and StopWatch.WorkOrder_id = ta.workorder_id ORDER BY ChangeTime DESC LIMIT 1) as v3) as taskduration from task ta where ta.workorder_id = '{x}')",
        "querytype" : "sql"
      }
    },
    "lblDurationValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "parent": "flxDurationKA",
        "field": "duration"
      }
    }
  };
  