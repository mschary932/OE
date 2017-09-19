package test.java.orderexecution.forms;

import java.util.ArrayList;
import java.util.List;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.Order;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;


public class FormOrderListKA {
	
	AppElement lblMyOrdersKA;
	AppElement btnAppMenuKA;
	FormOrderExecution frmOrderExecution;
	public FormOrderListKA() throws Exception{
		lblMyOrdersKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
	}
	
	
	
	public void clickViewFilter() throws Exception{
		AppElement btnViewFilterKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnViewFilterKA"));
		btnViewFilterKA.click();
	}
	
	

	
	public FormOrderExecution clickWorkorder(String lable) throws Exception{
		try{
		AppElement.scrollUntilVisible(lable);
		Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblStatusKA"));
		lblStatusKA.clickSegRowElementbyLabel(lable);
		}catch(Exception e){
			AppElement ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"));
			ele.swipeDown(50);
			Thread.sleep(2000);
			ele.swipeDown(50);
			AppElement.scrollUntilVisible(OrderState.stateAsStarted);
			Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblStatusKA"));
			lblStatusKA.clickSegRowElementbyLabel(OrderState.stateAsStarted);	
		}
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		AppElement isVisble=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		if(isVisble.isElementVisible()){
			return new FormOrderExecution();
			}
		return null;		
	} 
	
	public FormOrdersViewsKA clickOrderViews() throws Exception {
		AppElement btnOrderView = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnViewFilterKA"));
		btnOrderView.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrdersViewsKA_lblHeaderKA"));
		return new FormOrdersViewsKA();
	}
	
	
	public List<Order> getAllOrders() {
		return new ArrayList<Order>();
	}
	
	
	
	public void openhamburgermenu() throws Exception{
		btnAppMenuKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
		btnAppMenuKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"),100);	
	}
	
	
	public  void closehamburgermenu() throws Exception{
		btnAppMenuKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
		btnAppMenuKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));	

	}

	
	public FormHamburgerMenuWOKA clickAppMenu() throws Exception {
		btnAppMenuKA = new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnAppMenuKA"));
		btnAppMenuKA.click();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		AppElement Label=new AppElement(OrderExecutionWidgetId.getWidgetId("frmHamburgerMenuWOKA_lblMenuWOKA"));
		if(Label.isElementVisible()){return new FormHamburgerMenuWOKA();}
		return null;
	}
	
	public void DateSelection() throws Exception{
		AppElement btnDay0KA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnDay0KA"));
		btnDay0KA.click();
	}
	
	public void navigateToMap()throws Exception{
		AppElement btnMapShowKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnMapShowKA"));
		btnMapShowKA.click();
	}
	public void navigateToOrderList() throws Exception{
		AppElement btnListOrderKA=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_btnListOrderKA"));
		btnListOrderKA.click();
	}
	
}
