# Assignment - ReactJS app.

Name: David Corrigan

## Overview.

The objective of my assignment are the following extentions to the MovieApp

+ A new SignUp and SignIn pages for the user, plus a signout option
+ A new MUST-WATCH page for movies added to a must watch list in the Upcoming Movies page
+ A new Search page which allows the user to search by Genre, Release Year and/or Certification
+ Setting All routes except the Homepage as Private, requiring authentication including favorite icon.
+ Adding Authentication using Firebase Auth functionality
+ Adding Firebase storage for user data, like TMDB favorite/must-watch List id and username
+ Using the List functionality in the TMDB api to store favorite and must-watch movies for a logged in user.
+ Pagination on the Homepage, the Upcoming Movies Page and search page
+ Caching of most API calls, including the variable query api call.



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

    + https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}${searchQuery}&language=en-US&include_adult=false&include_video=false&page=${page}`


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




## App Design.

### Component catalogue.

....... Insert a screenshot from the Storybook UI showing your component catalogue. [For the Movies app, hi-light stories relating to new/modified components - see the example screenshot below] .......

![][stories]

### UI Design.

This section will show new or updated application pages with a caption of the new functionality or change made to the page

#### Home Page.
The Home page now has additional options in the header, with options to SignUp, SignIn and SignOut. And also a MUST-WATCH and SEARCH page.

![][TheHomePage]


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

....... Briefly state any technologies/techniques used in your project codebase that was not covered in the lectures/labs. Provide source code filename (source code excerpts are not required in most cases) references to support your assertions and include references (articles/blogs) ......... 
+ Firebase Auth


+ Firebase Database


+ TMDB Lists to Support CRUD


+ Pagination in Material UI and React##


[model]: ./images/data.jpg
[view]: ./images/view.png
[stories]: ./images/storybook.PNG
[TheHomePage]: ./images/HomePage.PNG
[MovieDetailPage]: ./images/MovieDetailPage.PNG
[MustWatchPage]: ./images/MustWatchPage.PNG
[SearchPage]: ./images/SearchPage.PNG
[SignInPage]: ./images/SignInPage.PNG
[SignUpPage]: ./images/SignUpPage.PNG
[AppearedInPage]: ./images/AppearedInPage.PNG



