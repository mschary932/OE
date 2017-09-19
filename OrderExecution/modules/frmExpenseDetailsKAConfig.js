var frmExpenseDetailsKAConfig = {
  "formid": "frmExpenseDetailsKA",
  "frmExpenseDetailsKA": {
    "entity": "WorkOrderTimeExpense",
    "query" : "select wote.Type,wote.Description, wote.ExecutionDate, wote.Amount, wote.Currency_id, wote.IsCustomerBillable, wote.Duration, (select tec.Description from TimeExpenseCategory tec where tec.id = wote.Category_id) as TimeExpnsCategory, (ifnull((select ut.Description from Unit ut where ut.id = wote.DurationUnit_id), (select c.Code from Currency c where c.id = wote.Currency_Id))) as baseUnit from WorkOrderTimeExpense wote where wote.id = '{x}'",
    "querytype" : "sql",    
    "objectServiceOptions":{
      	"access":"offline"
      },
    "objectServiceName":"OrderExecution",
 	},
 	"lblExpenseDetailsKa": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "TimeExpnsCategory",
         "text": "TimeExpnsCategory",
         "alias": "TimeExpnsCategory"
      }
    },
    "lblDescKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Description",
         "text": "Description",
         "alias": "Description"
      }
    },
    "lblDateKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "ExecutionDate",
          "text": "ExecutionDate",
         "alias": "ExecutionDate"
    
      }
    },
    "lblAmountKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Amount",
           "text": "Amount",
         "alias": "Amount"
    
      }
    },
    "lblCurrencyKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Currency_id",
           "text": "Currency_id",
         "alias": "Currency_id"
      }
    },
    "lblBillKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "IsCustomerBillable",
           "text": "IsCustomerBillable",
         "alias": "IsCustomerBillable"
      }
    },
  	"lblDurationKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "Duration",
           "text": "Duration",
         "alias": "Duration"
      }},
      
      "lblDurationValueKA": {
      "fieldprops": {
        "entity": "WorkOrderTimeExpense",
        "widgettype": "Label",
        "field": "baseUnit",
           "text": "baseUnit",
         "alias": "baseUnit"
      }
    }
};