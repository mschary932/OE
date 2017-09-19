var frmTimeAndExpenseAttachmentImageKAConfig = {
    "formid": "frmTimeAndExpenseAttachmentImageKA",
    "frmTimeAndExpenseAttachmentImageKA": {
      "widgettype": "Label",
      "entity": "TimeExpenseAttachment",
        "objectServiceOptions":{
      	"access":"offline"
      },
      "query":"select media.name,media.description,media.extension FROM media WHERE media.name = '{x}'",
      "objectServiceName":"OrderExecution"
    },
    "lblDayandTimeKA": {
      "fieldprops": {
        "entity": "TimeExpenseAttachment",
        "widgettype": "Label",
        "field": "EXTENSION"
      }
    }
  };