package test.java.orderexecution.forms;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;


public class FormTaskResourcesListKA {
	
	AppElement lblMainHeaderKA;
	AppElement tbxSearchKA;
	AppElement segSwipeKA;
	
	public FormTaskResourcesListKA() throws Exception{
		lblMainHeaderKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_lblMainHeaderKA"));
//		segSwipeKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"));
	}
	
	public  FormTaskExecutionKA clickBack() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_btnBackKA"));
		AppElement btnBackKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"),100);
		return new FormTaskExecutionKA();
	}
	
	public void clickViews() throws Exception {
		AppElement btnOptionsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_btnOptionsKA"));
		btnOptionsKA.click();
	}
	
	public void cancelViews() throws Exception {
		AppElement cancelView = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskViewFiltersKA_btnCancelKA"));
		cancelView.click();
	}
	
	public void applyView(String view) throws Exception {
		AppElement.clickByName(view);
		AppElement applyView = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskViewFiltersKA_btnOKKA"));
		applyView.click();
	}
	
	public void editTask() throws Exception {
		Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_flxSegmentMainKA"));
		AppElement appEle = segSwipeKA.getElementWithIndex(0);
		appEle.swipeLeft(90);
		AppElement btnEdit = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_btnEditKA")).getElementWithIndex(0);
		btnEdit.click();
	}
	
	public void IncreaseQty() throws Exception {
		AppElement btnIncrement = new AppElement(OrderExecutionWidgetId.getWidgetId("frmEditTaskResourcesKA_btnIncreaseKA"));
		btnIncrement.click();
	}
	
	public void saveQty() throws Exception {
		AppElement btnSave = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnSaveQuantityKA"));
		btnSave.click();
	}
	
	public int readQty() throws Exception {
		AppElement Qty = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblUsedQuantityValueKA"));
	    String qtyUsed = Qty.getText();
	    System.out.println(qtyUsed);
	    int qnty=0;
	    if(qtyUsed.contains("each")) {
	    	qnty = Integer.parseInt(qtyUsed.substring(0, (qtyUsed.length()-5)));
	    }
	    else if(qtyUsed.contains("Gram/Mol")) {
	    	qnty = Integer.parseInt(qtyUsed.substring(0, (qtyUsed.length()-9)));
	    }
	    return qnty;
	}
	
    public void doSearch(String searchText) throws Exception{
		AppElement SearchTextBox=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_tbxSearchKA"));
		SearchTextBox.typeAndClickSearch(searchText);
//		AppElement.clickSearchPhone();		
		Thread.sleep(3000);		
	}

	public void clickOnSearch() throws Exception {
		AppElement tbxSearchKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_tbxSearchKA"));
		tbxSearchKA.click();
	}
	
	public boolean verifySearchResultByResouceCode(String searchText) throws Exception {
		
		AppElement resource = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblCodeKA")).getElementWithIndex(0);
		String resourceName = resource.getText();
		if(searchText.length()==9)
			searchText = (searchText.substring(0, 6));
		System.out.println(resourceName+"    ********    "+searchText);
	//	if(resourceName.equals(searchText))
			if(resourceName.contains(searchText))
			return true;
		else
			return false;
	}
	
    public void enable_disable_Wifi(String input) throws Exception {	
			System.out.println("Disabling device wifi off");
			String cmd = "adb shell am start -n io.appium.settings/.Settings -e wifi " +input;
			ExecuteCMDCommand(cmd);
			Thread.sleep(3000);
			if(AppElement.waitForEnable("android:id/button3")){
				AppElement btn = new AppElement("android:id/button3");
				btn.click();
			}	
	}
    
    public String ExecuteCMDCommand(String Command) {
		String Totalline="";
		 try 
         { 
			 System.out.println("Executing the cmd : "+Command);
			 Process p=Runtime.getRuntime().exec("cmd /c "+Command);
             p.waitFor(); 
             BufferedReader reader=new BufferedReader(
                 new InputStreamReader(p.getInputStream())
             ); 
             String line;
             while((line = reader.readLine()) != null) 
            	 Totalline=Totalline+"\n"+line;
         }


         catch(IOException e1) {} 
         catch(InterruptedException e2) {} 
         return Totalline;
    }
	
	public boolean verifySearchResultByResourceName(String searchText) throws Exception {		
		AppElement resource = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"), OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA")).getElementWithIndex(0);
		String resourceName = resource.getText();
		System.out.println(resourceName+"    ********    "+searchText);		
	//	if(resourceName.equals(searchText))
		if(resourceName.contains(searchText))
			return true;
		else
			return false;
	}
	
	public FormResourceExecution navigatetoResourceExecution() throws Exception{
		Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblCodeKA"));
		segSwipeKA.getElementWithIndex(0).click();
		return new FormResourceExecution();
	}
 
	
}
