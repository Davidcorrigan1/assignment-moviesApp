# Assignment - ReactJS app.

Name: David Corrigan

## Overview.

The objective of my assignment are the following extentions to the MovieApp which will allow me to showcase the React and Material UI skills I have learned in the ICT2 module. 

+ A new SignUp and SignIn pages for the user, plus a signout option
+ A new MUST-WATCH page for movies added to a must watch list in the Upcoming Movies page
+ A new Search page which allows the user to search by Genre, Release Year and/or Certification
+ Update to the Movie Details page to now display a scrollable grid of cast members on the movie. Each cast card has a 'Movies' button which routes to a page of movies in which that cast member appears.
+ Adding a new AppearsIn Page which displays the movies a specific cast member appears in.
+ Setting All routes except the Homepage as Private, requiring authentication including favorite icon.
+ Adding Authentication using Firebase Auth functionality
+ Adding Firebase storage for user data, like TMDB favorite/must-watch List id and username
+ Using the List functionality in the TMDB API to store favorite and must-watch movies for a logged in user.
+ Pagination on the Homepage, the Upcoming Movies Page and search page
+ Using Query string in the API call for the Search page.
+ Caching of most API calls, including the variable query API call for the search page.



## Setup requirements.

Once the repo has been cloned from https://github.com/Davidcorrigan1/assignment-moviesApp.git
then these .env variables need to be added with appropriate values.

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
    adult: false,
    also_known_as: [
    "連恩·尼遜",
    "เลียม นีสัน",
    "Лиам Нисон",
    "リーアム・ニーソン",
    "리암 니슨",
    "ليام نيسون",
    "Ліам Нісон",
    "Вільям Джон Нісон",
    "连姆·尼森",
    "William John "Liam" Neeson OBE",
    "Λίαμ Νίσον"
    ],
    biography: "An Irish actor who has been nominated for an Oscar, a BAFTA and three Golden Globe Awards. He has starred in a number of notable roles including Oskar Schindler in Schindler's List, Michael Collins in Michael Collins, Peyton Westlake in Darkman, Jean Valjean in Les Misérables, Qui-Gon Jinn in Star Wars Episode I: The Phantom Menace, Alfred Kinsey in Kinsey, Ras Al Ghul in Batman Begins and the voice of Aslan in The Chronicles of Narnia film series. He has also starred in several other notable films, from major Hollywood studio releases (ie. Excalibur, The Dead Pool, Nell, Rob Roy, The Haunting, Love Actually, Kingdom of Heaven, Taken, Clash of the Titans, The A-Team, Unknown) to smaller arthouse films (ie. Deception, Breakfast on Pluto, Chloe). He was born in Ballymena, County Antrim, Northern Ireland and educated at Saint Patrick's College, Ballymena Technical College and Queen's University Belfast. He moved to Dublin after university to further his acting career, joining the renowned Abbey Theatre. In the early 1990s, he moved again to the United States, where the wide acclaim for his performance in Schindler's List led to more high-profile work. He is widowed and lives in New York with his two sons. Description above from the Wikipedia article Liam Neeson, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
    birthday: "1952-06-07",
    deathday: null,
    gender: 2,
    homepage: null,
    id: 3896,
    imdb_id: "nm0000553",
    known_for_department: "Acting",
    name: "Liam Neeson",
    place_of_birth: "Ballymena, County Antrim, Northern Ireland, UK",
    popularity: 13.326,
    profile_path: "/bboldwqSC6tdw2iL6631c98l2Mn.jpg"
}
    ```


+ API Endpoint which returns the cast of a particular movie based on movie id: 

    + `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`


    + Sample Result:

    ```json

    {

        id: 634528,
        cast: [
        {
        adult: false,
        gender: 2,
        id: 3896,
        known_for_department: "Acting",
        name: "Liam Neeson",
        original_name: "Liam Neeson",
        popularity: 13.326,
        profile_path: "/bboldwqSC6tdw2iL6631c98l2Mn.jpg",
        cast_id: 1,
        character: "Jim",
        credit_id: "5d8dc009109cd000293fc8c8",
        order: 0
        },
        {
        adult: false,
        gender: 1,
        id: 26723,
        known_for_department: "Acting",
        name: "Katheryn Winnick",
        original_name: "Katheryn Winnick",
        popularity: 18.509,
        profile_path: "/vQSqH3ybDWZHZIqX4NZKhOCXAhQ.jpg",
        cast_id: 2,
        character: "Sarah",
        credit_id: "5d8dc01f172d7f000d5318e6",
        order: 1
        }]
    }
    ```

+ API Endpoint which returns the movies a person is involved in based on person id: 

    + `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_people=${id}`


    + Sample Result:

    ```json

    {
        page: 1,
        results: [
        {
        adult: false,
        backdrop_path: "/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg",
        genre_ids: [
        28,
        53,
        80
        ],
        id: 634528,
        original_language: "en",
        original_title: "The Marksman",
        overview: "Jim Hanson’s quiet life is suddenly disturbed by two people crossing the US/Mexico border – a woman and her young son – desperate to flee a Mexican cartel. After a shootout leaves the mother dead, Jim becomes the boy’s reluctant defender. He embraces his role as Miguel’s protector and will stop at nothing to get him to safety, as they go on the run from the relentless assassins. Stars...Liam Neeson",
        popularity: 479.435,
        poster_path: "/6vcDalR50RWa309vBH1NLmG2rjQ.jpg",
        release_date: "2021-01-15",
        title: "The Marksman",
        video: false,
        vote_average: 7.2,
        vote_count: 753
        },
        {
        adult: false,
        backdrop_path: "/2M2JxEv3HSpjnZWjY9NOdGgfUd.jpg",
        genre_ids: [
        53,
        28,
        80,
        18
        ],
        id: 553604,
        original_language: "en",
        original_title: "Honest Thief",
        overview: "A bank robber tries to turn himself in because he's falling in love and wants to live an honest life...but when he realizes the Feds are more corrupt than him, he must fight back to clear his name.",
        popularity: 226.339,
        poster_path: "/zeD4PabP6099gpE0STWJrJrCBCs.jpg",
        release_date: "2020-09-03",
        title: "Honest Thief",
        video: false,
        vote_average: 6.5,
        vote_count: 1000
        },
        {
        adult: false,
        backdrop_path: "/jn52me8AagfNt7r84SgQbV0R9ZG.jpg",
        genre_ids: [
        28,
        12,
        878
        ],
        id: 181812,
        original_language: "en",
        original_title: "Star Wars: The Rise of Skywalker",
        overview: "The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.",
        popularity: 128.998,
        poster_path: "/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
        release_date: "2019-12-18",
        title: "Star Wars: The Rise of Skywalker",
        video: false,
        vote_average: 6.5,
        vote_count: 6957
        }]
    }
    ```

+ API Endpoint which returns the possible certification per country: 

    + `https://api.themoviedb.org/3/certification/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`


    + Sample Result:

    ```json

    {
        certifications: {
        FR: [
        {
        certification: "16",
        meaning: "(Interdit aux moins de 16 ans) unsuitable for children younger than 16 or forbidden in cinemas for under 16.",
        order: 4
        },
        {
        certification: "10",
        meaning: "(Déconseillé aux moins de 10 ans) unsuitable for children younger than 10 (this rating is only used for TV); equivalent in theatres : "avertissement" (warning), some scenes may be disturbing to young children and sensitive people; equivalent on video : "accord parental" (parental guidance).",
        order: 2
        },
        {
        certification: "18",
        meaning: "(Interdit aux mineurs) unsuitable for children younger than 18 or forbidden in cinemas for under 18.",
        order: 5
        },
        {
        certification: "12",
        meaning: "(Interdit aux moins de 12 ans) unsuitable for children younger than 12 or forbidden in cinemas for under 12.",
        order: 3
        },
        {
        certification: "U",
        meaning: "(Tous publics) valid for all audiences.",
        order: 1
        }
        ],
        GB: [
        {
        certification: "15",
        meaning: "Only those over 15 years are admitted. Nobody younger than 15 can rent or buy a 15-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category can contain adult themes, hard drugs, frequent strong language and limited use of very strong language, strong violence and strong sex references, and nudity without graphic detail. Sexual activity may be portrayed but without any strong detail. Sexual violence may be shown if discreet and justified by context.",
        order: 5
        },
        {
        certification: "R18",
        meaning: "Can only be shown at licensed adult cinemas or sold at licensed sex shops, and only to adults, those aged 18 or over. Films under this category are always hard-core pornography, defined as material intended for sexual stimulation and containing clear images of real sexual activity, strong fetish material, explicit animated images, or sight of certain acts such as triple simultaneous penetration and snowballing. There remains a range of material that is often cut from the R18 rating: strong images of injury in BDSM or spanking works, urolagnia, scenes suggesting incest even if staged, references to underage sex or childhood sexual development and aggressive behaviour such as hair-pulling or spitting on a performer are not permitted. More cuts are demanded in this category than any other category.",
        order: 7
        },
        {
        certification: "PG",
        meaning: "All ages admitted, but certain scenes may be unsuitable for young children. May contain mild language and sex/drugs references. May contain moderate violence if justified by context (e.g. fantasy).",
        order: 2
        },
        {
        certification: "12A",
        meaning: "Films under this category are considered to be unsuitable for very young people. Those aged under 12 years are only admitted if accompanied by an adult, aged at least 18 years, at all times during the motion picture. However, it is generally not recommended that children under 12 years should watch the film. Films under this category can contain mature themes, discrimination, soft drugs, moderate swear words, infrequent strong language and moderate violence, sex references and nudity. Sexual activity may be briefly and discreetly portrayed. Sexual violence may be implied or briefly indicated.",
        order: 3
        },
        {
        certification: "U",
        meaning: "All ages admitted, there is nothing unsuitable for children.",
        order: 1
        },
        {
        certification: "18",
        meaning: "Only adults are admitted. Nobody younger than 18 can rent or buy an 18-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category do not have limitation on the bad language that is used. Hard drugs are generally allowed, and explicit sex references along with detailed sexual activity are also allowed. Scenes of strong real sex may be permitted if justified by the context. Very strong, gory, and/or sadistic violence is usually permitted. Strong sexual violence is permitted unless it is eroticised or excessively graphic.",
        order: 6
        },
        {
        certification: "12",
        meaning: "Home media only since 2002. 12A-rated films are usually given a 12 certificate for the VHS/DVD version unless extra material has been added that requires a higher rating. Nobody younger than 12 can rent or buy a 12-rated VHS, DVD, Blu-ray Disc, UMD or game. The content guidelines are identical to those used for the 12A certificate.",
        order: 4
        }
        ]}
        }
    }
    ```

