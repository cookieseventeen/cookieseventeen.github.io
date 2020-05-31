//Scroll down
$(document).ready(function () {
    let pageBody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    scrolldwon = $('.action-btn');

    scrolldwon.on('click', function () {
        let offsetValue = $('#result').offset().top-$('#mainNav').outerHeight();
        pageBody.stop().animate({
                scrollTop: offsetValue
            },
            500,
            "swing"
        );
        console.log(offsetValue);
    });
});




//綁定資料
var actionTools = new Vue({
    el: '#page',
    data() {
        return {
            wp_data: '',
            pagemode: {
                load: true,
                welcome: false,
                search: false
            },
            search_data: '',
            tagdata: {
                load:false,
                data:{}
            },
            tagdataload:false,
            thinks_action:''
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
    },
    computed: {
        filterPost: function () {
            if(this.thinks_action!=''){
                let thisVm=this;
                setTimeout(() => {
                    $.ajax({
                        type: "GET",
                        url: "https://wentang.com.tw/wp-json/wp/v2/posts?search="+this.thinks_action,
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

})