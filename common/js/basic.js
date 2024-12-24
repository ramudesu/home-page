// Global variables
const is_fixed = true; // Whether to fix when opening menu.
let display_mode = 'w'; // "w" or "n"
const break_point = 767;
let init_disp = 'w';
let resize_eventname = 'resize'; // "resize" or "orientationchange"
let device = 'pc'; // "pc" or "sp"
let is_pc = true;
let touch_device = false;
const user_agent = window.navigator.userAgent.toLowerCase();
const $win = $(window);
/* prettier-ignore */
if ((user_agent.match(/(iphone|iPhone)/) > 0 &&	user_agent.match(/(ipad|iPad)/) == -1) || user_agent.match(/(ipod|iPod)/) > 0 ||
  user_agent.match(/(android|Android)/) > 0) {resize_eventname = 'orientationchange';device = 'sp';}
if (window.ontouchstart === null) {
  touch_device = true;
}
//FontAwesome5
window.FontAwesomeConfig = {
  searchPseudoElements: true,
};

/* ---------------------- function ---------------------- */
/* set_display_mode -------------------- */
init_disp = $win.outerWidth() <= break_point ? 'n' : 'w';
const set_display_mode = () => {
  display_mode = $win.outerWidth() <= break_point ? 'n' : 'w';
  is_pc = display_mode == 'w' ? true : false;

  if (init_disp !== display_mode) window.location.reload();
};
set_display_mode();

/**
 * 桁数を指定して切り捨てする関数
 * @param {number} value // 切り捨てする数値
 * @param {number} length // 桁数
 * @return {number}
 */
function floor(value, length) {
  return Math.floor(value * 10 ** length) / 10 ** length;
}

