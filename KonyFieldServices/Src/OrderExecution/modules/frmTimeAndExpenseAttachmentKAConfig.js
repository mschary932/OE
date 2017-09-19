var frmTimeAndExpenseAttachmentKAConfig = {
    "formid": "frmTimeAndExpenseAttachmentKA",
    "frmTimeAndExpenseAttachmentKA": {
      "widgettype": "Label",
      "entity": "TimeExpenseAttachment",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "objectServiceName":"OrderExecution",
      "query":"select TimeExpenseAttachment.BINARY_NAME FROM TimeExpenseAttachment LEFT JOIN media ON TimeExpenseAttachment.BINARY_NAME = media.name  WHERE  LOWER(TimeExpenseAttachment.DOC_TYPE) != 'signature' AND TimeExpenseAttachment.ORDER_NUM = '{x}'  and  (LOWER(TimeExpenseAttachment.EXTENSION) = 'png'  OR LOWER(TimeExpenseAttachment.EXTENSION) = 'jpeg' OR LOWER(TimeExpenseAttachment.EXTENSION) = 'jpg')"
    },
    "lblDayandTimeKA": {
      "fieldprops": {
        "entity": "TimeExpenseAttachment",
        "widgettype": "Label",
        "field": "BINARY_NAME"
      }
    },
     "lblExtension": {
      "fieldprops": {
        "entity": "TimeExpenseAttachment",
        "widgettype": "Label",
        "field": "extension"
      }
    }
  };