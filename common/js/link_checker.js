$(function () {
  const hostname = location.hostname;

  const get_hostname = (path) => {
    var result = path.replace(/\\/g, '/').match(/\/\/([^/]*)/);

    return result ? result[1] : '';
  };

  const target = $('a:not([href^="tel:"]):not([href^="mailto:"])');
  $(target).each(function (index, element) {
    const href = $(element).attr('href');
    // リンク先のホスト名（絶対パスの場合）
    const href_hostname = get_hostname(href);

    // クロスドメインはリターン
    if (href_hostname && href_hostname.indexOf(hostname) < 0) return true;

    // wp-admin配下(CMS詳細ページ＆ツールバー表示中)のリンクを除外
    if (href.indexOf('wp-admin') > 0) return true;

    if (href.indexOf('未設定') >= 0) {
      console.error('リンク先が【未設定】です', href, element);
      return true;
    }

    $.ajax({
      url: href,
      type: 'GET',
      // success: function () {
      //   console.error(`リンク先の取得に成功しました。`, href, element);
      // },
      error: function (xml, textStatus, xhr) {
        console.error(`リンク先の取得に失敗しました。`, href, element);
      },
    });
  });
});
