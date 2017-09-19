var frmTaskDetailsKAConfig = {
  "formid": "frmTaskDetailsKA",
  "frmTaskDetailsKA": {
    "entity": "Task",
    "query" : "SELECT  wo.instructions,wo.PlannedStartDate,t.StartDate, t.EndDate,(select count(1) from TaskMaterial wom1 left join material m on wom1.material_id=m.id where (wom1.isConsumable='Y'  and cast(wom1.requestedquantity as int) > 0 )and wom1.taskComp_id  = t.id ) as 'Materials',(select count(1) from TaskMaterial wom2 left join material m1 on wom2.material_id=m1.id where (wom2.isConsumable='N' and cast(wom2.requestedquantity as int) > 0) and wom2.taskComp_id  = t.id and wom2.material_id=m1.id ) as 'Tools' FROM task t inner join workorder wo on wo.id=t.workorder_id where t.id = '{x}' ",
    "querytype" : "sql",
    "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution"
  },
  "lblTimeKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "field": "PlannedStartDate",
      "widgettype": "Label"
    }
  },
  "lblHHMMKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "StartDate"
    }
  },
  "lblFinishedTimeKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "EndDate"
    }
  },
  "lblInfoKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "Instructions"
    }
  },
  "lblResourcesCountKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "ResourcesCount"
    }
  },
  "lblToolsCountKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "Tools"
    }
  },
  "lblMaterialCountKA": {
    "fieldprops": {
      "controller": "WidgetController",
      "entity": "Task",
      "widgettype": "Label",
      "field": "Material"
    }
  }

};