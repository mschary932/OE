package test.java.orderexecution.forms;
import org.testng.Assert;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;
public class FormTaskExecutionKA {
	 private FormTimeAndExpenses frmTimeAndExpenses;
	 private FormAddTimeAndExpenses formAddTimeAndExpenses;
	 private FormAddTimeItem formAddTimeItem;
	 private FormAddExpenseItem formAddExpenseItem;
    
	public FormTaskExecutionKA() throws Exception{
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
	}

	public FormTaskDetailsKA clickDetails() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnTaskDetailsKA"));
		AppElement btnDetails = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnTaskDetailsKA"));;
		btnDetails.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskDetailsKA_lblTaskDetailsKA"));
    	if(Label.isElementVisible()) {return new FormTaskDetailsKA();}	
		return null;
	}

	public FormTaskResourcesListKA clickResourcesList() throws Exception{
		AppElement btnResources = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnTaskResKA"));;
		btnResources.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
    	if(Label.isElementVisible()) {return new FormTaskResourcesListKA();}	
		return null;
	}

	public FormOrderExecution clickBack() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnBackKA"));
		AppElement btnBack = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnBackKA"));;
		btnBack.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormOrderExecution();}	
		return null;
	}
	
	public FormResourceExecution navigatetoResourceExecution() throws Exception{
		Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpTaskExecutionKA_lblCodeKA"));
		segSwipeKA.getElementWithIndex(0).click();    	
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) {return new FormResourceExecution();}	
		return null;
	}
	
	
	

	public void clickStart() throws Exception {
		AppElement btnStart=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"));
		btnStart.click();
		AppSpecificFunctions.handleSync();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnCompleteKA"));
	}
	public FormTimeAndExpenses navigateToTimeExpenses() throws Exception{
		AppElement flxScrollTypesKA =new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_flxScrollTypesKA"));
		flxScrollTypesKA.swipeLeft(50, true);
		AppElement btnTimeAndExpense=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnTimeAndExpense"));
		btnTimeAndExpense.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTimeAndExpenseKA_lblHeaderKA"));
		if(lblValue.isElementVisible()){return new FormTimeAndExpenses(); }
		return null;
	}

	public void clickPause() throws Exception {
		AppElement btnPause=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnCompleteKA"));
		btnPause.click();
	}
	
	public void clickComplete() throws Exception {
		AppElement btnComplete=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnCancelKA"));
		btnComplete.click();
		AppSpecificFunctions.handleSync();
	}

	public void clickResourceCheckbox() throws Exception {
		new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_btnConssumedKA")).getElementWithIndex(0).click(); 
		
	}

	public void swipeResources() throws Exception {
		Thread.sleep(30000);
		Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),"lblCodeKA");
		AppElement appEle = segSwipeKA.getElementWithIndex(0);
		appEle.swipeLeft(90);
		Thread.sleep(1000);
	}

	public void clickEdit() throws Exception {
//		new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpTaskResourceKA_btnEditKA")).getElementWithIndex(0).click(); 
		AppElement btnEdit=new AppElement(OrderExecutionWidgetId.getWidgetId("tmpTaskResourceKA_btnEditKA"));
		btnEdit.click();
	}

	public void clickSaveQuantity() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnSaveQuantityKA"),100);
		AppElement btnSaveQuantityKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnSaveQuantityKA"));
		btnSaveQuantityKA.click();
		Thread.sleep(2000);
		if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("OK_Button"))){
			AppElement okBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("OK_Button"));
            okBtn.click();
		}
		
	}
	 public void navigateToAddTimeAndExpenses() throws Exception{
//		FormTimeAndExpenses frmTimeAndExpenses=new  FormTimeAndExpenses();		
//		frmTimeAndExpenses=new FormTimeAndExpenses();
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
	 public void editTimeAndExpense() throws Exception{
		    FormTimeDetailsKA frmexpensedetails=new FormTimeDetailsKA();
		    frmexpensedetails.clickOnEdit();
		    AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmAddEditTimeItemKA_lblTimeKA"));
			Assert.assertEquals(lblValue.getText(),"Edit Time item");         

}
	 public void clickEditTimeAndExpense() throws Exception{
		 FormEditTimeItem frmEditTimeItem=new  FormEditTimeItem();
			frmEditTimeItem.SelectLabour(); 
			frmEditTimeItem.selectDate();
			frmEditTimeItem.setDuration();
			frmEditTimeItem.ClickDone();
			FormTimeDetailsKA frmTimeDetails=new FormTimeDetailsKA();
			frmTimeDetails.clickOnRemove();
	 }
}
