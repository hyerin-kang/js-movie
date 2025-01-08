const myApi = "eecca9097a7cb49a13996f47d8cdbb9d"; //TMDB에서 발급받은 개인API키
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${myApi}`;
//이 url 어디에서 확인할수 있음??

//fetch를 사용하여 TMDB에 요청을 보내고 받은 응답 처리하기

fetch(url)
  .then((res) => res.json()) // 응답을 JSON 형식으로 변환
  .then((data) => {
    console.log(data); // 받은 데이터를 개발자 도구에 찍어보기
  })
  .catch((error) => {
    console.error("패치 실패", error); // 오류 처리
  });
