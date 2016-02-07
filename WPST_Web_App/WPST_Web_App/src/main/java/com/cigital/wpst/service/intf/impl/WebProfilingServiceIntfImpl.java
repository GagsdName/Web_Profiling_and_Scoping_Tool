package com.cigital.wpst.service.intf.impl;

import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

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

}
