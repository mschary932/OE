package test.java.orderexecution.tests;


import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.common.AppElement;
import test.java.orderexecution.OrderExecutionBaseTest;
import test.java.orderexecution.OrderExecutionWidgetId;
import test.java.orderexecution.OrderState;
import test.java.orderexecution.forms.FormFSLogInKA;
import test.java.orderexecution.forms.FormLogInKA;
import test.java.orderexecution.forms.FormMeasurementAttachmentKA;
import test.java.orderexecution.forms.FormMeasurementExecutionKA;
import test.java.orderexecution.forms.FormMeasurementImagesKA;
import test.java.orderexecution.forms.FormMeasurementsKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormMeasurementExecutionKA extends OrderExecutionBaseTest{
	
		FormOrderListKA frmOrderListKA; 
		FormMeasurementExecutionKA measurementExecutionForm;
		public TestFormMeasurementExecutionKA() {
			
		}
	
	
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest() throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		} catch(Exception e){
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
				frmOrderExecution.navigateToMeasurementExecution();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
					
			}
		}
	}
	

	@Test
	public void start_measurement_task() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementExecutionKA measurementsForm = new FormMeasurementExecutionKA();
	    try{
	    	AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));   
	    	if(lblValue.getText().equalsIgnoreCase("Start")){
				   measurementsForm.clickStart(); 
			   } 
		   }catch(Exception e){
				   System.out.println("****Measurement is Already Started****");
		}
	    AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblStatusKA"));
		sa.assertEquals(lblValue.getText(),"STARTED");	
		sa.assertAll();
	}
	
	@Test
	public void navigateToMeasurements() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementExecutionKA mesurementExecutionForm = new FormMeasurementExecutionKA();	
	    mesurementExecutionForm.navigateToMeasurements();
	    AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Measurements");
	    FormMeasurementsKA formMeasurementsKA=new FormMeasurementsKA();	   
	    formMeasurementsKA.navigateBackToMeasurementExecution();
	    AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader1.getText(),"Measurement Execution");	
		sa.assertAll();
	    }
	
	
	@Test
	public void navigateToMeasurementAttachment() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementExecutionKA mesurementExecutionForm = new FormMeasurementExecutionKA();	
	    mesurementExecutionForm.navigateToMeasurementAttachment();
	    AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmOrderAttachmentsKA_lblOrderAttachmentsKA"));
		sa.assertEquals(lblHeader1.getText(),"Measurement Attachment");	    
	    FormMeasurementAttachmentKA formMeasurementsKA=new FormMeasurementAttachmentKA();
	    formMeasurementsKA.navigateBackToMeasurementExecution();
	    AppElement lblHeader7=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader7.getText(),"Measurement Execution");	
		sa.assertAll();		
	    }
	
	
	@Test
	public void navigateToMeasurementimages() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementExecutionKA mesurementExecutionForm = new FormMeasurementExecutionKA();	
	    mesurementExecutionForm.navigateToMeasurementimages();
	    AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmTaskAttachmentKA_lblHeaderKA"));
		sa.assertEquals(lblHeader1.getText(),"Measurement Images");	
		FormMeasurementImagesKA formMeasurementsKA=new FormMeasurementImagesKA();
	    formMeasurementsKA.navigateBackToMeasurementExecution();
	    AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Measurement Execution");	
		sa.assertAll();
	    }
	
	@Test
	public void test_navigate_to_measurementReading() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormMeasurementExecutionKA frmMeasurementExecutionKA = new FormMeasurementExecutionKA();
		frmMeasurementExecutionKA.navigateToMeasurementReadings();
		AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Measurement Reading");
		FormMeasurementImagesKA formMeasurementsKA=new FormMeasurementImagesKA();	    
		formMeasurementsKA.navigateBackToMeasurementExecution();
	    AppElement lblHeader1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
		sa.assertEquals(lblHeader1.getText(),"Measurement Execution");	
		sa.assertAll();
	    }
	
	@Test
	public void complete_measurement_task() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementExecutionKA measurementsForm = new FormMeasurementExecutionKA();
	    try{
	    	AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));   
	    	if(lblValue.getText().equalsIgnoreCase("Start")){
				   measurementsForm.clickStart(); 
			   } 
		   }catch(Exception e){
				   System.out.println("****Measurement is Already Started****");
		}
//	    handleSync();
	    try{
	    	AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_btnHoldKA"));   
	    	if(lblValue.getText().equalsIgnoreCase("Complete")){
				   measurementsForm.clickComplete(); 
			   } 
		   }catch(Exception e){
				   System.out.println("****Measurement is Already Completed****");
		}	  
	    AppElement lblValue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblStatusKA"));
		sa.assertEquals(lblValue.getText(),"COMPLETED");
		sa.assertAll();
	  }
	
	
	
	@AfterClass(alwaysRun=true)
	public void setupAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
	    FormMeasurementExecutionKA mesurementExecutionForm = new FormMeasurementExecutionKA();	
	    mesurementExecutionForm.navigateBackToOrderExecution();	
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
