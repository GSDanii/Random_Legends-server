# Proyecto-APP-riot-Random Legends

Our APP is designed for League of Legends, it has some functionalities like a Champions gallery, the weekly Champions rotation, and a tool to use with friends that picks for you a random Champion with random items to play a game JUST FOR FUN!, no raging allowed.

## Instructions
To use our APP, download it and investigate through the different sections.
In the Champions gallery, just click on the character you want to see some information, and other window will be displayed with extra data.
In the Random Pick section, click over so a random Champion and build is generated. You can comment down below and see other users comments and the champions they got.

## Endpoints server

| HTTP Method 	| URI path      	| Description                                    	
|-------------	|---------------	|------------------------------------------------
| POST         	| /auth/login 	    | Receives user authentification data.	| 
| POST        	| /auth/signUp 	    | Receives user new profile data.	|
| GET         	| /auth/logout 	    | Closes user session, F in the chat.|
| GET         	| /profile/:id 	    | Receives Json with user details. | 
| GET         	| /profile/users 	    | Receives Json with all the users from the page. | 
| PUT         	| /profile/:id/update | Updates profile data of the user.	| 
| DELETE        | /profile/:id/delete | Deletes the user data. 	|
| GET         	| /forum 	        | Receives Json whit all posts.	|
| GET         	| /forum/:id 	    | Receives a Json of an existing post. 	|
| POST         	| /forum/post 	    | Create a new post. 	|
| DELETE        | /forum/:idPost/delete | Delete specific post.	|
| GET         	| /championsList | Receives a Json with all champions data. 	|
| GET         	| /randomPick 	| Receives a Json of a random champion with its specific data. 	|
| GET         	| /weeklyRotation 	| Receives a Json with the image and name of the weekly rotation champions in the game. 	|
| GET         	| /champion-details/:championName | Receives a Json with the champions data of an specific champion.	|



## Client Routes

| Path      	    | Element               | Description                                   	
|---------------    |------------           |-------------------------------
| /home	            | HomePage          	| Render´s the home page alongside a carousel with posts from the server.
| /login	        | LoginPage          	| Render´s a form with the required information of the user to Login.
| /signup	        | SignupPage          	| Render´s a form with the required information to Sign Up in the App.
| /userid	        | UserIdPage          	| Render´s profile page of the user, with his specific data.
| /weekly-rotation	| WeeklyRotationPage    | Render´s the weekly rotation of champs from the game.
| /random-pick	    | RandomPickPage        | Render´s a page with a random champion and 6 random items of the game, and a post to  comment the champion you got.
| /forum	        | ForumPage          	| Render´s all the forum posts, and if you click on one, displays the random pick and the comment that another user posted.
| /champions	    | ChampionPage          | Render´s all the champions from the game.
| /champion-details	| ChampionDetailsPage   | Render´s an specific champion data of the game, alongside a graphic with its stats.



 © Daniel González & Daniel Moreta
