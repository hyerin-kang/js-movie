//공통ui(카드들)
function renderMovies(movies) {
  let movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    let movieTitle = movie.title;
    // let movieOverview = movie.overview;
    let movieAvg = movie.vote_average;
    let imgURl = "https://image.tmdb.org/t/p/w500/";
    let movieImg = movie.poster_path;

    //ui생성

    const liId = movie.id;

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
    movieList.appendChild(tempLi);

    //카드 클릭시 모달 열기
    tempLi.addEventListener("click", () => {
      console.log("모달 클릭");
      openModal(movie);
    });
  });
}

//모달 함수
function openModal(movie) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  modal.innerHTML = "";
  console.log("열림");

  const imgURl = "https://image.tmdb.org/t/p/w500/";
  const movieImg = movie.poster_path;
  const modalTemp = document.createElement("div");
  modalTemp.id = movie.id;
  modalTemp.innerHTML = `
      <div class="modal-content">
        <div class="title">
          <h1>${movie.title}</h1>
          <button class="close">닫기</button>
        </div>
        <div class="content">
          <div class="img">
            <img src="${imgURl}${movieImg}" alt="${movie.title}" />
          </div>
          <div class="txt">
            <p>${movie.overview}</p>
            <button class='bookMark'>북마크 저장하기</button>
          </div>
        </div>
      </div>
    `;
  modal.appendChild(modalTemp);

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", function (e) {
    // alert(e.target);
    modal.style.display = "none";
    //새롭게 패치 하는 로직이 필요하다.
    //
  });
}

//모달 ui생성성
//카드ui에 있는거랑같은정보가 보이게

//인기영화 불러오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjVlYjIyMWUwNDAwOWJmNDAwMTQ0YTFiZmRkMjFiNyIsIm5iZiI6MTcyMTYzMTE3Ny43MzcsInN1YiI6IjY2OWUwMWM5YzVlMjBkNjJhODE4NzI1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ym4S7Leagjj66RX7Fyp72RQmMTi-JO7sUuVueyKcCKM",
  },
};

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

//검색기능
const input = document.querySelector("#searchInput");
const inputForm = document.querySelector("#searchForm");
input.addEventListener("input", function (e) {
  const inputVal = e.target.value.trim().toLowerCase();
  if (!inputVal) {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        renderMovies(data.results); // 인기 영화 목록 다시 렌더링
      })
      .catch((err) => console.error(err));
  } else {
    fetch(
      "https://api.themoviedb.org/3/search/movie?query=%EC%8A%88%ED%8D%BC&include_adult=false&language=ko-KR&page=1",
      options
    )
      .then((res) => res.json())

      .then((data) => {
        // renderMovies(data.results);
        console.log(data.results, "검색");

        // renderMovies(res);
        //제목 배열로 바꾸기기
        const inputVal = e.target.value.toLowerCase();
        const includeVal = data.results.filter((movie) => {
          return movie.title.toLowerCase().includes(inputVal);
        });
        if (includeVal.length == 0) {
          console.log(includeVal, " 없음");
          const movieList = document.getElementById("movie-list");
          movieList.innerHTML = `<p>검색결과가 없습니다</p>`;
        } else {
          renderMovies(includeVal); // ui 생성
        }
      })
      .catch((err) => console.error(err));
  }
});

/*
  공통ui 빼기 (데이터 받아와서)

  검색기능:
  인풋창이 입력받고 있는 이벤트리스터 안에
  search api를 요청하고
  fetch해서 가져온 데이터를 공통 ui함수에 넣어준다.

        // console.log(searchTitle);
      //배열에서 검색한거랑 같은거 걸러줘
      // const inputVal = e.target.value;
      // const filteredSearch = searchTitle.filter(function (title) {
      //   return title.toLowerCase().includes(inputVal.toLowerCase());
      // });

      // console.log(inputVal, " : 입력값");
      // console.log(filteredSearch, " : 검색 제목");
      // console.log(res, "검색데이터");
      // renderMovies(filteredSearch);
      /*
      1. search

  */
