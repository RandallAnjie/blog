'use strict';

module.exports = (hexo) => {
  if (hexo.theme.has_hello) {
    return;
  }

  if (hexo.theme.i18n.languages[0].search(/zh-CN/i) !== -1) {
    hexo.log.info(`感谢使用本站点 —— by 转接`);
  } else {
    hexo.log.info(`Thank you for using this site —— by Randall`);
  }

  hexo.theme.has_hello = true;
};
