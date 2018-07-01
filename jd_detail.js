//顶部的下拉菜单
$(function () {
    $(".app_jd,.service").hover(function () {
        $(this).children("[id$='_items']").toggle()
            //保持点击的hover状态
            .prev().toggleClass("hover");
    })
});
//顶部的下拉菜单结束


//全部商品分类
$("#category").hover(function () {
    $("#cate_box").toggle();
});
//on 不能绑定hover
$("#cate_box").on("mouseenter","li",showSub
);
$("#cate_box").on("mouseleave","li",showSub
);


//
function showSub() {
    $(this).children(".sub_cate_box").toggle()
        .prev().toggleClass("hover")
}
//全部商品分类结束


$("#product_detail>.main_tabs").on("click","li:not('.current')",
    function () {
    $(this).addClass("current").siblings().removeClass("current");
    //内容切换
    if($(this).is(":contains('商品评价')")){
        $("#product_detail>[id^='product']").removeClass("show");
    }else {
        // var i=$(this).index();  这样写  小标不是0123
        var i=$(this).index("#product_detail>.main_tabs>li:not(:contains('商品评价'))");
        console.log(i);
        $("#product_detail>[id^='product']").eq(i)
            .addClass("show").siblings().removeClass("show")
    }
});


//商品列表的放大镜效果
var preview={
    LIWIDTH:62,
    $ul:null,
    moved:0,
    MSIZE:175,
    SMSIZE:350,
    MAX:0,
    $lg:null,
    init:function () {
        this.MAX=this.SMSIZE-this.MSIZE;
        this.$ul = $("#icon_list");
        $("#preview>h1>a").click(function (e) {
            if (!$(e.target).is("[class$='_disabled']")) {
                if ($(e.target).is(".forward")) {
                    this.$ul.css("left", parseFloat(this.$ul.css("left")) - this.LIWIDTH)
                    this.moved++;
                    console.log(this.moved);

                } else {
                    this.$ul.css("left", parseFloat(this.$ul.css("left")) + this.LIWIDTH)
                    this.moved--;
                }
                this.chechA();
            }

        }.bind(this));
        //鼠标进入下面的小图片，上面换成对应的大图片
        this.$ul.on("mouseover", "li>img", function (e) {
            var src = $(e.target).attr("src");
            var i = src.lastIndexOf(".");
            src = src.slice(0, i) + "-m" + src.slice(i);
            $("#mImg").attr("src", src);
        })

        //  遮罩层的显示

        this.$mask = $("#mask");
        this.$lg=$("#largeDiv");
        $("#superMask").hover(function () {
            this.$mask.toggle();
            this.$lg.toggle();
            var src=$("#mImg").attr("src");
            var i=src.lastIndexOf(".");
            src=src.slice(0,i-1)+"l"+src.slice(i);
            this.$lg.css("backgroundImage","url("+src+")");
        }.bind(this))/*这里绑定this，是因为前面一个this如不绑定
        那么指向是$对象id为supermask*/
            .mousemove(function (e) {
                var x=e.offsetX;
                var y=e.offsetY;
                var top=y-this.MSIZE/2;
                var left=x-this.MSIZE/2;

                if(top<0){
                    top=0
                }else if(top>this.MAX){
                    top=this.MAX;
                }
                if(left<0){
                    left=0;
                }else if(left>this.MAX){
                    left=this.MAX;
                }
                $("#mask").css({
                // this.$mask.css({
                    "top":top,
                    "left":left
                })
                this.$lg.css("backgroundPosition",
                    `${-16/7*left}px ${-16/7*top}px`);

            }.bind(this));
        },
    chechA:function () {
        if(this.moved==0){
            $("[class^=backward]").attr("class","backward_disabled");
        }else if(this.moved==3){
            $("[class^=forward]").attr("class","forward_disabled");
        }else{
            $("[class^=backward]").attr("class","backward");
            $("[class^=forward]").attr("class","forward");
        }
    }
};
preview.init();
//商品列表的放大镜效果结束