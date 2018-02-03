/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

package com.sample;

import java.util.logging.Logger;

import javax.ws.rs.core.Context;

import org.lightcouch.CouchDbException;

import com.amazonaws.SDKGlobalConfiguration;
import com.cloudant.client.api.CloudantClient;
import com.cloudant.client.api.Database;
import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.MFPJAXRSApplication;
import com.ibm.oauth.BasicIBMOAuthCredentials;
import com.ibm.oauth.IBMOAuthCredentials;
import com.ibm.oauth.OAuthServiceException;

public class CloudantJavaApplication extends MFPJAXRSApplication{

	static Logger logger = Logger.getLogger(CloudantJavaApplication.class.getName());

	@Context
	ConfigurationAPI configurationAPI;

	public Database db = null;

	private IBMOAuthCredentials oAuthCreds = null;
	private String baseUrl = "";

	protected void init() throws Exception {
		logger.info("Initializing adapter...");
		String cloudantDBName = configurationAPI.getPropertyValue("DBName");
		String cloudantAccount = configurationAPI.getPropertyValue("account");
		String cloudantKey = configurationAPI.getPropertyValue("key");
		String cloudantPassword = configurationAPI.getPropertyValue("password");

		if (!cloudantDBName.isEmpty() && !cloudantAccount.isEmpty() && !cloudantKey.isEmpty() && !cloudantPassword.isEmpty()){
			try {
				CloudantClient cloudantClient = new CloudantClient(cloudantAccount,cloudantKey,cloudantPassword);
				db = cloudantClient.database(cloudantDBName, false);
			} catch (CouchDbException e){
				throw new Exception("Unable to connect to Cloudant DB, check the configuration.");
			}
		}

		String endpointURL = configurationAPI.getPropertyValue("endpointURL");
		String bucketName = configurationAPI.getPropertyValue("bucketName");
		String serviceId = configurationAPI.getPropertyValue("serviceId");
		String apiKey = configurationAPI.getPropertyValue("apiKey");

		if (!endpointURL.isEmpty() && !bucketName.isEmpty() && !serviceId.isEmpty() && !apiKey.isEmpty()) {
			try {
				SDKGlobalConfiguration.IAM_ENDPOINT = "https://iam.bluemix.net/oidc/token";
				oAuthCreds = new BasicIBMOAuthCredentials(apiKey, serviceId);
				// initialize fetching and caching of token
				oAuthCreds.getTokenManager().getToken();
				this.baseUrl = endpointURL + "/" + bucketName + "/";
			} catch (OAuthServiceException e) {
				throw new Exception("Unable to connect to Object Storage, check the configuration.");
			}
		}

		logger.info("Adapter initialized!");
	}

	public ObjectStorageAccess getObjectStorageAccess() {
		return new ObjectStorageAccess(this.baseUrl, oAuthCreds.getTokenManager().getToken());
	}

	protected void destroy() throws Exception {
		logger.info("Adapter destroyed!");
	}

	protected String getPackageToScan() {
		//The package of this class will be scanned (recursively) to find JAX-RS resources.
		//It is also possible to override "getPackagesToScan" method in order to return more than one package for scanning
		return getClass().getPackage().getName();
	}
}
