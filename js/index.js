$(function () {
  /* Lottieアニメーション ------------*/
  if ($('#lottie-light').length > 0) {
    const lottieLight = document.querySelector('#lottie-light');

    const anim = lottie.loadAnimation({
      container: lottieLight,
      render: 'svg',
      path: './common/json/index/light.json',
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
      path: './common/json/index/shirokuma01.json',
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
      path: './common/json/index/shirokuma02.json',
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
      path: './common/json/index/shirokuma03.json',
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

  /*------------------------------------------------
  しろくまの目線
  ------------------------------------------------*/
  const $shirokuma = $('.lcl-hero-shirokuma');
  let shirokumaRect = null;
  let isInitialized = false;

  // 要素の位置情報を更新する関数
  const updateElementPosition = () => {
    shirokumaRect = $shirokuma[0].getBoundingClientRect();
    // スクロール位置を加算して絶対位置を取得
    shirokumaRect = {
      top: shirokumaRect.top + 100 + window.scrollY,
      bottom: shirokumaRect.bottom + window.scrollY,
      height: shirokumaRect.height,
    };

    if (!isInitialized) {
      isInitialized = true;
      // 初期化時に一度カーソル位置をチェック
      checkCursorPosition({
        clientY: lastKnownY + window.scrollY,
      });
    }
  };

  // 最後に知られているカーソルのY座標（スクロール込み）
  let lastKnownY = 0;

  // カーソル位置をチェックして適切な関数を呼び出す
  const checkCursorPosition = (e) => {
    if (!shirokumaRect) return;

    // カーソルの絶対位置（スクロール込み）
    const cursorY = e.clientY + window.scrollY;
    lastKnownY = cursorY;

    if (cursorY < shirokumaRect.top) {
      cursorUp();
    } else if (cursorY > shirokumaRect.bottom) {
      cursorDown();
    } else {
      cursorMiddle();
    }
  };

  // イベントリスナーの設定
  const setupEventListeners = () => {
    // マウス移動の監視
    $(document).on('mousemove', checkCursorPosition);

    // スクロールイベントの監視（throttleで負荷軽減）
    let scrollTimeout;
    $(window).on('scroll', () => {
      if (scrollTimeout) return;

      scrollTimeout = setTimeout(() => {
        updateElementPosition();
        checkCursorPosition({
          clientY: lastKnownY - window.scrollY,
        });
        scrollTimeout = null;
      }, 16); // 約60fps
    });

    // リサイズイベントの監視（debounceで負荷軽減）
    let resizeTimeout;
    $(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateElementPosition();
        checkCursorPosition({
          clientY: lastKnownY - window.scrollY,
        });
      }, 100);
    });
  };

  // カーソル位置に応じた関数
  const cursorUp = () => {
    // console.log('Cursor is above the element');
    // ここに上部にいるときの処理を書く
    shirokumaChange('.lcl-hero-shirokuma__img--up');
  };

  const cursorMiddle = () => {
    // console.log('Cursor is within the element');
    // ここに要素内にいるときの処理を書く
    shirokumaChange('.lcl-hero-shirokuma__img--middle');
  };

  const cursorDown = () => {
    // console.log('Cursor is below the element');
    // ここに下部にいるときの処理を書く
    shirokumaChange('.lcl-hero-shirokuma__img--down');
  };

  const shirokumaChange = (target) => {
    $('.lcl-hero-shirokuma__img').css('opacity', 0);
    $(target).css('opacity', 1);
  };

  // 初期化
  updateElementPosition();
  setupEventListeners();

  /* バネのアニメーション ------------*/
  const shirokuma = document.querySelector('.lcl-hero-shirokuma__in');
  if (shirokuma) {
    new SpringAnimation(shirokuma);
  }

  /* クリック ------------*/
  const $shirokumaIn = $('.lcl-hero-shirokuma__in');
  let animFlg = true;
  let dragFlg = false;
  $shirokumaIn.on('mousedown', function () {
    if (dragFlg) return;
    dragFlg = true;
    // gsap
    //   .timeline({ onComplete: () => (animFlg = true) })
    //   .to('.lcl-hero-shirokuma__wrap', {
    //     keyframes: {
    //       scaleX: [1.2, 0.9, 1.1, 0.95, 1],
    //       scaleY: [0.8, 1.1, 0.9, 1.05, 1],
    //     },
    //   })
    //   .to('.lcl-hero-shirokuma__leaf img', { y: 0, scale: 1, duration: 0.4, ease: 'back(1.7).in' }, '<')
    //   .to('.lcl-hero-shirokuma__leaf img', { y: '3rem', scale: 0.2, ease: 'back(1.7).out' }, '+=2');
  });

  $win.on('mouseup', function () {
    if (!animFlg) return;

    animFlg = false;

    gsap
      .timeline({
        onComplete: () => {
          animFlg = true;
          dragFlg = false;
        },
      })
      .to('.lcl-hero-shirokuma__wrap', {
        keyframes: {
          scaleX: [1.2, 0.9, 1.1, 0.95, 1],
          scaleY: [0.8, 1.1, 0.9, 1.05, 1],
        },
      })
      .to('.lcl-hero-shirokuma__leaf img', { y: 0, scale: 1, duration: 0.4, ease: 'back(1.7).in' }, '<')
      .to('.lcl-hero-shirokuma__leaf img', { y: '3rem', scale: 0.2, ease: 'back(1.7).out' }, '+=2');
  });

  ScrollTrigger.create({
    trigger: '.lcl-rev-copy',
    endTrigger: '.lcl-rev__in',
    start: () => `center center`,
    end: () => `bottom center+=${$('.lcl-rev-copy').height() / 2}`,
    pin: true,
    anticipatePin: 0,
    pinSpacing: false,
    // markers: true,
    invalidateOnRefresh: true,
  });

  gsap.to('.lcl-rev-copy', {
    alpha: 1,
    scale: 1,
    scrollTrigger: {
      trigger: '.lcl-rev-copy',
      endTrigger: '.lcl-rev__in',
      start: () => `center center`,
      end: () => `bottom bottom`,
      scrub: true,
      // markers: true,
      invalidateOnRefresh: true,
    },
  });

  $('.lcl-linkarea__txt--anin').each((i, el) => {
    gsap.to(el, {
      alpha: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: () => `center 75%`,
        // end: () => `bottom bottom`,
        // scrub: true,
        // markers: true,
        invalidateOnRefresh: true,
      },
    });
  });
});

