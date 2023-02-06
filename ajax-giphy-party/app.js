const submitButton = document.querySelector('#submit');
const resetButton = document.querySelector('#reset');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let query = document.querySelector('#searchText');
    if(query.value === "") {
        alert('Please enter a search term');
    } else {
    getGiphy(query.value);
    }
});
resetButton.addEventListener('click', removeGifs);

async function getGiphy(searchTerm) {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search`, 
    {params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
    });
    let random = Math.floor(Math.random() * response.data.data.length)
    const selectGifArray = response.data.data[random].images.downsized.url;
    appendGiphy(selectGifArray);

}

function appendGiphy(selectGifArray) {
    const gifArray = document.querySelector('#gifs');
    newImg = document.createElement('img');
    newImg.src = selectGifArray;
    gifArray.append(newImg);
}

function removeGifs() {
    const gifs = document.querySelector('#gifs');
    while(gifs.firstChild) {
        gifs.removeChild(gifs.firstChild);
    }
}