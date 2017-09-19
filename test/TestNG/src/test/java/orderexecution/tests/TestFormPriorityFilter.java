package test.java.orderexecution.tests;

import java.lang.reflect.Method;




import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormOrdersViewsKA;
import test.java.orderexecution.forms.FormPriorityFilter;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormPriorityFilter extends OrderExecutionBaseTest {
 
	private static final Exception Exception = null;

	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		 AppElement ele=null;
		 try{
			 ele=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		 }
		 catch (Exception e) {
				if (ele == null){
					if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//						frmLoginKA =  new FormLogInKA();//							
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
					}
				}
				else
					System.out.println("TestMyOrdersForm.setupBeforeTest(): Something went worng form");
				relaunchApp();
				doLogin();				
			}
	}
	
	
	@Test 
	public void checkCriticalClick() throws Exception{
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.clickViewFilter();
		FormOrdersViewsKA formOrdersViewsKA=new FormOrdersViewsKA();
		formOrdersViewsKA.clickOnFilter("Priority");
		FormPriorityFilter formPriorityFilter=new FormPriorityFilter();
		//formPriorityFilter.clickOnClearFilter();
		Thread.sleep(4000);
		formPriorityFilter.ClickStatus(0);
		formPriorityFilter.clickDone();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
		formOrdersViewsKA.onClickDone();
		try{
			Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblPriorityKA"));
            int val=lblStatusKA.getSegRowIndexWithLabel("Critical");
            if(val==-1){
            	throw Exception;
            }
		}catch(Exception e){
			System.out.println("#####Relevant Work Order is not Found###");
		}
		
	}
	
	@Test 
	public void checkMediumClick() throws Exception{
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.clickViewFilter();
		FormOrdersViewsKA formOrdersViewsKA=new FormOrdersViewsKA();
		formOrdersViewsKA.clickOnFilter("Priority");
		FormPriorityFilter formPriorityFilter=new FormPriorityFilter();
		formPriorityFilter.clickOnClearFilter();
		Thread.sleep(4000);
		formPriorityFilter.ClickStatus(3);
		formPriorityFilter.clickDone();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
		formOrdersViewsKA.onClickDone();
		try{
			Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblPriorityKA"));
            int val=lblStatusKA.getSegRowIndexWithLabel("Medium");
            if(val==-1){
            	throw Exception;
            }
		}catch(Exception e){
			System.out.println("#####Relevant Work Order is not Found###");
		}
		
	}
	
	@Test 
	public void checkHighClick() throws Exception{
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.clickViewFilter();
		FormOrdersViewsKA formOrdersViewsKA=new FormOrdersViewsKA();
		formOrdersViewsKA.clickOnFilter("Priority");
		FormPriorityFilter formPriorityFilter=new FormPriorityFilter();
		formPriorityFilter.clickOnClearFilter();
		Thread.sleep(4000);
		formPriorityFilter.ClickStatus(1);
		formPriorityFilter.clickDone();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
		formOrdersViewsKA.onClickDone();
		try{
			Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblPriorityKA"));
            int val=lblStatusKA.getSegRowIndexWithLabel("High");
            if(val==-1){
            	throw Exception;
            }
		}catch(Exception e){
			System.out.println("#####Relevant Work Order is not Found###");
		}
		
	}
	@Test
	public void checkLowClick() throws Exception{
		FormOrderListKA formOrderListKA=new FormOrderListKA();
		formOrderListKA.clickViewFilter();
		FormOrdersViewsKA formOrdersViewsKA=new FormOrdersViewsKA();
		formOrdersViewsKA.clickOnFilter("Priority");
		FormPriorityFilter formPriorityFilter=new FormPriorityFilter();
		formPriorityFilter.clickOnClearFilter();
		Thread.sleep(4000);
		formPriorityFilter.ClickStatus(2);
		formPriorityFilter.clickDone();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmStatusFilterKA_lblHeaderKA"));
		formOrdersViewsKA.onClickDone();
		try{
			Segment lblStatusKA = new Segment(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_segOrderListKA"),OrderExecutionWidgetId.getWidgetId("tmpOrderListKA_lblPriorityKA"));
            int val=lblStatusKA.getSegRowIndexWithLabel("Low");
            if(val==-1){
            	throw Exception;
            }
		}catch(Exception e){
			System.out.println("#####Relevant Work Order is not Found###");
		}
		
	}
}
