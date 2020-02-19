import React, { useEffect, useState } from 'react';
//import GetLyrics from '../GetLyrics/index.js'
//import SimilarityQuery from '../SimilarityQuery/index.js'
import axios from "axios";
let apikey = "";
let token = "";


export default function LyricsSearcher() {

    /*
                USE STATE VARS 
    */
    //These states are updated whenever the user enters new data into the left or right form
    //The data in each updates to be the data in the form (these are updated in the leftSongForm and rightSongForm functions)
    const [leftSong, setLeftSongName] = useState("");
    const [leftArtist, setLeftArtistName] = useState("");
    const [rightSong, setRightSongName] = useState("");
    const [rightArtist, setRightArtistName] = useState("");


    //States to determine if both sides have been submitted (the state is triggered from an on click event from the form)
    //Once the user clicks search, the states update and change to true for left and right side respectively
    //Once both are true, the similarity query will be triggered
    const [leftSubmitted, setLeftSubmitting] = useState(false);
    const [rightSubmitted, setRightSubmitting] = useState(false);

    //These states update and display the lyrics to the HTML once the query data comes back through
    //Which side gets set is determined by the left_or_right_side state (true is left, false is right)
    //Both are set in a use effect
    const [rightLyrics, setRightLyrics] = useState("");
    const [leftLyrics, setLeftLyrics] = useState("");

    //This is the lyrics data that is returned from the axios query
    const [lyricsData, setLyricsData] = useState("");

    //Boolean that determines which side to display the lyrics data to (false is right side, true is left side)
    const [left_or_right_side, setLeftRight] = useState(false);

    /*          END USE STATE VARS 
____________________________________________________________________________________________________________________________________*/


    /*   FUNCTIONS CALLED ON LEFT OR RIGHT FORM SUBMISSION TO UPDATE THE PARAMETERS FOR THE LYRICS QUERY 
            - This function updates the left song and artist name, sets the submitting state var to true, and then sets the left_right to t or f
    */
    function leftSongForm(e) {
        e.preventDefault(e); //prevents the form from doing default action

        //set URL query parameters to be the form submissions
        let left_song_name = e.currentTarget.song.value.replace(/ /g, "%20");//accounts for if the user puts a space in their song name
        let left_artist_name = e.currentTarget.artist.value.replace(/ /g, "%20"); //replace all # with %20, the URL encode of that value. 
        console.log(left_song_name, left_artist_name);
        setLeftSongName(left_song_name);
        setLeftArtistName(left_artist_name);
        setLeftSubmitting(true); //update submitting value to true and trigger the getLyrics request
        setLeftRight(true); //telling the query function whether to display the new lyrics to the left side (var is true) or the right side (var is false)

    }

    function rightSongForm(e) {
        e.preventDefault(e); //prevents the form from doing default action

        //set URL query parameters to be the form submissions
        let right_song_name = e.currentTarget.song.value.replace(/ /g, "%20");//accounts for if the user puts a space in their song name
        let right_artist_name = e.currentTarget.artist.value.replace(/ /g, "%20"); //replace all # with %20, the URL encode of that value. 
        setRightSongName(right_song_name);
        setRightArtistName(right_artist_name);
        setRightSubmitting(true); //update submitting value to true and trigger the getLyrics request        
        setLeftRight(false); //telling the query function whether to display the new lyrics to the left side (var is true) or the right side (var is false)             
    }

    /*  END FORM FUNCTIONS
____________________________________________________________________________________________________________________________________*/


    /*  USE EFFECT THAT SETS THE LEFT OR RIGHT LYRICS
            - This use effect will update the HTML for either the right or left side depending on which form was submitted by using the 
            left_or_right_side state variable.
    
            - If left_or_right side is true, then the user searched from the left side. If left_or_right_side is false, then the user searched
            from the right side
    */

    useEffect(() => { //use the left_right_side state to track whether to setLeftLyrics or setRightLyrics!
        if (left_or_right_side == true) {
            setLeftLyrics(lyricsData.data ? lyricsData.data.message.body.lyrics.lyrics_body : "Error finding lyrics. Please try again!");
        } else {
            setRightLyrics(lyricsData.data ? lyricsData.data.message.body.lyrics.lyrics_body : "Error finding lyrics. Please try again!");
        }
    }, [lyricsData]);


    //have a left or right side boolean variable that will tell you which side to set the lyrics to! (Will call setLeftLyrics if true or setRightLyrics if false!)
    //Left = True | Right = False
/*____________________________________________________________________________________________________________________________________*/


    /*  
        FUNCTION TO QUERY LYRICS FROM MUSIXMATCH
    */
    function GetLyrics(querySong, queryArtist) {
        console.log("Queries: ", querySong, queryArtist);
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1//matcher.lyrics.get?q_track=${querySong}&q_artist=${queryArtist}&apikey=${apikey}`
            )
            .then(function (response) {
                console.log("response: ", response, response.data.message.body.lyrics.lyrics_body);
                setLyricsData(response)
                return response;
            })
            .catch(function (error) {
                return error;
            });
    }

    /* 
____________________________________________________________________________________________________________________________________ */

    /*FOR THESE LYRICS:
    CALL THE GET LYRICS IN HERE, MAKE IT A FUNCTION IN HERE. THEN WE HAVE A USE STATE THAT UPDATES WHEN THE GET LYRICS RESPONSE UPDATES.

    STATES TO MANAGE:
    - CALL GET LYTICS WHENEVER A NEW SONG NAME OR ARTIST IS ADDED. THIS IS HANDLED BY THE ON SUBMIT EVENT LISTENER. WE UPDATE THE QUERY DATA BELOW WITH THE USE EFFECTS
    - THE GET LYRICS RESPONSE DATA: WE NEED TO TRACK IF IT'S FOR RIGHT OR LEFT, AS WELL AS WHAT THAT DATA IS SO WE CAN DISPLAY IT. LOOK AT CREATE FORM FROM FINAL
    - HAVE A SEPARATE USE EFFECT THAT WILL UPDATE FOR LEFT LYRICS AND RIGHT LYRICS (TWO USE EFFECTS) THAT WILL UPDATE ONCE THE RESPONSE DATA UPDATES FOR LEFT OR RIGHT
    */
 /*____________________________________________________________________________________________________________________________________*/


    /*
        USE EFFECTS WHICH UPDATE THE GET LYRICS QUERY DATA WHENEVER THE USER SUBMITS THE FORM (i.e. they press search again)
    */
    //update right form data to Get Lyrics
    useEffect(() => {
        //whenever the user updates the form data (enters a new song name, update the song name)
        setRightSongName(rightSong);
        setRightArtistName(rightArtist);
        GetLyrics(rightSong, rightArtist, left_or_right_side);
    }, [rightSong, rightArtist]);

    useEffect(() => {
        //whenever the user updates the form data (enters a new song name, update the song name)
        setLeftSongName(leftSong);
        setLeftArtistName(leftArtist);
        GetLyrics(leftSong, leftArtist, left_or_right_side);
    }, [leftSong, leftArtist]);
