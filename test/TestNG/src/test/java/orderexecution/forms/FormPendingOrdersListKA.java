package test.java.orderexecution.forms;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionWidgetId;

public class FormPendingOrdersListKA {

	 public FormPendingOrdersListKA() throws Exception{
		 AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmPendingOrderListKA_lblMyOrdersKA"));
		 }
	
	public void swipeSegment() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpPendingListKA_flxPendingOrdListMainKA"));
		AppElement flxPendingOrd = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpPendingListKA_flxPendingOrdListMainKA"));
		flxPendingOrd.swipeLeft(90);
	}

	public void clickAccept() throws Exception{
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpPendingListKA_flxPendingOrdListButtonKA"));
		AppElement btnaccept = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpPendingListKA_flxPendingOrdListButtonKA"));
		btnaccept.click();
	}
	

	public FormHamburgerMenuWOKA clickAppMenu() throws Exception {
		AppElement btnAppMenuKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmPendingOrderListKA_btnAppMenuKA"));
		btnAppMenuKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		if(Label.isElementVisible()){return new FormHamburgerMenuWOKA();}
		return null;
	}
}
