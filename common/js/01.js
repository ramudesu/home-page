$(function () {
  /* Lottieアニメーション ------------*/
  let animKyoro, animTate, animYoko;
  if ($('#lottie-kyoro').length > 0) {
    const lottieKyoro = document.querySelector('#lottie-kyoro');

    animKyoro = lottie.loadAnimation({
      container: lottieKyoro,
      render: 'svg',
      path: '../../common/json/index/kyoro.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }

  // gsap
  //   .timeline({
  //     repeat: -1,
  //   })
  //   .to('.lcl-lead-shirokuma__leaf', { x: 0, y: -5, rotate: -1, duration: 0.6, delay: 0.055, ease: 'power3.inOut' })
  //   .to('.lcl-lead-shirokuma__leaf', { x: -4, y: 10, rotate: 1, duration: 0.65, ease: 'power4.inOut' }, '+=1.08')
  //   .to('.lcl-lead-shirokuma__leaf', { x: 0, y: 0, rotate: 0, duration: 1, ease: 'power4.inOut' }, '+=0.8')
  //   .to('.lcl-lead-shirokuma__leaf', { x: 0, y: 0, rotate: 0, duration: 0.85, ease: 'power4.inOut' });
});
