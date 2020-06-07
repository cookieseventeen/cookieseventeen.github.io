//Scroll down
$(document).ready(function () {
    let pageBody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    scrolldwon = $('.action-btn');

    scrolldwon.on('click', function () {
       $(this).parents('#pageBanner').addClass('action');

       $('#pageBanner').animate({height:'0'},1000, function() {
            $('#page').addClass('work');
        });
       $('#pageBanner .welcome').animate({'transform':'scale(0.2)','opacity':0},400);

    });

    $(window).on('load resize',function(){
        let heightViewPort=window.innerHeight,
            headHeight=$('#mainNav').outerHeight()+15;

        if(!$('#page').hasClass('work')){
            $('#pageBanner').height(heightViewPort);
        }

        $('#result').css({'padding-top': headHeight});
       
        setTimeout(() => {
            scrolldwon.click();
        }, 3000);
        
    });
    $(window).on('scroll',function(){
        if($(this).scrollTop()>30){
            if(!$('body').hasClass('leavetop')){
                $('body').addClass('leavetop');
            }
        }else{
            if($('body').hasClass('leavetop')){
                $('body').removeClass('leavetop');
            }
        }

    });

    $('#pagelogo').on('click',function(){
       
        pageBody.stop().animate(
            {
              scrollTop: 0
            },
            500,
            "swing"
        );
    });

});


var searchDebounce;

//綁定資料
var actionTools = new Vue({
    el: '#page',
    data() {
        return {
            wp_data: '',
            pagemode: {
                ready:false,
                load: false,
            },
            search_data: '',
            tagdata: {
                load:false,
                data:{}
            },
            tagdataload:false,
            thinks_action:'',
            hoverid:''
        }
    },
    mounted() {
        console.log(this.wp_data == '');
        $.ajax({
            type: "GET",
            url: "https://wentang.com.tw/wp-json/wp/v2/posts",
            //data: "data",
            dataType: "json",
            success: function (response) {
                actionTools.wp_data = response;
            }
        });
        $.ajax({
            type: "GET",
            url: "https://wentang.com.tw/wp-json/wp/v2/tags",
            //data: "data",
            dataType: "json",
            success: function (response) {
                let tagajaxdata = response;

                tagajaxdata.forEach(element => {
                    let this_id = element.id;
                    actionTools.tagdata.data[this_id] = {
                        link: element.link,
                        name: element.name,
                        slug: element.slug
                    };
                });
                actionTools.tagdataload = true;
            }
        });
        setTimeout(() => {
            this.pagemode.ready=true;
        }, 500);
        
    },
    computed: {
        filterPost: function () {
            if(this.thinks_action!=''){

                let thisVm=this;
                clearTimeout(searchDebounce);
                searchDebounce=setTimeout(() => {
                    $.ajax({
                        type: "GET",
                        url: "https://wentang.com.tw/wp-json/wp/v2/posts?search="+thisVm.thinks_action,
                        //data: "data",
                        dataType: "json",
                        success: function (response) {
                            thisVm.search_data=response;
                        }
                    });
                }, 1000);

                return thisVm.search_data;
            }else{
                return this.wp_data
            }
            
        }
    },
    methods:{

    }

})