function welcome(){
    let welcome_text = '欢迎光顾本站'
    if(document.referrer!==''){
        let referrer=document.referrer.split("/")[2];
        welcome_text="欢迎你，来自"+referrer.toUpperCase()+"的用户！";//获取用户来源域名
    }
    swal({
        title: " 欢迎！",
        text: welcome_text+'\n本站点由于迁移造成部分url指向错误，若无所需文章请自行在本站搜索！',//欢迎文本，可自行修改
        timer: 3000,//弹出时间
        showConfirmButton: false
    });
}
$(document).ready(()=>{//若未引用JQuery，请引用
    welcome()
})