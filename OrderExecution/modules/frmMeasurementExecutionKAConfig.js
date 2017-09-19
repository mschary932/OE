var frmMeasurementExecutionKAConfig = {
    "formid": "frmMeasurementExecutionKA",
    "frmMeasurementExecutionKA": {     
      "entity": "Task",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "lblCurrentDayKA": {
      "fieldprops": {
        "entity": "Task",
        "widgettype": "Label",
        "field": "StartDate"
      }
    },  
    "lblStatusKA": {
      "fieldprops": {
        "entity": "Task",
        "widgettype": "Label",
        "field": "Status_id"
      }
    },
    "lblMeasurementDescriptionKA": {
      "fieldprops": {
        "entity": "Task",
        "widgettype": "Label",
        "field": "Description"
      }
    },     
   "flxStrtKA" : {
		"fieldprops" : {
			"entity" : "Task",
			"query" : "select (ifnull(v1.value1,0)+v3.value3) - v2.value2 as Timer from "
			 + "(select sum(strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2)))) as value1 from StopWatch where StopWatch.Status_id = 'Paused' and StopWatch.Task_id = '{x}' and StopWatch.WorkOrder_id = '{y}') as v1 "
			 + "CROSS JOIN "
			 + "(select sum(strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2)))) as value2 from StopWatch where StopWatch.Status_id = 'Started' and StopWatch.Task_id = '{x}' and StopWatch.WorkOrder_id = '{y}') as v2 "
			 + "CROSS JOIN "
			 + "(SELECT "
			 + "CASE WHEN Status_id is 'Paused' THEN 0 "
			 + "WHEN Status_id is 'Completed' THEN (select case WHEN (count(\*)\%2) is 0 then strftime('\%s',(substr(ChangeTime,1,4)||'-'||substr(ChangeTime,5,2)||'-'||substr(ChangeTime,7,2)||' '||substr(ChangeTime,9,2)||':'||substr(ChangeTime,11,2)||':'||substr(ChangeTime,13,2))) ELSE 0 END AS value4 from StopWatch where StopWatch.Task_id = '{x}' and StopWatch.WorkOrder_id = '{y}') "
			 + "ELSE strftime('\%s',datetime('now')) "
			 + "END AS value3 "
			 + "FROM StopWatch where StopWatch.Task_id = '{x}' and StopWatch.WorkOrder_id = '{y}' ORDER BY rowid DESC LIMIT 1) as v3",
			"querytype" : "sql",
			"widgettype" : "flexcontainer",
			 "field": "StartDate"
		}
	},
	"lblTimerKA" : {
		"fieldprops" : {
			"entity" : "Task",
			"widgettype" : "Label",
			"field" : "Description",
			"parent" : "flxStrtKA"
		}
	}, 
   "flxObjectNameKA": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "additionalFields":["OrderObject.ObjectType"],
        "query" :"select Description,ObjectType from OrderObject where WorkOrder_id = '{x}'",
        "querytype" : "sql",
		"field": "Status_id"
      }
    },
    "lblObjectNameKA": {
      "fieldprops": {
        "entity": "OrderObject",
        "widgettype": "Label",
        "parent": "flxObjectNameKA",
        "field": "Description"
      }
    },
     "segMeasurementKA": {
	  "fieldprops": {
        "query":"select COUNT(1) as Readings, mv.MeasurePoint_id,mv.OPMODE,mp.Description from Measurevalue mv left join measurepoint  mp on mp.id = mv.MeasurePoint_id where mv.task_id='{x}' and mv.WorkOrder_id='{y}' and (mv.OPMODE is Null OR mv.OPMODE!='D') group by mv.measurepoint_id",
        "querytype":"sql",
        "entity": "MeasureValue",
        "widgettype":"Segment",
        "field": {
            "lblMeasurementPointIDKA": {
              "widgettype": "Label",
              "field": "MeasurePoint_id",
              "text": "MeasurePoint_id",
              "alias":"MeasurePoint_id"
            },
            "lblMeasurementPointNameKA": {
              "widgettype": "Label",
              "field": "Description",
              "text": "Description",
              "alias": "Description"
            },
            "lblNumberOfReadingsKA": {
              "widgettype": "Label",
              "field": "Readings",
              "text": "Readings",
              "alias": "Readings",
              
            }
        }
      }
	  }
    };
    
 