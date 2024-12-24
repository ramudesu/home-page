$(function () {
  /* Lottieアニメーション ------------*/
  let animKyoro, animTate, animYoko;
  if ($('#lottie-kyoro').length > 0) {
    const lottieKyoro = document.querySelector('#lottie-kyoro');

    animKyoro = lottie.loadAnimation({
      container: lottieKyoro,
      render: 'svg',
      path: '../common/json/index/kyoro.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
});
