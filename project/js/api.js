//공통ui(카드들)
function renderMovies(movies_1) {
  //movies_1 : 영화 데이터의 배열들 (data.results로 전달했었음)
  // console.log(movies);
  let movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";
  movies_1.forEach((movie) => {
    const tempLi = createMovieCard(movie); // li태그하나
    movieList.appendChild(tempLi);
    //카드 클릭시 모달 열기
    tempLi.addEventListener("click", () => {
      openModal(movie);
    });
  });
}

function createMovieCard(movie1) {
  let movieTitle = movie1.title;
  // let movieOverview = movie.overview;
  let movieAvg = movie1.vote_average;
  let imgURl = "https://image.tmdb.org/t/p/w500/";
  let movieImg = movie1.poster_path;

  //ui생성
  const liId = movie1.id;
  let tempLi = document.createElement("li");
  tempLi.id = liId;
  // <img src="${imageUrl}" alt="${movieTitle}" />
  tempLi.innerHTML = `
          <div class="img">
            <img src="${imgURl}${movieImg}" alt="${movieTitle}" />
          </div>
          <div class="txt">
            <p class="title">${movieTitle}</p>
            <p>평점 : ${movieAvg}</p>
          </div>
      `;

  return tempLi;
}

//모달 함수
function openModal(movie_2) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  modal.innerHTML = "";

  const imgURl = "https://image.tmdb.org/t/p/w500/";
  const movieImg = movie_2.poster_path;
  const modalTemp = document.createElement("div");
  modalTemp.id = movie_2.id;
  modalTemp.innerHTML = `
      <div class="modal-content">
        <div class="title">
          <h1>${movie_2.title}</h1>
          <button class="close">닫기</button>
        </div>
        <div class="content">
          <div class="img">
            <img src="${imgURl}${movieImg}" alt="${movie_2.title}" />
          </div>
          <div class="txt">
            <p>${movie_2.overview}</p>
            <button class='saveBookMarkBtn'>북마크 저장하기</button>
          </div>
        </div>
      </div>
    `;
  modal.appendChild(modalTemp);

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", function (e) {
    modal.style.display = "none";
  });
  //북마크 저장
  const saveBookMarkBtn = document.querySelector(".saveBookMarkBtn");
  let cancelBookMark = false;

  saveBookMarkBtn.addEventListener("click", function (e) {
    const localStorageBookMarkList = localStorage.getItem("bookMarkList"); //bookMarkList 키값으로 저장된 value 값들을 가져와
    // localStorage.setItem("bookMarkList", JSON.stringify(movie)); //movie값을 bookMarkList키 값으로 저장해라

    let bookMarkList; // 일단 선언해두기
    // bookMarkList.push(movie); // movie를 bookMarkList에 추가
    if (!localStorageBookMarkList) {
      //저장해둔게 아무거도 없으면
      bookMarkList = []; //빈값으로
    } else {
      // 저장해둔게 있으면 아까 문자열로 바꾼것들을 객체로 변환하여 bookMarkList 에 할당한다.
      bookMarkList = JSON.parse(localStorageBookMarkList);
    }

    //중복된거  추가안되게 짜라
    // console.log(movie_2.id, "선택한거");
    const saveId = JSON.parse(localStorage.getItem("bookMarkList") || "[]").map(
      (movie) => movie.id
    );
    // console.log(saveId, "저장된id");

    console.log(cancelBookMark); //처음에는 false임
    if (!cancelBookMark) {
      //true일때
      alert("북마크 추가 되었습니다.");
      bookMarkList.push(movie_2);
      saveBookMarkBtn.innerHTML = `북마크 해지하기`;
    } else {
      //false 일때
      alert("북마크 취소 되었습니다!");
      saveBookMarkBtn.innerHTML = `북마크 추가하기`;
      // bookMarkList.push(movie_2); 해당한게 배열에 있으면 빼라
      bookMarkList.filter((movie) => movie !== movie_2);
    }
    cancelBookMark = !cancelBookMark;

    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
  });
}

//북마크 된 목록 보여주기
let isBookMark = false; //처음 보여지는 화면이 인기영화이니까 북마크된거를 false로 초기설정

const bookMarkBtn = document.querySelector(".bookMark");

function showBookmarkAndPopular(movies_1) {
  // console.log("저장된 북마크들 보여주기");
  const localStorageBookMarkList = localStorage.getItem("bookMarkList");
  if (isBookMark) {
    // 인기 영화가 보일때
    bookMarkBtn.innerHTML = "북마크 보기";
    fetchPopularMovies(options);
  } else {
    //찜한 목록 보여주기
    bookMarkBtn.innerHTML = "인기영화 목록";
    if (!localStorageBookMarkList) {
      document.getElementById("movie-list").innerHTML =
        "<p>북마크된 영화가 없습니다 :(</p>";
    } else {
      renderMovies(JSON.parse(localStorageBookMarkList)); //찜한영화 보여주기
      //
    }
  }
  isBookMark = !isBookMark; //클릭할때마다 true, false로 바꾸기 (토글)
}
document.querySelector(".bookMark").addEventListener("click", function () {
  showBookmarkAndPopular();
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODk4ZWI2NzgyN2U3NzI5N2FlY2QzNzI3ODBiZmNmMyIsIm5iZiI6MTcyNzE0MjAxMi4yMDk5OTk4LCJzdWIiOiI2NmYyMTg3YzczMDBhNWJhMjEzYmNlMWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cd-6Hd3HasTqkOAmz02TRipcr9tUyeqW8cVNt8HuOAw",
  },
};
//인기영화 불러오기
function fetchPopularMovies(options) {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options
  )
    .then((res) => res.json())
    .then((data) => {
      //데이터가 받아와졌을때 실행되는 코드들
      renderMovies(data.results); // 데이터 받아서 ui 생성
    })
    .catch((err) => console.error(err));
}
fetchPopularMovies(options);

//검색기능
const input = document.querySelector("#searchInput");
const inputForm = document.querySelector("#searchForm");
input.addEventListener("keyup", function (e) {
  const inputVal = e.target.value.trim().toLowerCase();
  if (!inputVal) {
    fetchPopularMovies();
  } else {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          renderMovies(data.results);
        } else {
          const movieList = document.getElementById("movie-list");
          movieList.innerHTML = `<p>검색결과가 없습니다</p>`;
        }
      })
      .catch((err) => console.error(err));
  }
});

//로고 새로고침
const logoTitle = document.querySelector(".logoTitle");
console.log(logoTitle);
logoTitle.addEventListener("click", function () {
  location.reload();
});
