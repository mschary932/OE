var frmCompleteOrderSummaryKAConfig = {
    "formid": "frmCompleteOrderSummaryKA",
    "frmCompleteOrderSummaryKA": {
        "entity": "WorkOrder",
        "query" : "SELECT wo.ActualStartDate, wo.ActualEndDate, wo.Description, wo.Status_id, wo.Code, wo.id, wo.WorkCenter_id,  (strftime('%s',(substr(wo.ActualEndDate,1,4)||'-'||substr(wo.ActualEndDate,5,2)||'-'||substr(wo.ActualEndDate,7,2)||' '||substr(wo.ActualEndDate,9,2)||':'||substr(wo.ActualEndDate,11,2)||':'||substr(wo.ActualEndDate,13,2))) - strftime('%s',(substr(wo.ActualStartDate,1,4)||'-'||substr(wo.ActualStartDate,5,2)||'-'||substr(wo.ActualStartDate,7,2)||' '||substr(wo.ActualStartDate,9,2)||':'||substr(wo.ActualStartDate,11,2)||':'||substr(wo.ActualStartDate,13,2)))) as duration,(select count(*) from (select count(1) from TaskMaterial wom1 left join material m on wom1.material_id=m.id where (wom1.isConsumable='Y'  and cast(wom1.requestedquantity as int) > 0 ) and wom1.WorkOrder_id = 'E6B20EEB6D2060F1A42300505683BEB0' group by wom1.material_id)) as 'Materials',(select count(*) from (select count(1) from TaskMaterial wom2 left join material m1 on wom2.material_id=m1.id where (wom2.isConsumable='N' and cast(wom2.requestedquantity as int) > 0) and wom2.WorkOrder_id = '{x}' group by wom2.material_id)) as 'Tools',(select FirstName||' '||LastName from systemuser where WorkCenter_id = (select Workcenter_id from workorder where id = '{x}')) as 'TechnicianName' FROM workorder wo where wo.id = '{x}'",
        "querytype" : "sql",
        "objectServiceOptions":{
        "access":"offline"
      },
      "objectServiceName":"OrderExecution"
    },
    "lblOrderNumberValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Code"
      }
    },
    "lblDurationValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "duration"
      }
    },
    "lblStatusValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Status_id"
      }
    },
    "lblProblemDescriptionValueKA": {
      "fieldprops": {
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Description"
      }
    },
    "lblIToolsKA": {
      "fieldprops": {
        "controller": "WidgetController",
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Tools"
      }
    },
    "lblIMaterialKA": {
      "fieldprops": {
        "controller": "WidgetController",
        "entity": "WorkOrder",
        "widgettype": "Label",
        "field": "Materials"
      }
    },
	"lblStartDateKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "ActualStartDate"
        }
    },
	"lblStartTimeKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "ActualStartDate"
        }
    },
	"lblEndDateKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "ActualEndDate"
        }
    },
	"lblEndTimeKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "ActualEndDate"
        }
    },
  	"lblTechnicalResponseValueKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "TechnicianName"
        }
    }
  };
  