+ API Endpoint which returns a request token from TMDB: 

    + `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`


    + Sample Result:

    ```json

    {
        success: true,
        expires_at: "2021-08-14 11:17:26 UTC",
        request_token: "c764137c2cc954a7fc039b25171e0c4b7c513109"
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

  

+ API Endpoint which creates a session id from TMDB: 

    +  `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`

    + The following data is required in the request body
        + const data = {"request_token": requestToken};
                



+ API Endpoint which creates a TMDB List: 

    +  `https://api.themoviedb.org/3/list?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"name": listName, "description": listDescription, "language": "en"};
                


+ API Endpoint which adds a movie to an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"media_id": movieId};
                



+ API Endpoint which removes a movie id from an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`

    + The following data is required in the request body
        + const data = {"media_id": movieId};
                



+ API Endpoint which retrieves an array of movies from an existing TMDB List: 

    +  `https://api.themoviedb.org/3/list/${listId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
                
    + Sample Result:

        ```json
        {
            created_by: "davidcorrigan1@gmail.com",
            description: "Favorites Description",
            favorite_count: 0,
            id: "7103810",
            items: [
            {
            adult: false,
            backdrop_path: "/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg",
            genre_ids: [
            28,
            12,
            53,
            878
            ],
            id: 497698,
            media_type: "movie",
            original_language: "en",
            original_title: "Black Widow",
            overview: "Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.",
            popularity: 2981.934,
            poster_path: "/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
            release_date: "2021-07-07",
            title: "Black Widow",
            video: false,
            vote_average: 7.8,
            vote_count: 4101
            },
            {
            adult: false,
            backdrop_path: "/xXHZeb1yhJvnSHPzZDqee0zfMb6.jpg",
            genre_ids: [
            28,
            80,
            53
            ],
            id: 385128,
            media_type: "movie",
            original_language: "en",
            original_title: "F9",
            overview: "Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they've ever encountered: his forsaken brother.",
            popularity: 2664.95,
            poster_path: "/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg",
            release_date: "2021-05-19",
            title: "F9",
            video: false,
            vote_average: 7.7,
            vote_count: 2582
            },
            {
            adult: false,
            backdrop_path: "/wPjtacig0kIkVcTQmXoNt6jbMwo.jpg",
            genre_ids: [
            28,
            35
            ],
            id: 617502,
            media_type: "movie",
            original_language: "en",
            original_title: "Jolt",
            overview: "Lindy is an acid-tongued woman with rage issues who controls her temper by shocking herself with an electrode vest. One day she makes a connection with Justin, who gives her a glimmer of hope for a shock-free future, but when he’s murdered she launches herself on a revenge-fueled rampage in pursuit of his killer.",
            popularity: 1648.405,
            poster_path: "/gYZAHan5CHPFXORpQMvOjCTug4E.jpg",
            release_date: "2021-07-15",
            title: "Jolt",
            video: false,
            vote_average: 6.8,
            vote_count: 462
            },
            {
            adult: false,
            backdrop_path: "/bwBmo4I3fqMsVvVtamyVJHXGnLF.jpg",
            genre_ids: [
            12,
            14,
            35,
            28
            ],
            id: 451048,
            media_type: "movie",
            original_language: "en",
            original_title: "Jungle Cruise",
            overview: "Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his dilapidated boat. Together, they search for an ancient tree that holds the power to heal – a discovery that will change the future of medicine.",
            popularity: 2828.098,
            poster_path: "/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg",
            release_date: "2021-07-28",
            title: "Jungle Cruise",
            video: false,
            vote_average: 8,
            vote_count: 1535
            },
            {
            adult: false,
            backdrop_path: "/wjQXZTlFM3PVEUmKf1sUajjygqT.jpg",
            genre_ids: [
            878,
            28,
            53
            ],
            id: 581726,
            media_type: "movie",
            original_language: "en",
            original_title: "Infinite",
            overview: "Evan McCauley has skills he never learned and memories of places he has never visited. Self-medicated and on the brink of a mental breakdown, a secret group that call themselves “Infinites” come to his rescue, revealing that his memories are real.",
            popularity: 2995.333,
            poster_path: "/niw2AKHz6XmwiRMLWaoyAOAti0G.jpg",
            release_date: "2021-06-10",
            title: "Infinite",
            video: false,
            vote_average: 7.3,
            vote_count: 636
            }
            ],
            item_count: 5,
            iso_639_1: "en",
            name: "favorite",
            poster_path: null
        }

        ```
    


