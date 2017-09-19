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
import test.java.orderexecution.forms.FormMeasurementExecutionKA;
import test.java.orderexecution.forms.FormMeasurementReadings;
import test.java.orderexecution.forms.FormMeasurementsKA;
import test.java.orderexecution.forms.FormOrderExecution;
import test.java.orderexecution.forms.FormOrderListKA;
import test.java.orderexecution.forms.FormTenantKA;

public class TestFormMeasurementsKA extends OrderExecutionBaseTest{
	
	@BeforeMethod(alwaysRun=true)
	public void setupBeforeTest() throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
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
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmOrderExecutionKA_lblHeaderKA"));
				FormOrderExecution frmOrderExecution = new FormOrderExecution();
				 if(!frmOrderExecution.getStatus().equalsIgnoreCase("STARTED")){
				    frmOrderExecution.clickOnRoute();
					frmOrderExecution.clickStart();
				 }
				FormMeasurementExecutionKA frmMeasurementExecutionKA = frmOrderExecution.navigateToMeasurementExecution();
//				frmMeasurementExecutionKA.clickStart();
				frmMeasurementExecutionKA.navigateToMeasurements();
				AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
					
			}
		}
	}
		
	
	@Test
	public void navigateBackToMeasurementExecution() throws Exception{
		SoftAssert sa = new SoftAssert();
	    FormMeasurementsKA mesurementsForm = new FormMeasurementsKA();	
	    FormMeasurementExecutionKA frmMeasurementExecutionKA = mesurementsForm.navigateBackToMeasurementExecution();
	    AppElement lblvalue=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementExecutionKA_lblTitleKA"));
	    sa.assertEquals(lblvalue.getText(),"Measurement Execution");
	    frmMeasurementExecutionKA.navigateToMeasurements();
	    AppElement lblvalue1=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
	    sa.assertEquals(lblvalue1.getText(),"Measurements");
	    sa.assertAll();
    }
	
	@Test
	public void navigateToMeasurementReading() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormMeasurementsKA mesurementsForm = new FormMeasurementsKA();	
		FormMeasurementReadings frmMeasurementReadings = mesurementsForm.navigateToMeasurementReading();
	    AppElement lblHeader=new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementReadings_lblTitleKA"));
		sa.assertEquals(lblHeader.getText(),"Measurement Reading");
		frmMeasurementReadings.navigateBackToMeasurements();
		AppElement lblValue = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
		sa.assertTrue(lblValue.getText().equals("Measurements"));
		sa.assertAll();
	}
	
	@Test
	public void test_measurement_views() throws Exception{
		SoftAssert sa = new SoftAssert();
		FormMeasurementsKA mesurementsForm= new FormMeasurementsKA();
		mesurementsForm.clickOnViewsAndFilters();
		AppElement lblValue = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpTaskViewHeaderKA_lblHeaderTmpKA"));
		sa.assertTrue(lblValue.getText().equals("Views"));
		mesurementsForm.clickOnCancelView();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
		AppElement lblValue1 = new AppElement(OrderExecutionWidgetId.getWidgetId("frmMeasurementsKA_lblTitleKA"));
		sa.assertTrue(lblValue1.getText().equals("Measurements"));
	    sa.assertAll();
    }
	
	@Test
	public void test_search_by_measurement_reading_name() throws Exception {
		SoftAssert sa = new SoftAssert();
		FormMeasurementsKA mesurementsForm= new FormMeasurementsKA();
		AppElement.waitForEnable(OrderExecutionWidgetId.getWidgetId("tmpMeasurementReadings_lblMeasurementName"));
		AppElement ReadingName = new AppElement(OrderExecutionWidgetId.getWidgetId("tmpMeasurementReadings_lblMeasurementName"));
		String Reading = ReadingName.getText();
		mesurementsForm.doSearch(Reading);
		sa.assertTrue(mesurementsForm.verifySearchResultByReadingName(Reading));
	}
	
	@AfterClass(alwaysRun=true)
	public void setUpAfterClass() throws Exception{
		SoftAssert sa = new SoftAssert();
		try{
		FormMeasurementsKA mesurementsForm = new FormMeasurementsKA();	
		FormMeasurementExecutionKA frmMeasurementExecutionKA = mesurementsForm.navigateBackToMeasurementExecution();	
		frmMeasurementExecutionKA.navigateBackToOrderExecution();	
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
	
