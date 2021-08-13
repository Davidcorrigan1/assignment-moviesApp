# Assignment - ReactJS app.

Name: David Corrigan

## Overview.

The objective of my assignment are the following extentions to the MovieApp which will allow me to showcase the React and Material UI skills I have learned in the ICT2 module. 

+ A new SignUp and SignIn pages for the user, plus a signout option
+ A new MUST-WATCH page for movies added to a must watch list in the Upcoming Movies page
+ A new Search page which allows the user to search by Genre, Release Year and/or Certification
+ Update to the Movie Details page to now display a scrollable grid of cast members on the movie. Each cast card has a 'Movies' button which routes to a page of movies in which taht cast member appears.
+ Adding a new AppearIn Page which displays the movies a specific cast member appears in.
+ Setting All routes except the Homepage as Private, requiring authentication including favorite icon.
+ Adding Authentication using Firebase Auth functionality
+ Adding Firebase storage for user data, like TMDB favorite/must-watch List id and username
+ Using the List functionality in the TMDB api to store favorite and must-watch movies for a logged in user.
+ Pagination on the Homepage, the Upcoming Movies Page and search page
+ Using Query string in the API call for the Search page.
+ Caching of most API calls, including the variable query API call for the search page.



## Setup requirements.

...... A brief explanation (to a third party) of any non-standard setup steps necessary to run your app/client locally (after cloning the repo) ........

+ A Firebase Project is required to be created. And the following details added to the .env

    + REACT_APP_API_KEY=.....
    + REACT_APP_AUTH_DOMAIN=....
    + REACT_APP_PROJECT_ID=....
    + REACT_APP_STORAGE_BUCKET=....
    + REACT_APP_MESSAGING_SENDER_ID=...
    + REACT_APP_APP_ID=...
    + REACT_APP_MEASUREMENT_ID=...

+ A login to TMDB is required (incuding api key):

    + REACT_APP_TMDB_KEY=...
    + REACT_APP_TMDB_USERNAME=...
    + REACT_APP_TMDB_PASSWORD=...  


## API Data Model.

Additional API TMDB Endpoints Used with sample results:

+ API Endpoint for search Query (where searchQuery = "&certification_country=GB&with_genres=28&primary_release_year=2021&certification=15" for example): 

    + `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}${searchQuery}&language=en-US&include_adult=false&include_video=false&page=${page}`


    + Sample Result:

    ```json

    {
        page: 1,
        results: [
        {
        adult: false,
        backdrop_path: "/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
        genre_ids: [
        28,
        12,
        35,
        878
        ],
        id: 436969,
        original_language: "en",
        original_title: "The Suicide Squad",
        overview: "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.",
        popularity: 4168.234,
        poster_path: "/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg",
        release_date: "2021-07-28",
        title: "The Suicide Squad",
        video: false,
        vote_average: 8.2,
        vote_count: 1203
        },],
    total_pages: 3,
    total_results: 54
    }
    ```

+ API Endpoint for retieving data on a person based on id: 

    + `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`


    + Sample Result:

    ```json

    {

    }
    ```


+ API Endpoint which returns the cast of a particular movie based on movie id: 

    + `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`


    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which returns the movies a person is involved in based on person id: 

    + `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_people=${id}`


    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which returns the possible certification per country: 

    + `https://api.themoviedb.org/3/certification/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`


    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which returns a request token from TMDB: 

    + `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`


    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which authenticate a request token from TMDB: 

    + `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}`

    + The following data is required in the request body
        + const data ={
                        "username": process.env.REACT_APP_TMDB_USERNAME,
                        "password": process.env.REACT_APP_TMDB_PASSWORD,
                        "request_token": requestToken,
                    };

    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which creates a session id from TMDB: 

    +  `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`

    + The following data is required in the request body
        + const data = {"request_token": requestToken};
                
    + Sample Result:

    ```json

    {

    }
    ```


