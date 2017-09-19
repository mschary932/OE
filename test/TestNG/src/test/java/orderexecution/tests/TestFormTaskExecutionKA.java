package test.java.orderexecution.tests;

import java.lang.reflect.Method;
import java.util.List;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.common.Segment;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormResourceExecution;
import test.java.orderexecution.forms.FormTaskDetailsKA;
import test.java.orderexecution.forms.FormTaskExecutionKA;
import test.java.orderexecution.forms.FormTaskResourcesListKA;
import test.java.orderexecution.forms.FormTenantKA;
import test.java.orderexecution.forms.FormTimeAndExpenses;


public class TestFormTaskExecutionKA extends OrderExecutionBaseTest{

	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		}  catch(Exception e){
			 if(ele==null){
				 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmFSLoginKA_btnManualSetupKA"),10)){
						FormFSLogInKA frmFSLoginKA = new FormFSLogInKA(); 
						FormTenantKA frmTenantKA = frmFSLoginKA.doManualSetup();	
						FormLogInKA frmLoginKA = frmTenantKA.connectToTenant(sgconfig.getKeyValue("AppKey"), sgconfig.getKeyValue("AppSecret"), sgconfig.getKeyValue("AppConfigServiceURL"), sgconfig.getKeyValue("SyncAppVersion"));
//						frmLoginKA =  new FormLogInKA();//							
						FormOrderListKA frmOrderListKA = frmLoginKA.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"),true);
						AppElement lblexpect=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
						Assert.assertEquals(lblexpect.getText(),"My Orders");					
				}
			try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"))).getText().equalsIgnoreCase("My Orders")){
			   FormOrderListKA formOrderListKA=new FormOrderListKA();
			   formOrderListKA.clickWorkorder(OrderState.state);
			 }
			}catch(Exception ex){
				System.out.println("*****Its not relaunch*****");
			}
				 FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }	 
		     frmOrderExecution.navigateOnlyToTaskExecution();
			 }
		}
}
	 
	
	@Test
	public void start_task() throws Exception{
	   SoftAssert sa = new SoftAssert();
	   FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();	
	    try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Start")){
				   taskExecutionForm.clickStart();
				   Thread.sleep(5000);
			   }
			   else {
				   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Resume")){
					   taskExecutionForm.clickStart();
					   Thread.sleep(5000);
				   }
			   }
		   }catch(Exception e){
				   System.out.println("****Task Is Already Started****");
			   }		
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblStatusKA"));
		sa.assertEquals(lbl.getText(),"STARTED");
		sa.assertAll();
	}
	
	@Test
	public void pause_task() throws Exception{
	   SoftAssert sa = new SoftAssert();
	   FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
	   try{
		   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Start")){
			   taskExecutionForm.clickStart(); 
			   Thread.sleep(5000);
		   }
	   }catch(Exception e){
			   System.out.println("****Task Is Already Started****");
		   }	   	
	    try{
	    	taskExecutionForm.clickPause();
	    	Thread.sleep(5000);
	    }catch(Exception e){
	    	System.out.println("****Task Is Already Paused****");
	    }
	    AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblStatusKA"));
		sa.assertEquals(lbl.getText(),"PAUSED");
		sa.assertAll();
		}

	
	@Test
	public void test_information_visible_task_execution() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblDayandTimeKA")).isElementVisible());		
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblStatusKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblStatusKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTimerKA")).isElementVisible());
		sa.assertTrue(new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTaskDescriptionKA")).isElementVisible());		
		sa.assertAll();
	}
	
	@Test
	public void test_materials_visible_task_execution() throws Exception{
		SoftAssert sa = new SoftAssert();	
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		sa.assertTrue(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpResourcesSegKA_lblMaterialKA")));
		sa.assertAll();
	}
	
	@Test
	public void clickDetails() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		FormTaskDetailsKA taskDetailsForm =  taskExecutionForm.clickDetails();	
		taskExecutionForm = taskDetailsForm.clickBack();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	
	@Test
	public void clickResourcesList() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
	    FormTaskResourcesListKA taskresourcesForm =  taskExecutionForm.clickResourcesList();	
		taskExecutionForm = taskresourcesForm.clickBack();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	@Test
	public void clickTimeAndExpense() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		try{
			   if((AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA")))){
				   taskExecutionForm.clickStart();   
			   } 
		   }catch(Exception e){
				   System.out.println("****Task Is Already Started****");
		}
		FormTimeAndExpenses frmTimeAndExpense= taskExecutionForm.navigateToTimeExpenses();		
		taskExecutionForm=frmTimeAndExpense.back();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	
	@Test
	public void clickResource() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		FormResourceExecution resourceExecutionForm=  taskExecutionForm.navigatetoResourceExecution();	
		taskExecutionForm = resourceExecutionForm.navigateToTaskExecution();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	
	@Test
	public void clickBack() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
	    taskExecutionForm.clickBack();
	    FormOrderExecution orderExecutionForm = new FormOrderExecution();	 
		orderExecutionForm.navigateOnlyToTaskExecution();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	
	@Test
	public void edit_resource_quantity() throws Exception{
		 SoftAssert sa = new SoftAssert();
	     FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
	     try{
		 if(AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnCompleteKA"))){
	          AppElement btnpause=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnCompleteKA"));
	          btnpause.click();
			}
	     }catch(Exception e){
	    	 System.out.println("*****Task is not paused****");
	     }
			taskExecutionForm.clickStart();
			taskExecutionForm.swipeResources();
			taskExecutionForm.clickEdit();
			taskExecutionForm.clickSaveQuantity();
			AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
			sa.assertEquals(lbl.getText(),"Task Execution");
			sa.assertAll();
	}
	
	@Test
	public void click_resource_checkbox() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		try{
		   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Start")){
			   taskExecutionForm.clickStart();   
		   }
		}catch(Exception e){
			   System.out.println("****Its not relaunch****");
		   }	
		taskExecutionForm.clickResourceCheckbox();
//		taskExecutionForm.clickResourceCheckbox();
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();
	}
	
	
	@Test
	public void complete_task() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		try{
			   if((new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_btnHoldKA"))).getText().equalsIgnoreCase("Started")){
				   taskExecutionForm.clickStart();   
			   }
		   }catch(Exception e){
				   System.out.println("****Its not relaunch****");
			   }
		taskExecutionForm.clickComplete();
		try{if("COMPLETED" == new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblStatusKA")).getText()){}}
		catch(Exception e){
			System.out.println(e);
		}  
		AppElement lbl=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskExecutionKA_lblTitleKA"));
		sa.assertEquals(lbl.getText(),"Task Execution");
		sa.assertAll();		
	}
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		 FormTaskExecutionKA taskExecutionForm=new FormTaskExecutionKA();
		 taskExecutionForm.clickBack();
		 AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
		 FormOrderExecution frmOrderExecution=new FormOrderExecution();
	     frmOrderExecution.clicknavigatebackOrderLists();		
	     AppElement lblValue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderListKA_lblMyOrdersKA"));
		 sa.assertEquals(lblValue1.getText(),"My Orders");
		 sa.assertAll();
	}catch(Exception e){
		relaunchApp();
		if(doLogin()){
			System.out.println("Login is successful***");
		}
	}
}
}