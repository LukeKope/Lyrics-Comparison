# API Code

As mentioned before, this project uses two API's. 
The API's work in conjunction with each other.
The lyrics similarity API only queries once there are valid lyrics on both the right and  left side of the page.


## Code Breakdown

*There are two main parts to the code*
1. The portion to retrieve and display the lyrics - [The Musixmatch Lyrics API](https://developer.musixmatch.com/documentation)

2. The portion to compare the similarity of the lyrics - [Dandelion Text Similarity API](https://dandelion.eu/docs/api/datatxt/sim/v1/)


### Lyrics Retrieval and Text SImilarity

The useEffects serve to ensure that the lyrics have been queried and set
boolean variables that tell the queryTextSimilarity function when to make the request to the Dandelion API.

The lyrics are then displayed to the HTML, updating on each new search from the user.