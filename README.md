<img src="https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/d791fb03-8a2c-4dcf-af0d-00152e932339" width="100" height="100"> 

# InfoJovs (v of Vue) || Frontend of [InfoJovs_back](https://github.com/joseangelcrn/InfoJovs_back)  


 
## An infojobs app based (in progress..) 


<hr>

An application with two main roles ( **Recruiter** and **Employee** )  where you can **offer jobs** if you are  Recruiter or **to apply for jobs** if are an Employee.


### **Recruiter**

- [x] You can create offers
- [x] You can close your offers 
- [x] See how many employees have applied to the offer
- [x] Change status of candidatures for employees who has applied in your own offers
- [x] You can attach questions to job application. It will be displayed to employees once they will applicate job.


### **Employee**

- [x] You can apply offers
- [x] See your candidatures status
- [x] You can see an history of  your candidatures.
- [ ] You can create a dynamic CV who recruiters will be able to see to get more information of  your professional profile
- [ ] You can search jobs filtering by different fields

      
<hr>



# Setup 

## .Env 
You must configure `.env` file by replacing `VUE_APP_HOST_BACKEND` for your **Infojovs_back** host. Example:

Example: 
```
VUE_APP_HOST_BACKEND="http://localhost:8686/api" 
```

## Run
```
cd InfoJovs_front
npm install
npm run serve
```

 
## Images 

### Login

![login](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/57437325-0f2c-40d3-9845-5fca8e85c56b)

### Sign Up 

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/1e9ba965-4736-474c-bad0-c0357a7825ad)


## As Recruiter you can ....

### Access to different entries

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/2e4f7ea4-5a54-478c-a20f-d70d5e38a918)


### Access to your home view with basic information

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/9ce18c10-5699-482b-854f-d4f7a5f8c88f)

### Access to Job Finder, where you can see current active Jobs of different Recruiters

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/f78da44e-d070-4f25-bb60-c544caa041e5)


### Create a Job Offer

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/186edf0f-e631-46ed-9480-4529a4a8ea82)

You can insert Tags to get easily found by employees 

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/4b2d41d7-fefd-47b1-8a35-594898790ba0)

Creating questions which employees will be able to respond when they apply the job :

There are two question types:

Free Question: 

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/83dbac4f-3bab-4fba-86fc-288b255c864f)

Options Question:

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/a71280b7-c28a-4432-a3eb-1269a23486bc)

Once saved , it is not stored in database until you save/update your whole Job. Meanwhile is cached.

Temporary store and saved (db) questions are displayed with a tab system component :

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/6e225120-4e1f-4af0-92b7-186b544317ea)

### Manage your Jobs

If you acces  one of your jobs :

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/bbdfa7ed-6d35-4c7d-adce-f54d4d91c18f)

It will appear a **Additional Information** button : 

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/c797eb6f-bf3c-4e88-9edb-b016a06ba01e)

Where you will be able to manage everything related with your job by different tabs:

## Main Info Tab

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/21635079-d4ac-44d3-ac3c-34d726e6d9aa)

You can active or deactive your own jobs.
In addition, you can see charts with information about your Job, such as : Professional Profiles of employees who applied your Job, or different candidature statuses.
Also you can select single or multiple candidatures and change status of it :

## Candidatures Tab

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/2f9d5643-7dd1-46ac-b93b-208d8abee224)

Here you can manage candidature statuses  by changing singe or multiple candidatures:

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/7e7d6e54-183f-49ce-a8a9-f2d17519274a)

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/06c0bcfd-39a3-4112-9ad7-d12d8efc09d2)

Also you can see differents answers has been made by employees about Job Offer:

![image](https://github.com/joseangelcrn/InfoJovs_front/assets/47973568/24575f4e-1c48-4914-be60-b8a66e05c21b)