## App Design.

### Component catalogue.

> This outlines the new Storybook stories which have been added for the new or changed components.

![][StoriesList]

### UI Design. 

This section will show new or updated application pages with a caption of the new functionality or change made to the page

#### Home Page.

>The Home page now has additional options in the header, with options to SignUp, SignIn and SignOut. And also a MUST-WATCH and SEARCH page.

![][HomePageBK]

#### Movie Detail Page.

>The movies detail page now has the cast members in a horizonal scrollable grid. Each cast picture has a MOVIES button which will link to movies with that cast member in them.

![][MovieDetailPage]


#### Appeared In Page.

>This is a new page which will display the movies which a specific actor appeared in. This is based on which cast member the 'Movies' button was pressed for on the movies detail page.

![][AppearedInPage]

#### Search Page.

>The search page is a new page which allows the user to make specific movie searches via the API based on 3 different dropdown lists. These are genre, release year and/or certification.

![][SearchPage]

#### Must Watch Page.

>This is a new page which displays the movies the user has added in the upcoming movies page to their watch list. 

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

    + How method above are called:
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


[StoriesList]: ./images/storybook.PNG
[HomePageBK]: ./images/HomePageBK.PNG
[MovieDetailPage]: ./images/MovieDetailPage.PNG
[MustWatchPage]: ./images/MustWatchPage.PNG
[SearchPage]: ./images/SearchPage.PNG
[SignInPage]: ./images/SignInPage.PNG
[SignUpPage]: ./images/SignUpPage.PNG
[AppearedInPage]: ./images/AppearedInPage.PNG