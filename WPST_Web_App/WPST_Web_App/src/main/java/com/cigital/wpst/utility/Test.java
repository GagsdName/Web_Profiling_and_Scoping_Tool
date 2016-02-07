package com.cigital.wpst.utility;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.cigital.wpst.bean.WpstResponseBean;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

public class Test {

	public static void main(String[] args) {
		
		/*List<Integer> allPorst = new ArrayList<Integer>();
		allPorst.add(80);
		allPorst.add(8081);
		allPorst.add(51);
		
		
		WpstResponseBean bean = new WpstResponseBean();
		bean.setOpenPorts(allPorst);
		
		Gson gson = new Gson();
		JsonObject jsonObj = new JsonObject();
		String jsonObj1 = gson.toJson(allPorst);
		
		System.out.println(jsonObj1);
*/
		Type type = new TypeToken<List<Integer>>(){}.getType();
		Gson gson = new Gson();
		String x = "[80,8081,51]";
		
		List<Integer> ports = gson.fromJson(x, type);
		
		System.out.println(ports.get(0));
	}

}
