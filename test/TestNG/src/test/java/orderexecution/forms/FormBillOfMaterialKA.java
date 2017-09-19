package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormBillOfMaterialKA {
	AppElement btnBackKA;
	public FormBillOfMaterialKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_lblBOMHeaderKA"));
	}
	 public FormOrderAssetKA navigateBackToOrderAsset() throws Exception{
		 btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_btnBOMBackKA"));
		 btnBackKA.click();
		AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormOrderAssetKA();}
			return null;
	 }
	 
	 //To Search in BOM
	public void searchBOM(String searchText) throws Exception {
		// TODO Auto-generated method stub
		AppElement SearchTextBox=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_tbxBomSearchKA"));
		SearchTextBox.typeAndClickSearch(searchText);
		Thread.sleep(3000);
		
	}
	
	//To Click Back in BOM
	public void clickBack()  throws Exception{
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_btnBOMBackKA"));
		 btnBackKA.click(); 
	}
	
	//To fetch further heirarchy
	public void clickMaterial() throws Exception{
		AppElement segmentBtnBOM = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_btnBOMSegmentKA"));
		segmentBtnBOM.click();
	}
	
	//To Verify search results in BOM
	public boolean verifySearchResultByComponentId(String searchText) throws Exception {
		// TODO Auto-generated method stub
		AppElement ComponentId = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpBOMKA_lblComponentIDKA"));
		String ComponentIdValue = ComponentId.getText();
		System.out.println(ComponentIdValue+"    ********    "+searchText);
		if(ComponentIdValue.contains(searchText))
			return true;
		else
			return false;
	}

}
