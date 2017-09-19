var frmAddEditTimeItemKAConfig = {
    "formid": "frmAddEditTimeItemKA",
    "frmAddEditTimeItemKA": {
      "entity": "WorkOrderTimeExpense",
      "query" : "select wote.Type,wote.Description, wote.Category_id, wote.ExecutionDate, wote.Amount, wote.Currency_id, wote.IsCustomerBillable, wote.Duration, (select tec.Description from TimeExpenseCategory tec where tec.id = wote.Category_id) as TimeExpnsCategory, (ifnull((select ut.Description from Unit ut where ut.id = wote.DurationUnit_id), (select c.Code from Currency c where c.id = wote.Currency_Id))) as baseUnit from WorkOrderTimeExpense wote where wote.id = '{x}'",
      "querytype" : "sql",
        "objectServiceOptions":{
        "access":"offline"
      },
      "objectServiceName":"OrderExecution"
   
    },   
  
    "lblDescKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Description"
      }
    },
  
    "lblSelectDateKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "ExecutionDate"
      }
    },
    
     "lblDurationKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Duration"
      }
    }
    
  };
  