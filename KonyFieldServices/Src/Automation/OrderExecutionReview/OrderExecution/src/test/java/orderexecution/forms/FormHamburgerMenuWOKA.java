package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormHamburgerMenuWOKA {

	AppElement btnSettingsKA;
	AppElement btnAvailableOrder;
	public FormHamburgerMenuWOKA() throws Exception{
		
		btnSettingsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSettingsKA"));
		
	 }
	//Click on Settings button in hamburger menu
	public FormSettingsKA clickSettings() throws Exception
	{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSettingsKA"));
		btnSettingsKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_btnSettingsKA"));
		btnSettingsKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmSettingsKA_lblTaskDetailsKA"));
		if(Label.isElementVisible()){return new FormSettingsKA();}
		return null;
	}
	
	
	public FormPendingOrdersListKA clickAvailableOrders() throws Exception{
		btnAvailableOrder = new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_flxMenuItem1CntrKA"));
		btnAvailableOrder.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmPendingOrderListKA_lblMyOrdersKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmPendingOrderListKA_lblMyOrdersKA"));
		if(Label.isElementVisible()){return new FormPendingOrdersListKA();}
		return null;
	}
	public FormOrderListKA clickMyOrders() throws Exception {
		AppElement btnMyOrders = new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_flxMenuItem0CntrKA"));
		btnMyOrders.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		if(Label.isElementVisible()){return new FormOrderListKA();}
		return null;
	}
	
}
