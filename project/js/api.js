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
    console.log(data); // 받은 데이터를 개발자 도구에 찍어보기

    //포스터 제목: title, 요약: overview, 평점 정보:vote_average
    // console.log(data.results[0].title); //제목 확인하기
    data.results.forEach((movie) => {
      let movieTitle = movie.title;
      // let movieOverview = movie.overview;
      let movieAvg = movie.vote_average;
      let imgURl = "https://image.tmdb.org/t/p/w500/";
      let movieImg = movie.poster_path;
      // console.log(imgURl + movieImg, "이미지 주소");

      //ui생성
      let movieList = document.getElementById("movie-list");
      let tempLi = document.createElement("li");
      // <img src="${imageUrl}" alt="${movieTitle}" />
      tempLi.innerHTML = `
            <div class="img">
              <img src="${imgURl}${movieImg}" alt="${movieTitle}" />
            </div>
            <div class="txt">
              <p>${movieTitle}</p>
              <p>평점 : ${movieAvg}</p>
            </div>
        `;
      movieList.appendChild(tempLi);
    });
  })
  .catch((err) => console.error(err));
