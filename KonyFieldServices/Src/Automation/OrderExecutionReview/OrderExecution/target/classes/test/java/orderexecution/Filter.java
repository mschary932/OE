package test.java.orderexecution;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Filter {
	String type;
	List<String> filter;
	
	public Filter(){
		type =null;
		filter =new ArrayList<String>();
	}
	
	public Filter(String type, String []values){
		this.type = type;
		this.filter = new ArrayList<>();
		if(values!=null){
			for(int i=0; i<values.length; i++)
				filter.add(values[i]);
		}
	}
	
	public String getType(){
		return type;
	}
	
	public List<String> getFilter(){
		return filter;
	}
	
	public void addFilter(String value){
		filter.add(value);
	}
	
	public void removeFilter(String value){
		filter.remove(value);
	}
	
	public String toString(){
		StringBuffer str = new StringBuffer("Type: " + type +"; Values: ");
		Iterator<String> itr = filter.iterator();
		while(itr.hasNext()){
			str.append(itr.next());
			str.append(",");
		}
		return str.toString();
	}

}
