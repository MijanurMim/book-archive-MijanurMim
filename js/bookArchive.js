// error and spinner call
document.getElementById("error-message").style.display = "none";
document.getElementById("spinner").style.display = "none";

// search area script
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   clearing the search fiels area
  searchField.value = "";

  // removing previous total book numbers
  document.getElementById("book-numbers").textContent = "";

  // handle empty search data
  if (searchText === "") {
    displayError();
  } else {
    // spinner active
    document.getElementById("spinner").style.display = "block";
    // error hidden
    document.getElementById("error-message").style.display = "none";
    // clearing previous search result
    document.getElementById("search-result").textContent = "";

    // api fetching area
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs));

    console.log(url);
  }
};
// error function call
const displayError = () => {
  // showing error
  document.getElementById("error-message").style.display = "block";
  // if there is error then no spinner
  document.getElementById("spinner").style.display = "none";
  // removing previous total book numbers
  document.getElementById("book-numbers").textContent = "";
  // removing previous results
  document.getElementById("search-result").textContent = "";
};

// search data display
const displaySearchResult = (books) => {
  console.log(books);

  // clearing total book number
  document.getElementById("book-numbers").textContent = "";

  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  // error handelling of search data
  if (books === null) {
    displayError();
  } else {
    // hide error
    document.getElementById("error-message").style.display = "none";
    // hide spinner
    document.getElementById("spinner").style.display = "none";
    // total books found
    document.getElementById("book-numbers").innerText = `Total Books Found
  ${books.length}`;

    // search every data loop
    books.forEach((book) => {
      console.log(book);
      // create and appending book info
      const div = document.createElement("div");
      div.classList.add("col", "text-center", "text-color");
      div.innerHTML = `
      <div class="card h-100 border-light mt-4">
    
       <img src="https://covers.openlibrary.org/b/id/${
         book.cover_i
       }-M.jpg" class="card-img-top" height="300px" />
       <h1 class="heading-color">${book.title}<h1>
       <h5>Author Name : ${
         book.author_name ? book.author_name : "No Author Name Found"
       } </h5>
       <h5>Publisher : ${
         book.publisher ? book.publisher.slice(0, 40) : "No Publisher Found"
       }</h5>
       <h5>First Published : ${
         book.first_publish_year ? book.first_publish_year : "No Publish Year"
       }</h5>
       </div>

      `;

      searchResult.appendChild(div);
    });
  }
};