/* change_root_font-size -------------------- */
const change_root_fz = () => {
  // font-size計算
  // let vw = window.outerWidth;
  let vw = $win.innerWidth();
  if (display_mode == 'n') {
    document.documentElement.style.setProperty('--fz', (vw / 375) * 10 + 'px');
  } else {
    /* スクロールバーの横幅を取得 ------------*/
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar', `${scrollbarWidth}px`);

    /* remの基準となるフォントサイズの設定 ------------*/
    // document.documentElement.style.setProperty('--fz', '10px');
    const minWidth = getComputedStyle(document.documentElement).getPropertyValue('--min-width');
    const maxWidth = getComputedStyle(document.documentElement).getPropertyValue('--max-width');
    if (vw < minWidth) {
      vw = minWidth;
    } else if (maxWidth && vw > maxWidth) {
      vw = maxWidth;
    }
    document.documentElement.style.setProperty('--fz', floor((vw / 1300) * 10, 3) + 'px');
  }
};
change_root_fz();
/* ---------------------- DOM_ready ---------------------- */
$(function () {
  'user strict';
  if (touch_device) {
    $('body').addClass('touch');
  }
  /* resize_event -------------------- */
  const resize_event = () => {
    set_display_mode();
    change_root_fz();
  };
  resize_event();
  $win.on('load ' + resize_eventname, resize_event);

  /* sp_menu -------------------- */
  // Hamburger
  let st = 0;

  /* メニューを開く ------------*/
  const menuOpen = () => {
    $('.menu').addClass('menu--open');
    $('.nav').addClass('nav--active');
    st = $win.scrollTop();
    $('body').css({ top: -st });
    $('.menu').attr('aria-label', 'メニューを閉じる');
    $('body').addClass('oh-open');
  };
  /* メニューを閉じる ------------*/
  const menuClose = () => {
    $('.menu').removeClass('menu--open');
    $('.nav').removeClass('nav--active');
    $('body,html').stop(true, false).animate({ scrollTop: st }, 10, 'swing');
    $('body').css({ top: 0 });
    $('.menu').attr('aria-label', 'メニューを開く');
    $('body').removeClass('oh-open');
  };

  /* キー操作を取得 ------------*/
  $(window).keyup(function (e) {
    // エスケープキー
    if (e.keyCode == 27 && $('body').hasClass('oh-open')) {
      menuClose();
    }
  });

  $('.menu,.overlay').click(() => {
    if (is_fixed) {
      if ($('body').hasClass('oh-open')) {
        // メニューを閉じる
        menuClose();
      } else {
        // メニューを開く
        menuOpen();
      }
    }
  });
  // ページ内リンクが存在する場合
  if (display_mode === 'n') {
    $(".nav-list__link[href^='#']").on('click', () => menuClose());
  }

  /*------------------------------------------------
  モーダル
  ------------------------------------------------*/
  // モーダルを開く処理
  const modalOpen = (target) => {
    if (!target) return false;

    const modal = document.getElementById(target);
    $('body').addClass('is-modal');
    modal.showModal();
    $(modal).focus();
  };

  // モーダルを閉じる処理
  const modalClose = (target) => {
    if (!target) return false;

    const modal = document.getElementById(target);
    if (modal.open) {
      $('body').removeClass('is-modal');
      modal.close();
    }
  };

  // 開くボタン
  $('.modal-open').on('click', function () {
    modalOpen($(this).attr('data-target'));
  });

  // 閉じるボタン
  $('.modal-close').on('click', function () {
    modalClose($('.modal[open]').attr('id'));
  });

  // Escボタン
  $('.modal').on('cancel', function (e) {
    modalClose($('.modal[open]').attr('id'));
  });
  // オーバーレイをクリック
  $('.modal').on('click', function (e) {
    if (!e.target.closest('.modal__inner')) {
      modalClose($(this).attr('id'));
    }
  });

  /* loading強制終了 -------------------- */
  if ($('.loading').length > 0) {
    if (!$('.loading').hasClass('loading--off')) {
      $('body').addClass('now-loading');
      setTimeout(function () {
        if (!$('.loading').hasClass('loading--off')) {
          $('.loading').addClass('loading--off');
          $('body').removeClass('now-loading');
        }
        $('.loading').remove();
      }, 8000);
    }
  }

  /*------------------------------------------------
  横スクロールコンテンツ
  ------------------------------------------------*/
  $(`.swipe,.swipe-${display_mode}`).each(function (index, element) {
    const target = $(element);
    if ($(target).width() >= $(target).find('>*').width()) {
      // 子要素の横幅がスワイプコンテンツ以下なら終了
      $(target).addClass('swipe--swiped');
      return;
    }
    $(target).on('scroll', function () {
      $(this).addClass('swipe--swiped');
      $(this).off('swipe');
    });
  });

  /*------------------------------------------------
  アコーディオン
  ------------------------------------------------*/

  // アニメーションの時間とイージング
  const animTiming = { duration: 250, easing: 'ease' };
  // アコーディオンを閉じるときのキーフレーム
  const closingAnimation = (inner) => [
    { height: inner.offsetHeight + 'px', opacity: 1 },
    { height: 0, opacity: 0 },
  ];
  // アコーディオンを開くときのキーフレーム
  const openingAnimation = (inner) => [
    { height: 0, opacity: 0 },
    { height: inner.offsetHeight + 'px', opacity: 1 },
  ];

  document.querySelectorAll('.details').forEach((element) => {
    const summary = element.querySelector('.details__summary');
    const inner = element.querySelector('.details__in');
    summary.addEventListener('click', (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();
      // detailsのopen属性を判定
      if (element.getAttribute('open') !== null) {
        // アコーディオンを閉じるときの処理
        const closingAnim = inner.animate(closingAnimation(inner), animTiming);

        closingAnim.onfinish = () => {
          // アニメーションの完了後にopen属性を取り除く
          element.removeAttribute('open');
        };
      } else {
        // open属性を付与
        element.setAttribute('open', 'true');
        // アコーディオンを開くときの処理
        const openingAnim = inner.animate(openingAnimation(inner), animTiming);
      }
    });
  });
});
/* ---------------------- DOM_load ---------------------- */
$win.on('load', () => {
  const vh = window.innerHeight * 0.01;
  // カスタム変数--vhの値をドキュメントのルートに設定
  document.documentElement.style.setProperty('--vh', vh + 'px');
  /* load_animation -------------------- */
  $('.js-load')
    .delay(400)
    .queue(function () {
      $(this).addClass('js-load--on').dequeue();
    });
  if ($('.loading').length > 0) {
    $('.loading').addClass('loading--off');
    $('body').removeClass('now-loading');
  }
  /* anchor_link -------------------- */
  const header = $('#header');
  const headerHeight = header.outerHeight();
  //ヘッダー固定時のアンカーリンク
  $("a[href^='#']").click(function () {
    const href = $($(this).attr('href'));
    if (href.length > 0) {
      const position = href.offset().top - headerHeight;
      $('body,html').stop(true, false).animate({ scrollTop: position }, 480, 'swing');

      // ページ内リンクの場所にフォーカスを移動
      $(href).focus();
      if (!$(href).is(':focus')) {
        // フォーカスが当たらない要素なら、強制的にフォーカスが当たるように変更
        $(href).attr('tabindex', -1);
        $(href).focus();
      }

      // アンカーリンクの対象がアコーディオンの場合はアコーディオンを開く
      if ($(href).prop('tagName') === 'DETAILS' && !$(href).attr('open')) {
        $(href).attr('open', 'true');
      }
    }
    return false;
  });
  //別ページからのアンカーリンク
  const hash = decodeURI(location.hash);
  if ($(hash).length > 0) {
    // ページ内リンクの場所にフォーカスを移動
    $(hash).focus();
    if (!$(hash).is(':focus')) {
      // フォーカスが当たらない要素なら、強制的にフォーカスが当たるように変更
      $(hash).attr('tabindex', -1);
      $(hash).focus();
    }

    const position = $(hash).offset().top;
    $('html, body').scrollTop(Number(position) - headerHeight);

    // アンカーリンクの対象がアコーディオンの場合はアコーディオンを開く
    if ($(hash).prop('tagName') === 'DETAILS' && !$(hash).attr('open')) {
      $(hash).attr('open', 'true');
    }
  }
});
/* ---------------------- DOM_load or scroll ---------------------- */
let prev_top = 0;
$win.on('load scroll', () => {
  const header = $('#header');

  /* side scrolling  -------------------- */
  if (display_mode == 'w') {
    if (header.length > 0) header.css('left', -$win.scrollLeft());
  }
});

