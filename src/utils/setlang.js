$("#english").change(function (res) {
    var lang = res.target.value;
    switch (lang) {
      case "English":
        loadProperties("en");
        break;
      case "中文":
        loadProperties("zh");
        break;
      default:
        loadProperties("en");
    }
  });
  $("#chinese").change(function (res) {
    var lang = res.target.value;
    switch (lang) {
      case "English":
        loadProperties("en");
        break;
      case "中文":
        loadProperties("zh");
        break;
      default:
        loadProperties("en");
    }
  });

  function loadProperties(lang) {
    $.i18n.properties({
      name: "lang", //属性文件名     命名格式： 文件名_国家代号.properties
      path: "./utils/lang/", //这里路径是你属性文件的所在文件夹
      mode: "map",
      language: lang, //这就是国家代号 name+language刚好组成属性文件名：lang+zh -> lang_zh.properties
      callback: function () {
        $("[data-locale]").each(function () {
          $(this).html($.i18n.prop($(this).data("locale")));
        });
      },
    });
  }