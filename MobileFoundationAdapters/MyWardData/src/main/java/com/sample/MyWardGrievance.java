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

public class MyWardGrievance {
	public String _id, _rev;
	public String reportedBy;
	public String reportedDateTime;
	public static class PictureInfo {
		public String large;
		public String thumbnail;
	}
	public PictureInfo picture;
	public String problemDescription;
	public static class GeoLocation {
		public String type = "Point";
		public Number[] coordinates = new Number[2];
	}
	public GeoLocation geoLocation;
	public String address;
}
