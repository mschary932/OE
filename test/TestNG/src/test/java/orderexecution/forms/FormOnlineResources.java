package test.java.orderexecution.forms;

import java.util.List;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOnlineResources {
	
	public FormOnlineResources() throws Exception{
	}
	 
	public void applyGlobalView() throws Exception{
		AppElement btnViews=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskResourcesListKA_btnOptionsKA"));
		btnViews.click();
		
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpDateFIlterKA_lblTaskViewKA"));
		List<AppElement> lblViewOptions=AppElement.getAppElements(OrderExecutionWidgetId.getWidgetId("tmpDateFIlterKA_lblTaskViewKA"));
		AppElement lblGlobalView=lblViewOptions.get(lblViewOptions.size()-1);
		lblGlobalView.click();
		
		AppElement btnOK=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnOKKA"));
		btnOK.click();
	}
	
	public void searchForResource(String searchText) {
		
	}
	
	public void navigateToStockListScreen() throws Exception {
//		frmStockLocationListKA_lblTitleKA
		AppElement btnAdd=new AppElement(OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_btnConssumedKA"));
		btnAdd.click();
	}
	
	public void raisePurchaseRequestFromStockListScreen() throws Exception {
		AppElement btnEdit=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationDetailsKA_btnEditKA"));
		btnEdit.click();
		//Wait for Popup-Header Label
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblResourceNameKA"));
		//Enter text ? - frmResourceExecutionKA_tbxQuantityKA
		
		//Click on Save Tick Btn - frmHamburgerMenuWOKA_btnSaveQuantityKA
		AppElement btnSave=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSaveQuantityKA"));
		btnSave.click();
		
		//Click on Popup Close Btn - frmHamburgerMenuWOKA_btnDeleteBackKA
		AppElement btnClose=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnDeleteBackKA"));
		btnClose.click();
	}
	
	public void raisePurchaseRequest() throws Exception {
		AppElement btnEdit=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationDetailsKA_btnEditKA"));
		btnEdit.click();
		//Wait for Popup-Header Label
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblResourceNameKA"));
		//Enter text ? - frmResourceExecutionKA_tbxQuantityKA
		
		//Click on Save Tick Btn - frmHamburgerMenuWOKA_btnSaveQuantityKA
		AppElement btnSave=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSaveQuantityKA"));
		btnSave.click();
		
		//Click on Popup Close Btn - frmHamburgerMenuWOKA_btnDeleteBackKA
		AppElement btnClose=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnDeleteBackKA"));
		btnClose.click();
	}
	
	public void navigateToStockDetailsScreen() throws Exception {
		List<AppElement> lblStockIDs=AppElement.getAppElements(OrderExecutionWidgetId.getWidgetId("tmpStockSegKA_lblStockIDKA"));
		if(lblStockIDs.size()>0){
			lblStockIDs.get(0).click();
		}
	}
	
	public void navigateBackToStockListScreen() throws Exception {
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationDetailsKA_btnBackKA"));
		btnBack.click();
	}
	
	public void navigateBackToTaskResourcesScreen() throws Exception {
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationListKA_btnBackKA"));
		btnBack.click();
	}
	
	public void navigateToResourceExecutionScreen() throws Exception {
		AppElement btnBack=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationListKA_imgClickKA"));
		btnBack.click();
	}
	
	public void raiseTransferRequest() throws Exception {
		AppElement btnEdit=new AppElement(OrderExecutionWidgetId.getWidgetId("frmStockLocationDetailsKA_btnEditKA"));
		btnEdit.click();
		//Wait for Popup-Header Label
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblResourceNameKA"));
		//Enter text ? - frmResourceExecutionKA_tbxQuantityKA
		
		//Click on Save Tick Btn - frmHamburgerMenuWOKA_btnSaveQuantityKA
		AppElement btnSave=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSaveQuantityKA"));
		btnSave.click();
		
		//Click on Popup Close Btn - frmHamburgerMenuWOKA_btnDeleteBackKA
		AppElement btnClose=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnDeleteBackKA"));
		btnClose.click();
	}

	public void WaitForAppElement(String WidgetId, int count) throws Exception{
//		WidgetId="frmStockLocationListKA_lblTitleKA"
		while((count>0)){
			if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId(WidgetId), 7)){
				return;
			}
			count--;
		}
	}
}
