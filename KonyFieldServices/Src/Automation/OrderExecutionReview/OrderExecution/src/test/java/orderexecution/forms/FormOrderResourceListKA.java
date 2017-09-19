package test.java.orderexecution.forms;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderResourceListKA {
	
	 public FormOrderResourceListKA() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_lblMainHeaderKA"));
		 }
	
	public FormResourceExecution navigateToResourceExecution() throws Exception{		
		clickOnResource();
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) 
		return new FormResourceExecution();	
		return null;
	}

	public FormOrderExecution clickBack() throws Exception {		
		clickOnBack();
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    	if(Label.isElementVisible()) 
		return new FormOrderExecution();	
		return null;
	}
	
	public void clickOnBack() throws Exception {
		
		AppElement btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_btnBackKA"));
		btnBackKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
    }
	
	public void clickOnResource() throws Exception {
		Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblCodeKA"));		
		segSwipeKA.getElementWithIndex(0).click();
//		segSwipeKA.clickSegRowElementbyLabel(lblCodeKA);
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmResourceExecutionKA_lblHeaderKA"));
    	
	}
	
	public void clickOnViewsAndFilters() throws Exception {		
		AppElement ViewsFilters=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_btnOptionsKA"));
		ViewsFilters.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeader1KA"));
    	
	}
	
	public void clickOnSearch() throws Exception {		
		AppElement SearchBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_tbxSearchKA"));
		SearchBtn.click();
		
	}
	
	public void clickOnCancelView() throws Exception {		
		AppElement cancelBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_btnCancel1KA"));
		cancelBtn.click();		
	}
	
    public void clickOnApplyView() throws Exception {		
    	AppElement applyBtn=new AppElement(OrderExecutionWidgetId.getWidgetId("flxMainFlterBg1KA_btnOK1KA"));
		applyBtn.click();		
	}
    
	public void IncreaseQty() throws Exception {
		AppElement btnIncrement = new AppElement(OrderExecutionWidgetId.getWidgetId("frmEditTaskResourcesKA_btnIncreaseKA"));
		btnIncrement.click();
	}
	
	public void saveQty() throws Exception {
		AppElement btnSave = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnSaveQuantityKA"));
		btnSave.click();
	}
	
	public void editOrder() throws Exception{
	    Segment segSwipeKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblTypeKA"));		
		AppElement appEle = segSwipeKA.getElementWithIndex(0);
		appEle.swipeLeft(90);
		AppElement btnEdit = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_segSwipeKA"),OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_btnEditKA")).getElementWithIndex(0);
		btnEdit.click();
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
	public int getCountOfResources() throws Exception {
		
		int count=0;
		
		return count;
	}
	
	public List<String> readAllValuesForID(String WidgetID) throws Exception{
    	List<AppElement> Labels=AppElement.getAppElements(WidgetID);
    	List<String> list=new ArrayList<String>();
		System.out.println("***************************************************************");
		System.out.println("For the ID : '"+WidgetID+"' the values are ");
		System.out.println("Count : "+Labels.size());
		for (int i = 0; i < Labels.size(); i++) {
			System.out.println(Labels.get(i).getText());
			Thread.sleep(2000);
			list.add(i, Labels.get(i).getText());
			Thread.sleep(2000);
		}
		return list;
	}
	
	
	public void doSearch(String searchText) throws Exception{
		
		AppElement SearchTextBox=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderResourcesListKA_tbxSearchKA"));
		SearchTextBox.typeAndClickSearch(searchText);
		//AppElement.clickSearchPhone();	
	//	SearchTextBox.typeAndClickSearch(searchText);
		Thread.sleep(3000);		
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
	
    public void selectView(String view) throws Exception {
		
//		Segment ViewFilter = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_segFilterViewKA"),OrderExecutionWidgetId.getWidgetId("tmpViewBodyKA_lblTaskViewKA"));
//    	AppElement ViewFilter = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpViewBodyKA_lblTaskViewKA"));
		System.out.println("###########CLicking on the filter");//tmpViewBodyKA_flxBodyKA
		AppElement.clickByName(view);//clickSegRowElementbyLabel(view);
		
	}
    
    public void enable_disable_Wifi(String input) throws Exception 
	{		
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

}
