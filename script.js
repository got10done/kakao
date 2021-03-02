var page=1;
            getList();
            $("#first").on("click",function(){
                page=1;
                getList();
            });

            $("#btnPre").on("click",function(){
                page--;
                getList();
            });

            $("#btnNext").on("click",function(){
                page++;
                getList();
            });

            $("#txtQuery").on("keydown",function(e){
                if(e.keyCode==13){ //엔터키를 누른다면, 13이 엔터키
                    getList();
                }
            });
            $("#btnSearch").on("click",function(){
                getList();
            });
            $("#selSize").on("change",function(){
                getList();
            });
            
            function getList(){
                var query=$("#txtQuery").val();
                var size=$("#selSize").val();
                $.ajax({
                    type:"get",
                    url:url,
                    headers:{"Authorization": "KakaoAK 87b6d3ba1453e7fad641622a3362f4c3"},
                    dataType:"json",
                    data:{"query":query, "size":size, "page":page},
                    success:function(data){
                        
                        var is_end=data.meta.is_end;
                        var total=data.meta.pageable_count;
                        var lastPage=Math.ceil(total/size);
                        
                        var temp=Handlebars.compile($("#temp").html());
                        $("#tbl").html(temp(data));
                        $("#page2").html(page+"/"+lastPage);
                        if(page==1){
                            $("#btnPre").attr("disabled",true);
                        }else {
                            $("#btnPre").attr("disabled",false);
                        }
                        if(page==lastPage){
                            $("#btnNext").attr("disabled",true);
                        }else {
                            $("#btnNext").attr("disabled",false);
                        }
                    }
                });
            }