# YouTube_Guitar_Trainer - Chops Shop
A YouTube API web App for finding guitar lesson videos. Try it here: https://futurethang.github.io/YouTube_Guitar_Trainer/

# Objectives
This app is meant to make it easy to jump online for a daily lesson, with minimal user parameter selection and focus on getting in and start playing quickly. 

The user can select a skill level, a format (exercise, lick, or song), a genre, and add optional keywords to their search.

A submit button then returns a random video pick that meets the search terms without clearing the input fields.

Below the video are options to save the link, share, or load another video from the same search parameters.

# Robust Features
In addition to basic functionality, the app can ultimately include
* A user login to save their favorite videos, or integrate with their Google Login
This can be a bootstrap modal window
* Ability to edit custom drop-downs for favorite genres or niche interest
* Some kind of Spotify integration with saved playlists generating how-to videos
* Links to useful guitar resources like Metronome, Tuner, tab search, etc.
* selecting different genres changes the background and page styles
* rating system so that bad videos don't come up again

https://developers.google.com/youtube/

https://www.youtube.com/watch?v=ogG_nZggraw

https://developers.google.com/youtube/v3/docs/search/list


Note to self: steal and borrow as much as possible!
Don't waste time making forms, writing raw CSS when Bootstrap will do, etc.


#### SEEK HELP:
*Front-end tools to help with layout and drop-down animations
! maybe an expanding bootstrap box that blends in and says "new search" and put a form in it instead of a list. This can work for the Tools and Saved lists below as well
https://getbootstrap.com/docs/4.0/components/collapse/

*Why does the embed window auto-load the previous video?


### User Login Steps:
* build a non-db list function to save video links on click
* firebase DB to save video
* button display updates to main view
* set a max length for the title string in the table, end with "..."
* 