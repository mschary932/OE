package test.java.orderexecution;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import org.codehaus.jettison.json.*;

import test.common.SgConfiguration;
//import test.dataconnector.sapconnector.DataConnectorConfig;
import test.dataconnector.sapconnector.SAPDataConnector;

public class DeleteWorkOrders extends SAPDataConnector {

	public void deleteWorkOrders(String username,String password,String sapurl)  throws Exception
    {
          
		SgConfiguration sgconf = SgConfiguration.getInstance();
		JSONObject deleteJson =new JSONObject();
		deleteJson=filetoJSONConvert("deletejson.json");
		deleteJson.getJSONObject("entry").getJSONObject("ZEAM_USER_COMPLETE").put("USERID", sgconf.getKeyValue("username"));
//		System.out.println(deleteJson);
		getSessionKey(username, password, sapurl);
		System.out.println("##########Started Deleting Data##########");
		if(postdata(deleteJson, "ZEAM_DOB_USER_COMPLETE")!=null)
		{
		//System.out.println("##########Started Deleting Data##########");
		    int count =1; 
		    JSONObject getjson=new JSONObject();
		    boolean delFlag=false;
		    while(count <=10)
		   {  
			Thread.sleep(30000);
			getjson=getDataJson(null, "EAM_DOB_WORK_ORDER");
			if(getjson.toString().contains("INTERNAL_NUMBER"))
			{
				System.out.println(count + ") Deletion still in progress................");
				count++;
			}
			else
			{
				delFlag=true;
				break;
			}
			
		  }
		  if(delFlag)
			System.out.println("Deletion of data Complete");
		  else
			System.out.println("Deletion of data NOT Completed");
       }
	   else
		{
			System.out.println("Delete Data Post Call resulted into a NULL...Deletion not complete");
		}
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
		return (new JSONObject(line1));
	}

	
}
