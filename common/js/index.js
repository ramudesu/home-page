$(function () {
  /* Lottieアニメーション ------------*/
  if ($('#lottie-light').length > 0) {
    const lottieLight = document.querySelector('#lottie-light');

    const anim = lottie.loadAnimation({
      container: lottieLight,
      render: 'svg',
      path: '../common/json/index/light.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
  if ($('#lottie-shirokuma01').length > 0) {
    const lottieShirokuma01 = document.querySelector('#lottie-shirokuma01');

    const anim = lottie.loadAnimation({
      container: lottieShirokuma01,
      render: 'svg',
      path: '../common/json/index/shirokuma01.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
  if ($('#lottie-shirokuma02').length > 0) {
    const lottieShirokuma02 = document.querySelector('#lottie-shirokuma02');

    const anim = lottie.loadAnimation({
      container: lottieShirokuma02,
      render: 'svg',
      path: '../common/json/index/shirokuma02.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
  if ($('#lottie-shirokuma03').length > 0) {
    const lottieShirokuma03 = document.querySelector('#lottie-shirokuma03');

    const anim = lottie.loadAnimation({
      container: lottieShirokuma03,
      render: 'svg',
      path: '../common/json/index/shirokuma03.json',
      loop: true,
      autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });

    $('.lcl-contact').hover(
      function () {
        anim.play();
      },
      function () {
        anim.stop();
      }
    );
  }
});