/*------------------------------------------------
バネのアニメーション
------------------------------------------------*/
class SpringAnimation {
  constructor(element) {
    this.element = element;
    this.elementRect = null;
    this.centerX = 0;
    this.centerY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isAnimating = false;
    this.isDragging = false;
    this.startDragX = 0;
    this.startDragY = 0;

    // 設定パラメータ
    this.SPRING_STRENGTH = 0.1;
    this.SPRING_FRICTION = 0.8;
    this.MAX_MOVEMENT = 60;
    this.RETURN_SPRING_STRENGTH = 0.2;

    this.init();
    this.bindEvents();
  }

  updateElementPosition() {
    this.elementRect = this.element.getBoundingClientRect();
    this.centerX = this.elementRect.left + this.elementRect.width / 2;
    this.centerY = this.elementRect.top + this.elementRect.height / 2;
  }

  init() {
    this.updateElementPosition();
  }

  bindEvents() {
    // マウスダウンイベント
    this.element.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startDragX = e.clientX;
      this.startDragY = e.clientY;
      this.updateElementPosition();

      // カーソルスタイルを変更
      this.element.style.cursor = 'grabbing';
      document.body.style.cursor = 'grabbing';
    });

    // マウス移動イベント
    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (!this.isAnimating) {
        this.isAnimating = true;
        this.animate();
      }
    });

    // マウスアップイベント
    document.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;

        // カーソルスタイルを戻す
        this.element.style.cursor = 'grab';
        document.body.style.cursor = 'auto';
      }
    });

    // マウスが領域から出た場合
    document.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.element.style.cursor = 'grab';
    });

    // スクロールイベント
    window.addEventListener('scroll', () => {
      this.updateElementPosition();
      // スクロール時はドラッグ解除
      this.isDragging = false;
      this.element.style.cursor = 'grab';
    });

    // リサイズイベント
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateElementPosition();
      }, 100);
    });

    // 初期カーソルスタイル設定
    this.element.style.cursor = 'grab';
  }

  animate() {
    let targetX = 0;
    let targetY = 0;

    if (this.isDragging) {
      // ドラッグ中の移動処理
      const dx = this.mouseX - this.centerX;
      const dy = this.mouseY - this.centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance === 0) {
        targetX = 0;
        targetY = 0;
      } else {
        // 最大移動距離を制限
        const movementScale = Math.min(distance, this.MAX_MOVEMENT) / distance;
        targetX = dx * movementScale;
        targetY = dy * movementScale;
      }
      this.SPRING_STRENGTH = 0.1;
    } else {
      // ドラッグ解除時は中心に戻る
      this.SPRING_STRENGTH = this.RETURN_SPRING_STRENGTH;
    }

    // バネの力を計算
    const forceX = (targetX - this.currentX) * this.SPRING_STRENGTH;
    const forceY = (targetY - this.currentY) * this.SPRING_STRENGTH;

    // 速度の更新
    this.velocityX = (this.velocityX + forceX) * this.SPRING_FRICTION;
    this.velocityY = (this.velocityY + forceY) * this.SPRING_FRICTION;

    // 位置の更新
    this.currentX += this.velocityX;
    this.currentY += this.velocityY;

    // 要素の位置を更新
    this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

    // アニメーションの継続判定
    const isMoving =
      Math.abs(this.velocityX) > 0.01 ||
      Math.abs(this.velocityY) > 0.01 ||
      Math.abs(targetX - this.currentX) > 0.01 ||
      Math.abs(targetY - this.currentY) > 0.01;

    if (isMoving || this.isDragging) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.isAnimating = false;
    }
  }
}
