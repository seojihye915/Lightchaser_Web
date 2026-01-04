// js/main.js

// 헤더 로딩이 완료된 후 실행하기 위해 약간의 지연(Event Delegation) 또는 함수 활용
// include.js가 HTML을 불러온 뒤에 작동해야 하므로, 아래 방식을 씁니다.

document.addEventListener("click", function (e) {
  // 클릭한 요소가 .btn-menu 또는 그 내부의 span이면
  if (e.target.closest(".btn-menu")) {
    const btn = document.querySelector(".btn-menu");
    const gnb = document.querySelector(".gnb");

    // 클래스 토글 (켜기/끄기)
    btn.classList.toggle("active");
    gnb.classList.toggle("active");

    // 메뉴 열렸을 때 스크롤 막기 (선택사항)
    if (gnb.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
});
