package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormSelectPaymentMethodKA {

	public FormSelectPaymentMethodKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblCashPaymentKA"));
	}
	public FormCashPaymentKA clickCash() throws Exception{
		   AppElement btnCashKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblCashPaymentKA"));
		   btnCashKA.click();
		   Thread.sleep(5000);
		   AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_lblPaymentSummaryKA"));
		   return new FormCashPaymentKA();
	}	
	public void clickCard() throws Exception{
		   AppElement btnCardKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_lblCreditDebitCardKA"));
		   btnCardKA.click();
		   Thread.sleep(5000);		  
	  }
	public void clickBack() throws Exception {
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmSelectPaymentMethodKA_btnBackKA"));
		btnBackKA.click();
	}

}
