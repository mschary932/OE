package test.java.orderexecution.forms;
import org.testng.Assert;
import test.common.AppElement;

import test.java.orderexecution.OrderExecutionWidgetId;

public class FormCashPaymentKA {
	
	public FormCashPaymentKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_lblPaymentSummaryKA"));
		}
	
   public void clickBack() throws Exception{
	   AppElement btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_btnBackKA"));
	   btnBackKA.click();
	   Thread.sleep(5000);
	  
  }
   public void OnSave()throws Exception{
		 AppElement btnDoneKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCashPaymentKA_btnSaveKA"));
		 btnDoneKA.click();
//		 if(SgConfiguration.getInstance().isAndroid()){
//			 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnConfirm"),10);
//			 AppElement btnConfirmKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnConfirm"));
//			 btnConfirmKA.click();
//		 }
		 Thread.sleep(3000);
		 String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA")).getText();
		 Assert.assertEquals(lblValue,"Complete Order");
		 
	}
   
}
