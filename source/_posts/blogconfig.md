---
title: 博客配置
tags: []
id: '438'
categories:
  - - uncategorized
date: 2022-02-16 22:48:05
---

footer.php添加鼠标特效

<!-- 首先导入jq插件 -->
<script src="http://startpage.zhuanjie.ltd/jquery-1.9.1.min.js"></script>

<script type="text/javascript">
     /\* 鼠标点击特效 \*/
 
     jQuery(function () {
        $("html").click(function(e) {
            var a\_idx = Math.floor((Math.random() \* 26));
            var a = new Array(
                "乐观", "❤", "积极", "向上", "自由", "正能量", "(\*^▽^\*)", "元气满满", "开心", "快乐",
                 "善良", "可爱", "暴富", "暴瘦", "❤","富强", "民主", "文明", "和谐", "自由", "平等",
                 "公正" ,"法治", "爱国", "敬业", "诚信", "友善"
                 );
            var color1 = Math.floor((Math.random() \* 255));
            var color2 = Math.floor((Math.random() \* 255));
            var color3 = Math.floor((Math.random() \* 255));
 
            var $i = $("<span />").text(a\[a\_idx\]);
            a\_idx = (a\_idx + 1) % a.length;
            var x = e.pageX,
                y = e.pageY;
            $i.css({　　　　　　
                "z-index": 9999999999999 ,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-family":"mmm",
                "fontSize":Math.floor((Math.random() \* 22)+15),
                "font-weight": "bold",
                "color": "rgb("+color1+","+color2+","+color3+")",
                "-webkit-user-select":"none",
                "-moz-user-select":"none",
                "-ms-user-select":"none",
                "user-select":"none",
            });
            $("body").append($i);
            $i.animate({
                    "top": y - 200,
                    "opacity": 0
                },
                1000,
                function() {
                    $i.remove();
                });
        });
    });
</script>

functions.php添加仅注册用户可访问

// 添加只允许登录后查看
 
add\_shortcode( 'vip\_only', 'members\_only\_shortcode' );
 
function members\_only\_shortcode( $atts, $content = null ) {
 
if ( is\_user\_logged\_in() && !empty( $content ) && !is\_feed() )    {
 
return $content;
 
}
 
$a= '<center><span>
<div style="text-align:center;border:1px dashed #FF9A9A;padding:8px;margin:10px auto;color:green;">要查看更多文章内容，请您先<a href="http://blog.zhuanjie.ltd/login/" target="\_blank">登录</a>
</div>
</span></center>';
 
return $a;
 
}

template-parts/footer/site-info.php

<div class="site-info">
<?php
if ( function\_exists( 'the\_privacy\_policy\_link' ) ) {
the\_privacy\_policy\_link( '', '<span role="separator" aria-hidden="true"></span>' );
}
?>
<a class="message" href="http://startpage.zhuanjie.ltd/" target="\_blank">本网站由转接搭建</a>
<br/>
<a class="icp" href="https://beian.miit.gov.cn/" target="\_blank">

京ICP备2021028872号-1
</a>
</div><!-- .site-info -->