package test.java.orderexecution;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.codehaus.jettison.json.*;

import test.common.SgConfiguration;
import test.dataconnector.sapconnector.DataConnectorConfig;
import test.dataconnector.sapconnector.SAPDataConnector;
public class CreateWorkOrders extends SAPDataConnector{
	
	public String createWorkOrders(String username,String password,String sapurl) throws Exception
	{
//		SAPDataConnector sapDataConn = new SAPDataConnector();
		JSONObject sessionObject=null;
		sessionObject =getSessionKey(username, password, sapurl);
	    HashMap<String,String> sessionList=new HashMap<String,String>();
        sessionList.put("parameter1", sessionObject.getJSONObject("entry").getString("parameter1"));
        sessionList.put("parameter2", sessionObject.getJSONObject("entry").getString("parameter2"));
		DataConnectorConfig dcconfig = DataConnectorConfig.getInstance();
		JSONObject templateJson = new JSONObject();
		templateJson=filetoJSONConvert(dcconfig.getKeyValue("templateJSONFile"));
		JSONObject valuesJson =new JSONObject();
		valuesJson=filetoJSONConvert(dcconfig.getKeyValue("inputJSONFile"));
		JSONObject inputJson=new JSONObject();
		inputJson=generateSAPJSON(valuesJson,sessionList);
		ArrayList<String > resultArray = new ArrayList<String>();
		resultArray = CreateNPostData(inputJson, templateJson, dcconfig.getKeyValue("postDataCall"),dcconfig.getKeyValue("VerifyCreationStatusCall"),dcconfig.getKeyValue("primaryIdentifierKey"));
		String resultString="";
		for(int i=0; i<resultArray.size();i++){
	          resultString = resultString + "\n" + resultArray.get(i);
		}
		return resultString;
	}
	public JSONObject filetoJSONConvert(String FileName) throws IOException, JSONException
	{
		FileReader f1 = new FileReader(FileName);
	    @SuppressWarnings("resource")
		BufferedReader br1 = new BufferedReader(f1);
	    String currline1;
		String line1="";
		while((currline1 = br1.readLine())!=null)
	    	line1=line1+currline1;
		return new JSONObject(line1);
	}
	
	@SuppressWarnings("unchecked")
	public JSONObject generateSAPJSON(JSONObject valuesJson, HashMap<String, String> sessionList) throws JSONException, ParseException
	{
		
		DataConnectorConfig dcconfig = DataConnectorConfig.getInstance();
		JSONArray  orders=new JSONArray();
		JSONObject initial =null;
		 List<String> arr=new ArrayList<String>();
		@SuppressWarnings("rawtypes")
		java.util.Iterator keysObject1 = valuesJson.keys();
		while(keysObject1.hasNext() )
	    {
			initial=new JSONObject();
			String key = (String)keysObject1.next();
			for(int i=0;i<valuesJson.getJSONArray(key).length();i++)
			{
				
				@SuppressWarnings("rawtypes")
				java.util.Iterator keysObject2=valuesJson.getJSONArray(key).getJSONObject(i).keys();
			    while(keysObject2.hasNext())
			    {
			    	String print = (String)keysObject2.next();
			    	if(print.equalsIgnoreCase("Status"))
			    	{
			    		String value=dcconfig.getKeyValue(print+"."+valuesJson.getJSONArray(key).getJSONObject(i).getString(print));
			    		arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));
			    		for (String g: arr)
			    			initial.put(g, value);
			    		
			    	}
			    	else if(print.equalsIgnoreCase("Priority"))
			    	{
			    		
			    		String value=dcconfig.getKeyValue(print+"."+valuesJson.getJSONArray(key).getJSONObject(i).getString(print));
			    		arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));
			    		for (String g: arr)
			    			initial.put(g, value);
			    		
			    		
			    		
			    	}
			    	else if(print.equalsIgnoreCase("Startdate"))
			    	{
			    		String BASIC_START_DAT=fetchBASIC_START_DAT(valuesJson.getJSONArray(key).getJSONObject(i).getString(print));
			    		arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));
			    		for (String g: arr)
			    			initial.put(g,BASIC_START_DAT);
			    		initial.put(dcconfig.getKeyValue("FinishDate"+"."+"FieldName"),fecthNextday(BASIC_START_DAT));
			    	    
			    	}
			    	else if(print.equalsIgnoreCase("Description"))
			    	{
			    		arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));
			    		for (String g: arr)
			    			initial.put(g,valuesJson.getJSONArray(key).getJSONObject(i).getString(print));
			    		
			    	}
