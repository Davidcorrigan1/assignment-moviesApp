# Assignment - ReactJS app.

Name: David Corrigan

## Overview.

The objective of my assignment are the following extentions to the MovieApp

+ Adding Authentication using Firebase Auth
+ Adding Firebase storage for user data, like TMDB List number and username
+ Using the List functionality in the TMDB api to store favorites for a logged in user.
+ Pagination on the Homepage and the Upcoming Movies Page



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

+ A login to TMDB is required
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
        },]
    }
    ```




## App Design.

### Component catalogue.

....... Insert a screenshot from the Storybook UI showing your component catalogue. [For the Movies app, hi-light stories relating to new/modified components - see the example screenshot below] .......

![][stories]

### UI Design.

...... Insert screenshots of the app's views, with appropriate captions (see example below). (For the Movies Fan App, only show the new/modified views) ........

![][view]
>Shows detailed information on a movie. Clicking the 'Reviews' floating action button will display extracts from critic reviews.

### Routing.

...... Insert a list of the routes supported by your app and state the associated view. If relevant, specify which of the routes require authentication, i.e. protected/private. [For the Movies Fan app, only new routes should be listed.] ......... 

+ GET /blogs - displays all published blogs.
+ POST /blogs (protected) - add a new blog.
+ GET /blogs/:id - displays a particular blog.
+ GET /blogs/:id/comments (protected) - detail view of a particular blog and its comments.
+ etc.
+ etc.

## Independent learning (If relevant).

....... Briefly state any technologies/techniques used in your project codebase that was not covered in the lectures/labs. Provide source code filename (source code excerpts are not required in most cases) references to support your assertions and include references (articles/blogs) ......... 


[model]: ./data.jpg
[view]: ./view.png
[stories]: ./storybook.png