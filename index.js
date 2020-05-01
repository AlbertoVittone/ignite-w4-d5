async function loadSongs(artist) {
    //get the songs for the given artist
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "575de39080mshf1f9cab8127c63fp1bcad8jsn113d9f3f814b"
        }
    })

    //transforms them into a javascript object
    let songs = await response.json();
    //returns just the songs inside of the data array
    return songs.data;
}

async function loadArtist(artistId) {
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/" + artistId, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "575de39080mshf1f9cab8127c63fp1bcad8jsn113d9f3f814b"
    } })
    
    let artistInfo = await response.json();
    console.log(artistInfo)

    document.querySelector("#artist").style.background = `url(${artistInfo.picture_xl})`
    document.querySelector("#artist-name").innerText= artistInfo.name

    let songs = await loadSongs(artistInfo.name)
    let songsContainer = document.querySelector("#songs")

    //we create a container that will contain the song cards
    let artistContainer = document.createElement("div")
    artistContainer.className = "artist-container"
    //we add a title with "songs for " artist name
    artistContainer.innerHTML = `<h3 class="container-title">
        <a href="details.html?id=${songs[0].artist.id}">Songs for ${artistInfo.name} </a>
    </h3>`
    //we create a div that will contain all our song cards
    let songList = document.createElement("div")
    songList.className = "artist-list";
    //transform the array of songs into HTML 
    songs.forEach(song => {
        let songCard = document.createElement("div")
        songCard.className ="song-card"
        songCard.innerHTML =  `<img src="${song.album.cover_big}" alt="David Bowie" class="song-card-image">
        <div class="song-card-info">
            <div class="song-card-artist">${song.artist.name}</div>
            <div class="song-card-album">${song.album.title}</div>
            <div class="song-card-title">${song.title}</div>
        </div>
        <div class="song-card-play"></div>
        `
        //when the user clicks on a song
        songCard.addEventListener("click", (e) => {
            //take a reference to the player panel
            let player = document.querySelector("#player")
            //change the player interface
            player.innerHTML = `
            <div class="player-container">
                <img class="player-image" src="${song.album.cover}" />
                <p>${song.title} <p/>
            </div>
            `

            //take a reference to the audio tag
            let audioPlayer = document.querySelector("#audio-player")
            //set the src with the given song preview
            audioPlayer.src = song.preview
            //play that song
            //audioPlayer.play()
        })
        songList.appendChild(songCard)
    })
    //add it to the main div
    artistContainer.appendChild(songList)
    songsContainer.appendChild(artistContainer)
}

//starting artists
let artists = ["eminem", "metallica", "madonna", "muse"]

async function loadArtists() {

    //getting a reference to songs div and remove everything from inside
    let songsContainer = document.querySelector("#songs")

    //for each artist in our array
    artists.forEach(async artist => {
        //we fetch 25 songs
        let songs = await loadSongs(artist)
        //we create a container that will contain the song cards
        let artistContainer = document.createElement("div")
        artistContainer.className = "artist-container"
        //we add a title with "songs for " artist name
        artistContainer.innerHTML = `<h3 class="container-title">
            <a href="details.html?id=${songs[0].artist.id}">Songs for ${artist} </a>
        </h3>`
        //we create a div that will contain all our song cards
        let songList = document.createElement("div")
        songList.className = "artist-list";
        //transform the array of songs into HTML 
        songs.forEach(song => {
            let songCard = document.createElement("div")
            songCard.className ="song-card"
            songCard.innerHTML =  `<img src="${song.album.cover_big}" alt="David Bowie" class="song-card-image">
            <div class="song-card-info">
              <div class="song-card-artist">${song.artist.name}</div>
              <div class="song-card-album">${song.album.title}</div>
              <div class="song-card-title">${song.title}</div>
            </div>
            <div class="song-card-play"></div>
          `
          //when the user clicks on a song
          songCard.addEventListener("click", (e) => {
              //take a reference to the player panel
              let player = document.querySelector("#player")
              //change the player interface
              player.innerHTML = `
                <div class="player-container">
                    <img class="player-image" src="${song.album.cover}" />
                    <p>${song.title} <p/>
                </div>
              `

              //take a reference to the audio tag
              let audioPlayer = document.querySelector("#audio-player")
              //set the src with the given song preview
              audioPlayer.src = song.preview
              //play that song
              //audioPlayer.play()
          })
          songList.appendChild(songCard)
        })
        //add it to the main div
        artistContainer.appendChild(songList)
        songsContainer.appendChild(artistContainer)
    })
}

let menuEntries = ["Top hits", "This winter", "Last summer", "Tropical Vibes", "Top 20 UK", "Best of Metal", "Hip Hop Daily", "Night out"]

function loadMenu() {
    let menu = document.querySelector("#menu")
    menu.innerHTML += menuEntries.map(menuEntry => 
        `<li>${menuEntry} </li>`
    ).join("")
}