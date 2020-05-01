async function loadSongs(artist) {
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "575de39080mshf1f9cab8127c63fp1bcad8jsn113d9f3f814b"
        }
    })

    let songs = await response.json();
    return songs.data;
}

let artists = [ "eminem", "metallica", "madonna", "muse"]

async function loadArtists() {

    let songsContainer = document.querySelector("#songs")
    songsContainer.innerHTML = ""

    artists.forEach(async artist => {
        let songs = await loadSongs(artist)
        let artistContainer = document.createElement("div")
        artistContainer.className="artist-container"
        artistContainer.innerHTML = `<h3 class="container-title">Songs for ${artist}</h3>`
        let songList = document.createElement("div")
        songList.className ="artist-list";
        songList.innerHTML = songs.map(song => 
            ` <div class="song-card">
            <img src="${song.album.cover_big}" alt="David Bowie" class="song-card-image">
            <div class="song-card-info">
              <div class="song-card-artist">${song.artist.name}</div>
              <div class="song-card-album">${song.album.title}</div>
              <div class="song-card-title">${song.title}</div>
            </div>
            <div class="song-card-play"></div>
          </div>`).join("")
          artistContainer.appendChild(songList)
          songsContainer.appendChild(artistContainer)
    })

}