+ API Endpoint which creates a TMDB List: 

    +  `https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"name": listName, "description": listDescription, "language": "en"};
                
    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which adds a movie to an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"media_id": movieId};
                
    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which removes a movie id from an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"media_id": movieId};
                
    + Sample Result:

    ```json

    {

    }
    ```

+ API Endpoint which retrieves an array of movies from an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
                
    + Sample Result:

    ```json

    {

    }
    ```

## App Design.

### Component catalogue.

....... Insert a screenshot from the Storybook UI showing your component catalogue. [For the Movies app, hi-light stories relating to new/modified components - see the example screenshot below] .......

![][stories]

### UI Design. 

This section will show new or updated application pages with a caption of the new functionality or change made to the page

#### Home Page.

>The Home page now has additional options in the header, with options to SignUp, SignIn and SignOut. And also a MUST-WATCH and SEARCH page.
![][HomePageBK]

#### Movie Detail Page.

>The movies detail page now has the cast members in a horizonal scrollable grid. Each cast picture has a MOVIES button which will link to movies with that cast member in them.

![][MovieDetailPage]


#### Appeared In Page.

>This is a new page which will display the movies for a specific actor appeared in. This is based on which cast member the 'Movies' button was pressed in the movies detail page.

![][AppearedInPage]

#### Search Page.

>The search page is a new page which allows the user to make specific movie searches via the API based on 3 different dropdown lists. These are genre, release year and certification.

![][SearchPage]

#### Must Watch Page.

>This is a new page which displays the movies the user has add in the upcoming movies page to their watch list. 

![][MustWatchPage]

#### Sign Up Page.

>This is a new page which allows the user to sign up as a register user of the site which will give them access to more pages and functionality.

![][SignUpPage]

#### Sign In Page.

>This is a new page that allows a registered user to sign in to the site which will give them access to more pages and functionality.

![][SignInPage]

### Routing.

...... Insert a list of the routes supported by your app and state the associated view. If relevant, specify which of the routes require authentication, i.e. protected/private. [For the Movies Fan app, only new routes should be listed.] ......... 

+ GET   /movies/watched       (protected) - displays must watch movies.
+ GET   /appearedInmovies/:id (protected) - displays movies person appeared in
+ POST  /signup                           - allows a user to sign up to site.
+ POST  /signin                           - allows a registered user to sign in to site
+ GET   /search               (protected) - allows a user to search by specfic criteria


## Independent learning (If relevant).
The following outlines some of the independent learning which I undertook in order to implement the application.

#### Firebase Authentication and Database
I used Firebase for both authentication of users and for storage of user data.
This required a new project to be set up for the application in the Firebase console.

I referenced this blog to work my way through the implementation: 
+ https://blog.logrocket.com/user-authentication-firebase-react-apps/


+ /src/database/firebase.js

    + Methods Defined
        + generateUserDocument: Used to save the users data to Firebase Database
        + getUserDocument: Used to retrievr the users data to Firebase Database

+ /src/contexts/authContexts.js

    + Method Defined
        + authenticate() calls the following:
            + auth.signInWithEmailAndPassword: Authenicated the email and password with Firebase authentication
            + getUserDocument: retrieves user data from Firebase database for user
        
        + signup() calls the following:
            + auth.createUserWithEmailAndPassword: Create an authenication record on Firebase 
            + generateUserDocument: Store the user name and list ids on Firebase database for next login.
                

#### TMDB Lists to Support CRUD
This outlines the source code files and methods in them which I used to implement CRUD functionality using TMDB lists.

This information was referenced here: 
+ https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id
+ https://developers.themoviedb.org/3/lists/v4-or-v3-lists

The relevent source code is here:

+ /src/api/tmdb-api.js

    + Methods Defined
        + requestUserToken: Requests a token from TMDB using API key
        + authenticateWithLogin: Authenticate TMDB token using TMDB login details
        + createSessionId: Create a session id using the authenticated token
        + createNewList: Create new TMDB lists (used for favorites and must-watch lists)
        + addToList: adds movie id to the specified list, favorite or must watch
        + removeFromList: removes a movie id from a specified list
        + retrieveListArray: retrieves the array list based on the list id

+ /src/contexts/authContexts.js

    + Method Defined
        + authenticate() calls the following:
            + requestUserToken: Request a User Token from TMDB using API key
            + authenticateWithLogin: Authenticate with user and password for TMDB
            + createSessionId: Create TMDB session id which is required to add and remove from TMDB list
        
        + signup() calls the following:
            + requestUserToken: Request token with TMDB API key
            + authenticateWithLogin: Authenticates token with user and password for TMDB
            + createSessionId : Create TMDB session id with authenicated token 
            + createNewList: Create new list for both favorites and mustWatch and get ids.


#### Pagination in Material UI and React

This outlines the source files which are involved in pagination on the Home Page, the Upcoming movies page and the search page.

The information was references here:
+ https://material-ui.com/components/pagination/
    
The relevent source code is here:
+ /src/components/paginationCard/index.js


[stories]: ./images/storybook.PNG
[HomePageBK]: ./images/HomePageBK.PNG
[MovieDetailPage]: ./images/MovieDetailPage.PNG
[MustWatchPage]: ./images/MustWatchPage.PNG
[SearchPage]: ./images/SearchPage.PNG
[SignInPage]: ./images/SignInPage.PNG
[SignUpPage]: ./images/SignUpPage.PNG
[AppearedInPage]: ./images/AppearedInPage.PNG