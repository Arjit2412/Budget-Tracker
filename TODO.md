### Paths to complete

The following areas should be completed for the success of this project:
- [ ] Frontend
- [ ] APIS
- [ ] Admin Feature
- [ ] Map
- [ ] Data Visualization for comparision
- [ ] Feedback form and Analysis of forms
- [ ] Schema Recheck - Zolo will do

> The order signifies the importance only, not the order of execution

## Frontend

The following pages are needed:

1. `MinistryPage` - This will show all the data returned by the backend, ui decided by Arjit
2. `ProjectPage`  - Similar as above
3. `IncomePage`   - Similar as above
4. `SchemePage`   - Similar as above

The following components are needed:

1. `MinistryCard` - This will show `Image`, `head`, `name`, `desc` of the `Ministry`
2. `ProjectTable` - This will show all `Projects` returned by the api call on `api/project?local=&state=&ministry=&name=` or `api/project/id`
3. `IncomeTable`  - This will show all `Income` returned by the api call on `api/income?local=&state=&ministry=&name=` or `api/income/id`
4. `SchemeTable`  - This will show all `Scheme` returned by the api call on `api/scheme?local=&state=&ministry=&name=` or `api/scheme/id`

#### If time left

1. Search feature on project, income and scheme page.
2. Search feature on landing page

## APIS

1. Schema Recheck is needed. (However it is optional, skip this part)
2. Current apis don't support file uploads, taking the help of schema ensure smooth file uploading
3. All the `GET` apis currently return all the data or data by id, we need APIS that filter the data based on query params -> `local=&state=&ministry=&name=`. (Don't forget to check the scheme of object whose get route ur are writing. Some schemas might not need the name param)

> While creating the APIS you might use a postman to test it, so keep saving the postman collection as well.

#### If time left

1. Pagination of results
2. Admin Middleware

## Admin Feature

1. Forms for all the create APIS of the project
2. A login page for admin (ensure input is properly sanitized)
3. If Middleware is implemented then we will add it on all the create routes.

## Map

The importance of this part is low but once implemented along with the search feature will boost the user experience.
The objective of this portion is to have a Map view of `India, State, Locality` and the selecting the area of interest to check the details of that area.
Since at the end of prev line the user wants to check the details of that area, Frontend and APIS are more important than this.

1. Leaflet/GoogleMapsApi/Mapbox will help with map interactivity
2. We will need GeoJSON data to draw line around states and constituency of India. (I guess we should make 2 maps, one for states and one for localility seperately)
3. After the above is done, implement dynamic routing - Zolo

## Data Visualization

The importance is set low since this task requires some research on graph creation, might need creation of new APIS and pages under `time constraint of 4 days`.
If the `Map` feature is implemented we can implement this feature at the day of hackathon.
However due to time constraint I am not sure.

Here is the roadmap anyway:

1. Deciding the graphs we will use based on the data on database. (For now i can't say for sure unless the First 2 pts are not completed)
2. An api might be needed that will take 2 states/locals/minsitries and make a `comparision logic` (that i can't say for sure for now)
3. A simple frontend page that will display the graphs.

#### Future scope

1. The api should handle more than 2 objects and return graphs accordingly.

## Feedback form and Analysis

1. A simple form for a user to submit a complaint for any discipancy of budgets or unsatisfactory work of the government on a project or scheme.
2. An api to analyize all the forms submitted by the users, so that the admin can easily find out the main points rather than reading 1000+ forms and making a report.

The first pt is easy to make and 2nd pt might not be needed hence the priority is lowest

## Future scopes of the project

1. Filtering data based on yr
  - Apis will return data based on yr range
  - Frontend will show filtering options in search
2. Using actual data of government
3. Integration of Analysis tools and better comparision methods

## What I expect?

I expect that we `must` complete till the `Map` if we want the project to be called a `prototype` enough.

## How we will achieve this?

1. Parallel working on all the four pts is needed.
2. Arjit and Zolo needs to work closely to ensure the fronted routes and display data as expected.
3. Ashu and Zolo needs to ensure the proper working of APIS, postman collection and Admin routes/middleware.
4. Arihant needs to create forms for all the create routes after Ashu and Zolo completes the Admin apis. Till then he should work around creating the Map functionality.

## Day plan

We are low on time, Ashu might be busy with Summer work and Zolo as well on Society work.
Combining the above three conditions Our best case scenario is to create `Map` feature atleast!!!

### Day 1 (27)

1. All the Components of frontend mentioned above must be completed. - Arjit
2. The Schema must be verified and the GET routes properly created and if possible tested. - Ashu(GET) and Zolo(Schema)
3. Map functionality roadmap and GeoJson data collection, with some implementation - Arihant(major work) and Zolo.

### Day 2 (28)

1. Frontend part must be completed - Arjit
2. APIS must be completed (if creation is completed early and zolo had time work on Admin middleware and Auth) - Ashu and Zolo
3. Finishing up with the map work - Arihant

### Day 3 (29)

1. Forms for `income/state/ministry/scheme/project` must be created for admin - Arjit
2. Some dummy data should be filled in database and Backend apis integrated with the frontend - Zolo
3. [Buffer for Ashu and Arihant, if above of tasks are remaining then complete them else Zolo will adapt the roadmap]

### Day 4 (30)

1. Research and develop Data Visualization roadmap - Zolo, Arihant (research); Arihant or Arjit (develop frontend); Zolo (api)

### Day 5 (31)

1. Finalize Data Visualization. - Arihant and Arjit
2. Patch up and finalize the project. - Zolo and Ashu
3. Create roadmap for Day 6 - Zolo
