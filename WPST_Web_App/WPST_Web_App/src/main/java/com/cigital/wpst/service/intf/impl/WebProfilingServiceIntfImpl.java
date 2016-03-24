package com.cigital.wpst.service.intf.impl;

import java.io.IOException;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.Socket;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.cigital.wpst.bean.WpstResponseBean;
import com.cigital.wpst.service.intf.WebProfilingServiceIntf;

@Repository
@Service
public class WebProfilingServiceIntfImpl implements WebProfilingServiceIntf {

	@Override
	public boolean isPortAvailable(String host, int port) {

		System.out.println("--------------Testing port " + port);
		Socket s = null;
		try {
			s = new Socket(host, port);

			// If the code makes it this far without an exception it means
			// something is using the port and has responded.
			System.out.println("--------------Port " + port + " is not available");
			return false;
		} catch (IOException e) {
			System.out.println("--------------Port " + port + " is available");
			return true;
		} finally {
			if (s != null) {
				try {
					s.close();
				} catch (IOException e) {
					throw new RuntimeException("You should handle this error.", e);
				}
			}
		}

		// return false;
	}

	@Override
	public List<Integer> availablePorts(String host, List<Integer> allPorts) {
		// TODO Auto-generated method stub

		List<Integer> allOpenPorts = new ArrayList<Integer>();

		for (int port : allPorts) {

			System.out.println(port);
			if (isPortAvailable(host, port))
				allOpenPorts.add(port);
		}
		return allOpenPorts;
	}

	@Override
	public WpstResponseBean getHostInfo(String location) throws MalformedURLException, UnknownHostException {
		
		WpstResponseBean resut = new WpstResponseBean();
		
		URL aURL = new URL(location);

//		System.out.println("protocol = " + aURL.getProtocol()); // http
		resut.setProtocol(aURL.getProtocol());
		
//		System.out.println("authority = " + aURL.getAuthority()); // example.com:80
		
//		System.out.println("host = " + aURL.getHost()); // example.com
//		System.out.println("port = " + aURL.getPort()); // 80
		resut.setPort(aURL.getPort());
		
//		System.out.println("path = " + aURL.getPath()); // /docs/books/tutorial/index.html
//		System.out.println("query = " + aURL.getQuery()); // name=networking
//		System.out.println("filename = " + aURL.getFile()); /// docs/books/tutorial/index.html?name=networking
//		System.out.println("ref = " + aURL.getRef()); // DOWNLOADING
		
		InetAddress address = InetAddress.getByName(aURL.getHost());
		resut.setDomain(address.getHostName());
		resut.setIp(address.getHostAddress());
//		System.out.println(address.toString());
		return resut;
	}
	
	
	@Override
	public WpstResponseBean getHeaders(String location) throws MalformedURLException, UnknownHostException {
		
		WpstResponseBean resut = new WpstResponseBean();
		
		URL aURL = new URL(location);

		resut.setProtocol(aURL.getProtocol());
		
		resut.setPort(aURL.getPort());

		InetAddress address = InetAddress.getByName(aURL.getHost());
		resut.setDomain(address.getHostName());
		resut.setIp(address.getHostAddress());
		
		return resut;
	}

}
