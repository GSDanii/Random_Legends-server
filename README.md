# Proyecto-API-riot

Our API is designed for League of Legends, it has some functionalities like a Champions gallery, the weekly Champions rotation, and a tool to use with friends that picks for you a random Champion with random items to play a game JUST FOR FUN!, no raging allowed.
## Requirements
- Fork this repo
- Clone this repo
## Instructions
To use our API, download it and investigate through the different sections.
In the Champions gallery, just click on the character you want to see some information, and other window will be displayed with extra data.
In the Random Pick section, click over so a random Champion and build is generated. You can comment down below and see other users comments and the champions they got.

## Endpoints

| HTTP Method 	| URI path      	| Description                                    	
|-------------	|---------------	|------------------------------------------------
| GET         	| /auth/login       | View login page          	| 
| POST         	| /auth/login 	    | Receives user authentification data	| 
| GET         	| /auth/signUp	    | View Sign Up page 	| 
| POST        	| /auth/signUp 	    | Receives user new profile data 	|
| GET         	| /auth/logout 	    | Closes user session, F in the chat|
| GET         	| /profile/:id 	    | View of the profile of the authenticated user | 
| GET         	| /profile/:id/update | View of the profile update page 	| 
| POST         	| /profile/:id/update | Update profile data of the user 	| 
| GET         	| /profile/:id/delete | Deletes the user data 	|
| GET         	| /randomSelector 	| View of the Random Champion selector page 	|