/*------------------------------------------------
GSAP ScrollTrigger
------------------------------------------------*/
$win.on('load', function () {
  const st_options = {
    start: () => (display_mode === 'w' ? 'top 70%' : 'top 80%'),
    invalidateOnRefresh: true,
  };

  /* .scr-anin  -------------------- */
  ScrollTrigger.batch('.scr-anin', {
    ...st_options,
    // markers: true,
    onEnter: (batch) => $(batch).addClass('scr-anin--on'),
  });

  /* .fadein系  -------------------- */
  const fade_els = $(`.fadein,.fadein-${display_mode},
  .fadein-right,.fadein-right-${display_mode},
  .fadein-left,.fadein-left-${display_mode},
  .fadein-top,.fadein-top-${display_mode},
  .fadein-bottom,.fadein-bottom-${display_mode}`);
  ScrollTrigger.batch(fade_els, {
    ...st_options,
    // markers: true,
    onEnter: (batch) => $(batch).addClass('scroll-fade'),
  });

  ScrollTrigger.create({
    trigger: '#wrapper',
    start: () => `${$('#header').height()} top`,
    // markers: true,
    onEnter: () => {
      $('#header').addClass('header--scroll');
    },
    onLeaveBack: () => {
      $('#header').removeClass('header--scroll');
    },
  });
});
