$(function () {
  if ($('#lottie-shirokuma-thumbsup').length > 0) {
    const lottieShirokumaThumbsup = document.querySelector('#lottie-shirokuma-thumbsup');

    const anim = lottie.loadAnimation({
      container: lottieShirokumaThumbsup,
      render: 'svg',
      path: '../common/json/02/shirokumaThumbsup.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
  if ($('#lottie-hikaku').length > 0) {
    const lottieHikaku = document.querySelector('#lottie-hikaku');

    const anim = lottie.loadAnimation({
      container: lottieHikaku,
      render: 'svg',
      path: '../common/json/02/hikaku.json',
      loop: false,
      autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });

    ScrollTrigger.create({
      trigger: '#lottie-hikaku',
      start: () => (display_mode === 'w' ? 'top 70%' : 'top 80%'),
      invalidateOnRefresh: true,
      // markers: true,
      onEnter: () => anim.play(),
    });
  }
  if ($('#lottie-carport-bad').length > 0) {
    const lottieCarportBad = document.querySelector('#lottie-carport-bad');

    const anim = lottie.loadAnimation({
      container: lottieCarportBad,
      render: 'svg',
      path: '../common/json/02/carportBad.json',
      loop: true,
      // autoplay: false, // 自動再生はしない（デフォルトはtrue。省略可）
      // animationData: animData,
    });
  }
  if ($('#lottie-carport-good').length > 0) {
    const lottieCarportGood = document.querySelector('#lottie-carport-good');

    const anim = lottie.loadAnimation({
      container: lottieCarportGood,
      render: 'svg',
      path: '../common/json/02/carportGood.json',
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

  gsap
    .timeline({
      scrollTrigger: {
        toggleActions: 'play none none reverse',
        trigger: '.lcl-cnt',
        start: () => `center center`,
        end: () => `center center`,
        // markers: true,
        invalidateOnRefresh: true,
      },
    })
    .to('.lcl-cnt-side__img:nth-of-type(1) img', { x: '-20%', duration: 1, ease: 'power2.inOut' })
    .fromTo('.lcl-cnt-side__img:nth-of-type(2) img', { x: '20%' }, { x: 0, duration: 1, ease: 'power2.inOut' }, '<')
    .to(
      '.lcl-cnt-side__img:nth-of-type(2)',
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: 'power2.inOut' },
      '<'
    );
});
