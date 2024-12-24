$(function () {
  // code
  /* -------------- SVGコピーここから -------------- */
  // クリック
  $('.icons__item').on('click', function (event) {
    svgClipboard($(this), event);
  });

  /* ダブルクリック ------------*/
  $('.icons__item').on('dblclick', function (event) {
    svgClipboard($(this), event);
  });

  function svgClipboard(target, event) {
    // eventを取得: [click | dblclick]
    const event_type = event['handleObj']['type'];

    // data属性を取得
    const data_svg = $(target).attr('data-svg');

    // クリップボード用テキスト
    const clipboard_text = event_type == 'click' ? '<?php echo get_svg("' + data_svg + '"); ?>' : data_svg;
    // クリップボードにコピー
    setClipboard(clipboard_text);

    // トースト用テキスト
    const toast_text = event_type == 'click' ? 'PHP' : 'NAME';
    $(target).find('.icons__toast').html(toast_text);
    // トースト表示
    $(target).find('.icons__toast').addClass('icons__toast--done');
    setTimeout(function () {
      // トースト非表示
      $(target).find('.icons__toast--done').removeClass('icons__toast--done');
    }, 1000);
  }
  /* -------------- SVGコピーここまで -------------- */

  /* -------------- DOMコピーここから -------------- */
  $('.clipboard').on('click', function () {
    const clipboard = $(this);
    let dom = $(this).html();
    while (1) {
      // svgタグの開始位置
      const svg_start_index = dom.indexOf('<svg');
      // svgタグの終了位置
      const svg_last_index = dom.indexOf('</svg>') + 6;
      if (svg_start_index === -1) {
        break;
      }

      // SVGタグを取得
      const svg = dom.substring(svg_start_index, svg_last_index);
      // SVGタグのクラス名を取得
      const svg_classname = $(svg).attr('class');
      // クラス名のうち、ico_svgの次のクラス名を取得
      const svg_name = svg_classname.slice(svg_classname.indexOf('ico_svg') + 8);
      // SVGをPHPのget_svg関数に置換
      dom = dom.replace(svg, '<?php echo get_svg("' + svg_name + '"); ?>');
    }
    // 前後の不要なスペースをトリミング
    dom = dom.trim();

    // クリップボードにコピー
    setClipboard(dom);

    clipboard.addClass('clipboard--copied');
    setTimeout(function () {
      clipboard.removeClass('clipboard--copied');
    }, 1000);
  });
  /* -------------- DOMコピーここまで -------------- */

  // クリップボードにコピー関数
  function setClipboard(value) {
    if (navigator.clipboard == undefined) {
      window.clipboardData.setData('Text', value);
    } else {
      navigator.clipboard.writeText(value);
    }
  }
});
