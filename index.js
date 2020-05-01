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

//starting artists
let artists = ["eminem", "metallica", "madonna", "muse"]

async function loadArtists() {

    //getting a reference to songs div and remove everything from inside
    let songsContainer = document.querySelector("#songs")
    songsContainer.innerHTML = ""

    //for each artist in our array
    artists.forEach(async artist => {
        //we fetch 25 songs
        let songs = await loadSongs(artist)
        //we create a container that will contain the song cards
        let artistContainer = document.createElement("div")
        artistContainer.className = "artist-container"
        //we add a title with "songs for " artist name
        artistContainer.innerHTML = `<h3 class="container-title">Songs for ${artist}</h3>`
        //we create a div that will contain all our song cards
        let songList = document.createElement("div")
        songList.className = "artist-list";
        //transform the array of songs into HTML 
        songList.innerHTML = songs.map(song =>
          `<div class="song-card">
            <img src="${song.album.cover_big}" alt="David Bowie" class="song-card-image">
            <div class="song-card-info">
              <div class="song-card-artist">${song.artist.name}</div>
              <div class="song-card-album">${song.album.title}</div>
              <div class="song-card-title">${song.title}</div>
            </div>
            <div class="song-card-play"></div>
          </div>`).join("")
        //add it to the main div
        artistContainer.appendChild(songList)
        songsContainer.appendChild(artistContainer)
    })
}