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

+ A login to Firebase is required
+ A login to TMDB is required
+

## API Data Model.

......[For the Movies Fan app] Specify the additional TMDB endpoints used and show sample responses, in JSON .........

API TMDB Endpoints Used with sample results:

+ tehehehhe
    + jbajsbfjasf


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