package test.java.orderexecution.forms;

import org.testng.Assert;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormSurveyKA;

public class FormCompleteOrderKA {
	 private FormTimeAndExpenses frmTimeAndExpenses;
	 private FormAddTimeAndExpenses formAddTimeAndExpenses;
	 private FormAddTimeItem formAddTimeItem;
	 private FormAddExpenseItem formAddExpenseItem;
	 
	AppElement btnOrderDetailsKA;
	AppElement flxWorkConfirmationKA;
	AppElement flxCustomerSignKA;
	AppElement btnCheckList;
	AppElement flxContainerPaymentKA;
	AppElement btnDoneKA;
	AppElement btnAttachmentsKA;
	AppElement btnHistoryKA;
	AppElement flxScrollTypesKA;
	public FormCompleteOrderKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
		}
 	public void CheckSwipe() throws Exception{
		flxScrollTypesKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_flxScrollTypesKA"));
		flxScrollTypesKA.swipeLeft(50,true);
	} 
	public FormCompleteOrderSummaryKA onClickSummary()throws Exception{
		btnOrderDetailsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnOrderDetailsKA"));
		btnOrderDetailsKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderSummaryKA_lblHeaderKA"),10);
		return new FormCompleteOrderSummaryKA();
	}
	public FormSurveyKA onClickChecklist()throws Exception{
		btnCheckList = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblChecklistKA"));
		btnCheckList.click();
		Thread.sleep(18000);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSurveyKA_flxSection"));
		return new FormSurveyKA();
	}
  public  FormWorkConfirmationKA OnClickWorkConfirmation() throws Exception{
	  flxWorkConfirmationKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_flxWorkConfirmationKA"));
	  flxWorkConfirmationKA.click();
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmWorkConfirmationKA_lblCompleteOrderCLKA"),10);
	  return new FormWorkConfirmationKA();
  }
  public FormCustomerSignOffKA OnClickCustomerSignOff() throws Exception{
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_lblCompleteOrderKA"));
	  flxCustomerSignKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_flxCustomerSignKA"));
	  flxCustomerSignKA.click();
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmCustomerSignOffKA_lblCustomerSignOffKA"),10);
	  return new FormCustomerSignOffKA();
	
  }
   public FormOrderAttachments onClickOrderAttachment()throws Exception{
  btnAttachmentsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnAttachmentsKA"));
  btnAttachmentsKA.click();
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"),10);
	return new FormOrderAttachments();
}

public FormOrderHistoryKA onClickOrderHistory()throws Exception{
  btnHistoryKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnHistoryKA"));
  btnHistoryKA.click();
	AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderHistoryKA_lblHeaderKA"),10);
	return new FormOrderHistoryKA();
} 
  public void OrderDone()throws Exception{
	  btnDoneKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnDoneKA"));
	  btnDoneKA.click();
	  AppSpecificFunctions.handleSync();
  }
  public void clickOrderResources()throws Exception{
	  AppElement btnresource=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnOrderResKA"));
	  btnresource.click();
  }
  public void clickOrderImages()throws Exception{
	  AppElement btnImage=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnImagesKA"));
	  btnImage.click();
  }
  public  FormSummaryKA OnClickPayment() throws Exception{
	  flxContainerPaymentKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_flxContainerPaymentKA"));
	  flxContainerPaymentKA.click();
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSummaryKA_lblSummaryKA"));
	  return new FormSummaryKA();
  }
  public FormTimeAndExpenses clickTimeAndExpense()throws Exception{
	  AppElement flxScrollTypesKA =new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_flxScrollTypesKA"));
	  flxScrollTypesKA.swipeLeft(50, true);
	  AppElement btnTimeAndExpense=new AppElement(OrderExecutionWidgetId.getWidgetId("frmCompleteOrderKA_btnTimeAndExpense"));
	  btnTimeAndExpense.click();
	  
	  AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	  return new FormTimeAndExpenses();
  }
public void navigateToAddTimeAndExpenses() throws Exception {
	frmTimeAndExpenses=new FormTimeAndExpenses();
	frmTimeAndExpenses.clickTime();
	frmTimeAndExpenses.clickExpense();
	frmTimeAndExpenses.clickBoth();
	frmTimeAndExpenses.navigatetoAddTimeAndExpense();
	formAddTimeAndExpenses=new FormAddTimeAndExpenses();
	formAddTimeAndExpenses.navigateToAddTime();
	formAddTimeItem=new FormAddTimeItem();
	formAddTimeItem.SelectLabour(); 
	formAddTimeItem.selectDate();
	formAddTimeItem.setDuration();
	formAddTimeItem.ClickDone();
	formAddTimeAndExpenses.navigateToAddExpenses();
	formAddExpenseItem = new FormAddExpenseItem();
	formAddExpenseItem.SelectExpense();
	formAddExpenseItem.selectDate();
	formAddExpenseItem.SetAmount();
	formAddExpenseItem.ClickDone();
	String timerecord = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpTimeAndExpenseKA_lblvalue1KA")).getText();
	 Assert.assertEquals(timerecord, "STD SERVICE");
	 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
	 FormTimeAndExpenses frmTimeAndExpenses=new FormTimeAndExpenses();
	 frmTimeAndExpenses.navigateToTimeDetails();
	 String lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmExpenseDetailsKA_lblTaskDetailsKA")).getText();
     Assert.assertEquals(lblValue,"Time Details");
}
	public void editTimeAndExpense()throws Exception {
	    FormTimeDetailsKA frmexpensedetails=new FormTimeDetailsKA();
	    frmexpensedetails.clickOnEdit();
	    AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddTimeItemKA_lblTimeKA"));
		Assert.assertEquals(lblValue.getText(),"Edit Time item");         
	}
	  public void clickEditTimeAndExpense() throws Exception {
		 FormEditTimeItem frmEditTimeItem=new  FormEditTimeItem();
			frmEditTimeItem.SelectLabour(); 
			frmEditTimeItem.selectDate();
			frmEditTimeItem.setDuration();
			frmEditTimeItem.ClickDone();
			FormTimeDetailsKA frmTimeDetails=new FormTimeDetailsKA();
			frmTimeDetails.clickOnRemove();
	}

}