/*_______________________________________________________________________________________________________________________*/

/*
    LYRICS SIMILARITY CODE BELOW
*/

    //useState to set the response data from the Dandelion API
    const [simAPIData, setSimAPIData] = useState({});
    const [simPercentage, setSimPercentage] = useState("");

    //Setting percentage value, only setting everytune the simAPIData changes (i.e. a new query is made)
    useEffect(() => {
        const similarities = simAPIData.data ? simAPIData.data.similarity : "";
        console.log("Similarities:", similarities);
        //Rounds similarity percentage to 2 decimal places
        setSimPercentage(+(similarities * 100).toFixed(2));
        //console.log("%cSimPercentage:","color:orange",simPercentage)
        //console.log("%cSetSimAPIData","color:lightblue",simAPIData);
    }, [simAPIData]);

    //calling query text similarity function whenever one of the lyrics is updated
    useEffect(() => {
        console.log(leftSubmitted, rightSubmitted);
        if (leftSubmitted && rightSubmitted) { //if both forms submitted, then make the query to the text similarity
            console.log("Making request...")
            queryTextSimilarity(leftLyrics, rightLyrics);
        }
    }, [leftLyrics, rightLyrics])


    //Make call to the Dandleion API using default values in case user doesn't pass in both lyrics
    function queryTextSimilarity(text1 = "", text2 = "") {
        axios
            .get(
                `https://api.dandelion.eu/datatxt/sim/v1/?text1=${text1}&text2=${text2}&token=${token}`
            )
            .then(function (response) {
                setSimAPIData(response);
                console.log("%cDandelion Response","color:lightblue",response);
                return response;
            })
            .catch(function (error) {
                console.log("error", error);
                return error;
            });

    }
//_____________________________________________________________________________________________________________________________________________

/*
    HTML
*/
    return (
        <div>
            <div>
                <header>
                    <h2>Lyrics Comparison</h2>{" "}
                    <p> Lyrics are {simPercentage} % similar </p>{" "}
                </header>

                <section>
                    <div className="songSimilarityViz"
                        style={{
                            width: `${simPercentage}%`,
                            backgroundColor: `rgba(76, 175, 80, ${simPercentage})`,
                            transition: `width 2s, background-color 2s`
                        }}
                    ></div>
                    <article></article>{" "}
                </section>
            </div>
            <div className="split left">
                <div className="centered">
                    <div>
                        <form onSubmit={e => leftSongForm(e)} name="songSearch">
                            <label htmlFor="Artist name entry">Artist</label>
                            <input type="text" className="formEntry" name="artist" placeholder="Artist Name" />
                            <label htmlFor="Song name entry">Song Name</label>
                            <input type="text" className="formEntry" name="song" placeholder="Song Name" />
                            <input type="submit" value="Search" className="button" />
                        </form>
                    </div>
                    <p>{leftSubmitted && leftLyrics ? leftLyrics : "Search for lyrics!"}</p>
                </div>
            </div>

            <div className="split right">
                <div className="centered">
                    <div>
                        <form onSubmit={e => rightSongForm(e)} name="songSearch">
                            <label htmlFor="Artist name entry">Artist</label>
                            <input type="text" className="formEntry" name="artist" placeholder="Artist Name" />
                            <label htmlFor="Song name entry">Song Name</label>
                            <input type="text" className="formEntry" name="song" placeholder="Song Name" />
                            <input type="submit" value="Search" className="button" />
                        </form>
                    </div>
                    <p>{rightSubmitted && rightLyrics ? rightLyrics : "Search for lyrics!"}</p>
                </div>
            </div>

        </div>
    );
}