//			    	else if(print.equalsIgnoreCase("PLANT"))
//			    	{
//			         arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));	
//			         for (String g: arr)
//			    			initial.put(g,sessionList.get("parameter1"));
//			        
//			       	}
//			    	else if(print.equalsIgnoreCase("WorkCenter"))
//			    	{
//			    		arr=getInputKeys(dcconfig.getKeyValue(print+"."+"FieldName"));
//			    		for (String g: arr)
//			    			initial.put(g,sessionList.get("parameter2"));
//			    		
//			       	}
			    	else
			    		initial.put(print,valuesJson.getJSONArray(key).getJSONObject(i).getString(print));
			    	
			    
			    }
			    arr=getInputKeys(dcconfig.getKeyValue("Plant"+"."+"FieldName"));	
		         for (String g: arr)
		    			initial.put(g,sessionList.get("parameter2"));
		         arr=getInputKeys(dcconfig.getKeyValue("WorkCenter"+"."+"FieldName"));	
		         for (String g: arr)
		    			initial.put(g,sessionList.get("parameter1"));
		         String ORDER_NUM=fetchOrderNumber();
			    arr=getInputKeys(dcconfig.getKeyValue("OrderNumber"+"."+"FieldName"));
	    		for (String g: arr)
	    			initial.put(g,ORDER_NUM);
	    		String[] times=getStartFinishTimes().split(",");
	    		initial.put(dcconfig.getKeyValue("StartTime"+"."+"FieldName"),times[0].trim());
	    		initial.put(dcconfig.getKeyValue("FinishTime"+"."+"FieldName"),times[1].trim());
				initial.put("COMP_ITEM_NUM","");
				initial.put("TASK_ID","");
	    		orders.put(i, initial);
			    initial=new JSONObject();
			}
		
	    }
		JSONObject inputjson=new JSONObject();
		inputjson.put("workorders",orders);
		return inputjson;
	}

	public static String fetchBASIC_START_DAT(String givenDate) {
		String requiredDate=givenDate;
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		Date todayDate = new Date();
		if(requiredDate.equalsIgnoreCase("today"))
		{
		  requiredDate = format.format(todayDate);
		  return requiredDate;
		}
		 if((requiredDate.trim().length()>5)&& requiredDate.toLowerCase().contains("today"))
		 {
			Calendar c = Calendar.getInstance();
			c.setTime(todayDate);
			c.add(Calendar.DATE, Integer.parseInt(requiredDate.substring(5)));
			requiredDate=(format.format(c.getTime()));
			return requiredDate;
		 }  
		
		return requiredDate;
	}


	public  String fetchOrderNumber() {
		
		Date todayDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
	    String dateToday = format.format(todayDate);
	    int max=9999,min=1000;
	    int num = min + (int)(Math.random() * ((max - min) + 1));
	    return ( "ORD"+dateToday+num);
	}
	public String fecthNextday(String BASIC_START_DAT) throws ParseException
	{
		Calendar c = Calendar.getInstance();
		c.setTime(new SimpleDateFormat("yyyyMMdd").parse(BASIC_START_DAT));
		c.add(Calendar.DATE, 1);
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		return(format.format(c.getTime()));
	}
	@SuppressWarnings("rawtypes")
	public List getInputKeys(String key) throws JSONException
	{
	    List<String> ar=new ArrayList<String>();
		if(key.contains(","))
		{
			String[] fieldNames = key.split(",");
		    ar = Arrays.asList(fieldNames);
		}
		else
		{
		    ar.add(key);
		}
		return ar;
		
	}
	public String getStartFinishTimes()
	{
		Date today = new Date();
        SimpleDateFormat format = new SimpleDateFormat("HHmmss");
        String startTime = format.format(today);
        Calendar c = Calendar.getInstance();
        c.add(Calendar.HOUR_OF_DAY, 2);
        Date finishDate = c.getTime();
        String finishTime = format.format(finishDate);
        return (startTime+","+finishTime);
	}
	public String createWorkOrdersCRM(String SAPURL) throws IOException, JSONException
	{
		String responsecode="";
		DataConnectorConfig dcconfig = DataConnectorConfig.getInstance();
		JSONObject templateJsonCRM = new JSONObject();
		templateJsonCRM=filetoJSONConvert(dcconfig.getKeyValue("templateJSONFileCRM"));
		templateJsonCRM.getJSONObject("entry").getJSONObject("YAWS_USER").put("userid",SgConfiguration.getInstance().getKeyValue("username")); 
	    try
		{
	    CloseableHttpClient httpClient = HttpClientBuilder.create().build();
	    HttpPost request = new HttpPost(SAPURL+"DEMO_TEST_DRIVE_USER");
        StringEntity params =new StringEntity(templateJsonCRM.toString());
        request.addHeader("KonySAP-Session-Key","*");
        request.addHeader("content-type", "application/json");
        request.setEntity(params);
        CloseableHttpResponse response = httpClient.execute(request);
        responsecode=response.getStatusLine().toString();
        System.out.println("Posting of the service is complete.....Waiting for completiong of data creation");
        Thread.sleep(180000);
        System.out.println("CRM Data Creation Complete");
        return responsecode;
		}
		catch(Exception e)
		{
			System.out.println("In catch block of createWorkOrdersCRM.............."+SAPURL+"DEMO_TEST_DRIVE_USER");
			System.out.println(e.getMessage());
			
		}
	    return null;

}
}
	
	

