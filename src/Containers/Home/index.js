import React from 'react';
import APIs from "../../Components/APIs/index.js";


export default function Home(props) {

  
  return (
    //html

    <div>
     
      <APIs/>

    </div>
  );

}

//Can send a setState function to the child component then run that in your child component then send that up
//Can send a function as a prop going down
//Most often used for onclick handlers

//Unused Code for potential Asynchronous calls

/*
  async function getLyrics(url, setStateFunc, lyricsNum) {
    axios.get( `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${querySong}&q_artist=Daniel%20Caesar&apikey=${token}`)
    .then(function() {
      if (lyricsNum !== 0) {
        getLyrics(url, lyricsNum);
      }else{
        setStateFunc(response);
      }
    });
  }

  const [lyricsOne, setLyricsOne] = useState({});
  const [lyricsTwo, setLyricsTwo] = useState({});

  const [lyricQueryVal, setLyricQueryVal] = useState('');

  useEffect(async () => {
    let queryParam = lyricQueryVal !== '' ? lyricQueryVal : ``;

    let urlOne = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${querySong1}&q_artist=Daniel%20Caesar&apikey=${token}`;
    let urlTwo = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${querySong2}&q_artist=Daniel%20Caesar&apikey=${token}`;;

    await getLyrics(urlOne, setLyricsOne);
    await getLyrics(urlTwo, setLyricsTwo);

  }, [])

  useEffect(() => {
    await getLyrics(urlOne, setLyricsOne);
    await getLyrics(urlTwo, setLyricsTwo);
  }, [lyricQueryVal]);
  */



  /*USING THE URL SEARCH PARAMS TO GET SONG QUERIES (OLD WAY)

  useEffect(() => {
    //props.location.search is one item inside of the props location
    const urlParams = new URLSearchParams(props.location.search);
    const songParam = urlParams.get("q_track1")
      ? urlParams.get("q_track1")
      : "Japanese%20Denim";
    setTrack1(songParam);
    queryLyricsAPI1(songParam);
  }, [track1]);

  useEffect(() => {
    //props.location.search is one item inside of the props location
    const urlParams2 = new URLSearchParams(props.location.search);
    const songParam2 = urlParams2.get("q_track2")
      ? urlParams2.get("q_track2")
      : "Freudian";
    setTrack2(songParam2);
    queryLyricsAPI2(songParam2);
  }, [track2]);


  //OLD HTML FOR DANIEL CAESAR SONG SELECTION


  
      <div className="split left">
        <div className="centered">
          <div>
            <div className="songChoices">
              <a
                className={`songChoices_Item ${track1 === "Japanese%20Denim" ? "songChoices_Item--active": ""}`}href="/?q_track1=Japanese%20Denim"
              >
                {" "}
                Japanese Denim, Daniel Caesar |{" "}
              </a>{" "}
              <a
                className={`songChoices_Item ${
                  track1 == "Blessed" ? "songChoices_Item--active" : ""
                }`}
                href="/?q_track1=Blessed"
              >
                {" "}
                Blessed, Daniel Caesar |{" "}
              </a>{" "}
              <a
                className={`songChoices_Item ${
                  track1 == "ENTROPY" ? "songChoices_Item--active" : ""
                }`}
                href="/?q_track1=ENTROPY"
              >
                {" "}
                ENTROPY, Daniel Caesar{" "}
              </a>{" "}
            </div>
            <h1 className="left"> Daniel Caesar </h1>{" "}
            <h2 className="right"> {track1.replace(/%20/g, " ")} </h2>{" "}
            <span className="LyricsFormat left">
              {" "}
              {lyricsString1.replace(/%20/g, " ")}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>

      <div className="split right">
        <div className="centered">
          <div>
            <div className="songChoices">
              <a
                className={`songChoices_Item ${
                  track2 === "Take Me Away" ? "songChoices_Item--active" : ""
                }`}
                href="/?q_track2=Take%20Me%20Away"
              >
                {" "}
                Take Me Away, Daniel Caesar |{" "}
              </a>{" "}
              <a
                className={`songChoices_Item ${
                  track2 === "Hold Me Down" ? "songChoices_Item--active" : ""
                }`}
                href="/?q_track2=Hold%20Me%20Down"
              >
                {" "}
                Hold Me Down, Daniel Caesar |{" "}
              </a>{" "}
              <a
                className={`songChoices_Item ${
                  track2 === "Freudian" ? "songChoices_Item--active" : ""
                }`}
                href="/?q_track2=Freudian"
              >
                {" "}
                Freudian, Daniel Caesar{" "}
              </a>{" "}
            </div>
            <h1 className="right"> Daniel Caesar </h1>{" "}
            <h2 className="left"> {track2.replace(/%20/g, " ")} </h2>{" "}
            <span className="LyricsFormat right">
              {" "}
              {lyricsString2.replace(/%20/g, " ")}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>

      */