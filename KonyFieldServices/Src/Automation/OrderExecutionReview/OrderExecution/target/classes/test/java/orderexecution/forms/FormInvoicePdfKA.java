package test.java.orderexecution.forms;


import java.util.Date;

import org.codehaus.jettison.json.JSONObject;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormInvoicePdfKA extends OrderExecutionBaseTest{
	
	public FormInvoicePdfKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblHeaderKA"));
		}
	
   public FormSelectPaymentMethodKA clickMakePayment() throws Exception{
	   AppElement btnMakePaymentKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_btnMakePaymentKA"));
	   btnMakePaymentKA.click();
	   AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblPaymentSummaryKA"));	  
	   return new FormSelectPaymentMethodKA();
   }
   
   public void clickEmail() throws Exception {
	   AppElement btnEmailKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_btnEmailKA"));
	   btnEmailKA.click();
   }
   
   public void typeEmail() throws Exception {
	   AppElement tbxEmailKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_tbxEmailKA"));
//	   tbxEmailKA.setValue("");
	   tbxEmailKA.typeAndClickSearch("email@kony");
   }
   
   public void cancelEmail() throws Exception {
	   AppElement btnEmailCancelKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_btnEmailCancelKA"));
	   btnEmailCancelKA.click();
   }
   
   public void validateBackendData() throws Exception {
		AppElement lblInvoiceIDKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmInvoicePdfKA_lblInvoiceIDKA"));
		String invoiceID = lblInvoiceIDKA.getText();
		System.out.println("Entered to TestWOCount");
		JSONObject oerecords = sapDataConn.getDataJson(null, "EAM_WO_INVIOCE");
		System.out.println("records"+oerecords.toString());
		jsonserver.writeJSONFile(oerecords,"orderexecution_wo.json");
		Date todaysDate = new Date();
		String scheduledQuery="orderexecution_wo?INVOICE_NUM="+invoiceID;
		JSONObject result = jsonserver.queryJSON(scheduledQuery);
		System.out.println("#########\n "+result);
  }

}
