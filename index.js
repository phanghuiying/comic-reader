const fetchComicResponse = async (img) => {
    const res = await (await fetch(`https://intro-to-js-playground.vercel.app/api/xkcd-comics/${img}`)).json();
    return res
};

// set page variables so that we know the current panel count and page number
const maxPage = 2475;
let currPageNum = 2;
let currDisplayCount = 3;


// generic function to load comic given the page numbers and the # of panels on screen
const loadComic = async(comicPage, panelNum) => {
    // getting the element for display for page number and display for the comic
    const pageNoDisplay = document.getElementById('page-no');
    const comicDisplay = document.getElementsByClassName('comic-images')[0];
    document.getElementById("loader").style.display = "flex"; // show the loading bar while waiting for response as the images are not loaded yet

    if (panelNum == 1) { // if # of panels on screen is 1
        const response = await fetchComicResponse(comicPage[0]); //fetch image
        document.getElementById("loader").style.display = "none"; //image is fetched, hide loading bar

        // set comic display to image that is fetched and change the page number to show which page it is displaying
        comicDisplay.innerHTML = `
        <img src=${response.img}>
        `
        pageNoDisplay.innerHTML = `Page ${comicPage} of 2475`
    }

    if (panelNum == 3) { // if # of panels on screen is 3
        let response = [];
        comicDisplay.innerHTML = ''
        for (const page of comicPage) {
            let loadImg = await fetchComicResponse(page) //fetch image and put them into an array
            response.push(loadImg)
        }
        document.getElementById("loader").style.display = "none"; 
        for (let j = 0; j < 3; j++) { //put the images into comic display using a loop
            comicDisplay.innerHTML += `
            <img src=${response[j].img}>
            `
        }
        pageNoDisplay.innerHTML = `Page ${comicPage[0]}-${comicPage[comicPage.length-1]} of 2475`
    }

    if (panelNum == 5) { // if # of panels on screen is 5
        let response = [];
        comicDisplay.innerHTML = ''
        for (const page of comicPage) {
            let loadImg = await fetchComicResponse(page)
            response.push(loadImg)
        }
        document.getElementById("loader").style.display = "none";
        for (let j = 0; j < 5; j++) {
            comicDisplay.innerHTML += `
            <img src=${response[j].img}>
            `
        }
        pageNoDisplay.innerHTML = `Page ${comicPage[0]}-${comicPage[comicPage.length-1]} of 2475`
    }
}

// validate form values and load images/change # of panels when submit button is clicked
const formValidation = () => { 
    // get values for both input for comic number and # of panels to display
    const comicNum = document.getElementById('inputField').value; 
    const display = document.getElementById('numOfComicsToDisplay').value;

    // check if number is valid, 0 < x < 2475
    if (isNaN(comicNum) || comicNum < 1 || comicNum > maxPage) {
        alert(`Please input a number between 1 and ${maxPage}`) // if not valid, show alert to input a valid number
    } else { // if valid, change currPageNum and currDisplayCount to inputted values
        currPageNum = comicNum;
        currDisplayCount = display;

        //find the start page and create an empty array for the comic pages we want to display
        let mid = Math.floor(currDisplayCount/2) 
        let start = currPageNum - mid
        let comicPage = []

        // change pages numbere to valid ones
        for (let i = 0; i < currDisplayCount; i++) {
            let page = (start+i)%maxPage
            if (page > 0) {
                comicPage.push(page)
            } else if (page < 0) {
                page = page + maxPage
                comicPage.push(page)
            } else {
                comicPage.push(maxPage)
            }
        }

        // pass the pages and # of panels into loadComic() as argument so the images will start loading
        loadComic(comicPage, currDisplayCount);
    }
}
    
// getting the HTML element for each of the buttons
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');
const randomBtn = document.getElementById('random');

// add event listener to react if the button is click
nextBtn.addEventListener('click', () => {
    currPageNum = Number(currPageNum) + Number(1)
    let mid = Math.floor(currDisplayCount/2)
    let start = currPageNum - mid
    let comicPage = []

    for (let i = 0; i < currDisplayCount; i++) {
        let page = (start+i)%maxPage
        if (page > 0) {
            comicPage.push(page)
        } else if (page < 0) {
            page = page + maxPage
            comicPage.push(page)
        } else {
            comicPage.push(maxPage)
        }
    }

    loadComic(comicPage, currDisplayCount);
})

prevBtn.addEventListener('click', () => {
    currPageNum -= 1
    let mid = Math.floor(currDisplayCount/2)
    let start = currPageNum - mid
    let comicPage = []

    for (let i = 0; i < currDisplayCount; i++) {
        let page = (start+i)%maxPage
        if (page > 0) {
            comicPage.push(page)
        } else if (page < 0) {
            page = page + maxPage
            comicPage.push(page)
        } else {
            comicPage.push(maxPage)
        }
    }

    loadComic(comicPage, currDisplayCount);
})

function getRandom() {
    return Math.floor(Math.random() * (maxPage) + 1); //random integer between 1 and maxPage (2475)
  }

randomBtn.addEventListener('click', () => {
    currPageNum = getRandom()
    let mid = Math.floor(currDisplayCount/2)
    let start = currPageNum - mid
    let comicPage = []

    for (let i = 0; i < currDisplayCount; i++) {
        let page = (start+i)%maxPage
        if (page > 0) {
            comicPage.push(page)
        } else if (page < 0) {
            page = page + maxPage
            comicPage.push(page)
        } else {
            comicPage.push(maxPage)
        }
    }

    loadComic(comicPage, currDisplayCount);
})

