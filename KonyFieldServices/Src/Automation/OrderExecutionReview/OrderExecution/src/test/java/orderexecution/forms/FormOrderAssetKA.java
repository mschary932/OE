package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormOrderAssetKA {

	FormOrderExecution frmOrderExecution;
	AppElement btnBackKA;
	public FormOrderAssetKA() throws Exception {
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_lblOrderObjectHeaderKA"));
	}
	 public FormOrderExecution navigateBackToOrderExecution() throws Exception{
		 btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_btnOrderObjectBackKA"));
		 btnBackKA.click();
		AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormOrderExecution();}
			return null;
		 }
	public FormBillOfMaterialKA navigateToBOM() throws Exception {
		// TODO Auto-generated method stub
		AppElement btnBOM=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_btnBOMHeaderKA"));
		btnBOM.click();
		AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmBillOfMaterialKA_lblBOMHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormBillOfMaterialKA();}
		return null;
	}
	public FormOrderDetails navigateBackToOrderDetails() throws Exception {
		btnBackKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAssetKA_btnOrderObjectBackKA"));
		 btnBackKA.click();
		AppElement isVisible=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderDetailsKA_lblHeaderKA"));
		 if(isVisible.isElementVisible()){return new FormOrderDetails();}
			return null;
	}

}
