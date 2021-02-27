const form = document.querySelector('.form')
const resultList = document.querySelector('.results-list')
// global variables

form.addEventListener('submit', (event) => {
    event.preventDefault() 
    // it prevents the form from submitting before it runs through the functions. it prevents a reload from happening.
    
    const searchMusic = document.querySelector('.search').value
    console.log('search music', searchMusic)
    // form submit, this is listening for the search button to be clicked. select value that's being inputted into the search box

    function search() {
        // fetch('broken url')
        fetch ('https://itunes.apple.com/search?term=' + searchMusic)
        .then(respond => respond.json())
        .then(data => {
            if (data.results.length > 0){
                console.log(data)
                for (let song of data.results) {
                    renderSearchResults(song)
                } 
            } 
            else {
            console.log('no result error')
               const noResult = document.createElement('div')
               noResult.innerText = "Whoops, we can't find anything with this name."
               resultList.appendChild(noResult)
               
            }
            
            
        
    })
    .catch(error => {
        console.log('error is', error)
        catchError() })

    }
    clearInput()
    search()
    
})
// if the data set returned is greater than 0, it will move forward with the renderSearchResults below, otherwise, it will return the error of noResult which gives a message. If it's a broken url error, it will return the catchError function message which is defined at the bottom.

// this function fetches the API, converts it to JSON, sets a song of the data results that are returned, and then sends it through the renderSearchResults function below.

// the clearInput function removes previous search results when a new search is triggered


function clearInput(){
    let songs = document.querySelectorAll(".music-result")
    console.log({songs})
    for (let song of songs){
        song.remove()
    }
}
// clear inputs is above search to clear out the old results rather than appending it to the div. it goes through every result and removes it in the results div and goes to the next function


// this function takes what's found by the API, and renders it onto the page. I've set up a big div to populate with the artist information, associated a play button with each result, and then appended that "music card" to the results-list UL in the HTML. 
// I wanted each play button to shoot the url to the big player at the top, which probably wouldn't be best if it were actually being used, but this was the way I structured it for starters. 
// I stored the previewUrl in a playAudio div, and then 

function renderSearchResults(song){
    const resultDiv = document.createElement('div')
    resultDiv.className = 'music-result'

    let playAudio = document.createElement('div')
    playAudio.className = 'play-button'
    playAudio.dataset.previewUrl = song.previewUrl

// save attribute in the data set 

    let collectionImg = document.createElement('img')
    collectionImg.className = 'album-art'
    collectionImg.src = song.artworkUrl100


    let artistName = document.createElement('p')
    artistName.className = 'artist-name'
    artistName.innerHTML = song.artistName

    let trackName = document.createElement('p')
    trackName.className = 'track-name'
    trackName.innerHTML = song.trackName
    
    let collectionName = document.createElement('p')
    collectionName.className = 'album-title'
    collectionName.innerHTML = song.collectionName

    


    // innerHTML, create divs, pull data from json and populate music card
    let playButton = document.createElement('button')
    playButton.innerText = 'Play'
    console.log('play button', playButton)

    
    
    
    resultDiv.appendChild(collectionImg)
    resultDiv.appendChild(artistName)
    resultDiv.appendChild(trackName)
    resultDiv.appendChild(collectionName)
    // this appendChild block is the way to put each item defined above into the main music card div I've set up.
    playAudio.appendChild(playButton)
    // this links the actual play button to the play Audio 
    
    resultDiv.appendChild(playAudio)
    // this adds the play audio with the preview url to the main result div, which will allow the play button to associate the preview url

    resultList.appendChild(resultDiv)
    // this sends each "music card" in the list rendered from the data to the main div that contains all results

    
    playButton.addEventListener('click', (event) => {
        playSong(event.target)
        console.log(event.target)
        
    })
    // this is calling the play button and setting an event listener to it
}


function playSong(button){
    let audio = document.querySelector('audio')
    console.log(audio)
    audio.src = button.parentElement.dataset.previewUrl
    playSong.volume = .5
}
// in this function, I set play song with an argument of button which was created above to pull the preview url out of the

function catchError() {
    const errorEl = document.createElement('div')
    errorEl.innerText = 'Whoops! Try your search again...'
    resultList.appendChild(errorEl)

}


