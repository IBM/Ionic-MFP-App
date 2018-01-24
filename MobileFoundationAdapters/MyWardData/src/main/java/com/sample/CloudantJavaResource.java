/**
* Copyright 2017 IBM Corp.
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

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.lightcouch.NoDocumentException;

import com.cloudant.client.api.Database;
import com.ibm.mfp.adapter.api.AdaptersAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

@Path("/")
@OAuthSecurity(scope = "UserLogin")
public class CloudantJavaResource {
	/*
	 * For more info on JAX-RS see https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	@Context
	AdaptersAPI adaptersAPI;

	private Database getDB() throws Exception {
		CloudantJavaApplication app = adaptersAPI.getJaxRsApplication(CloudantJavaApplication.class);
		if (app.db != null) {
			return app.db;
		}
		throw new Exception("Unable to connect to Cloudant DB, check the configuration.");
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addEntry(MyWardGrievance myWardGrievance) throws Exception {
		if (myWardGrievance != null && myWardGrievance.hasRequiredFields()) {
			getDB().save(myWardGrievance);
			return Response.ok().build();
		} else {
			return Response.status(400).build();
		}
	}

	@DELETE
	@Path("/{id}")
	public Response deleteEntry(@PathParam("id") String id) throws Exception {
		try {
			MyWardGrievance myWardGrievance = getDB().find(MyWardGrievance.class, id);
			getDB().remove(myWardGrievance);
			return Response.ok().build();
		} catch (NoDocumentException e) {
			return Response.status(404).build();
		}
	}

	@GET
	@Produces("application/json")
	public Response getAllEntries() throws Exception {
		List<MyWardGrievance> entries = getDB().view("_all_docs").includeDocs(true).query(MyWardGrievance.class);
		return Response.ok(entries).build();
	}

	@GET
	@Path("/objectStorage")
	@Produces("application/json")
	public Response getObjectStorageAccess() throws Exception {
		CloudantJavaApplication app = adaptersAPI.getJaxRsApplication(CloudantJavaApplication.class);
		return Response.ok(app.getObjectStorageAccess()).build();
	}
}
