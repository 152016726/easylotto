// JavaScript Document


			$( "<div/>", {
			    "id": "block"
			  }).appendTo( "#content" );
			  $("#block").css({
			    "position":"fixed",
			    "top":0,
			    "left":0,
			    "display":"none",
			    "z-index":9999,
			    "background-color":"rgba(255,255,255,0)",
			    "width":"100%",
			    "height":"100%"
			  });
			  var origin_height=$("#content div[class='content-scroll'] #Preditction article").height();

var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				showLeftPush = document.getElementById( 'showLeftPush' ),
				body = document.body;

			showLeftPush.onclick = function() {
				classie.toggle( this, 'active' );
				classie.toggle( body, 'cbp-spmenu-push-toright' );
				classie.toggle( menuLeft, 'cbp-spmenu-open' );
				disableOther( 'showLeftPush' );
				$("#block").css("left",240);

			      $("#block").show();

			      origin_height=$("#content div[class='content-scroll'] #Preditction article").height();

			      if(origin_height+$("#content div header").height()+$("#myform footer").height()+ $("#content div[class='content-scroll'] .c-time").height() > $(window).height())
			        $("#content div #Preditction").height(($(window).height() - $("#content div header").height() - $("#myform footer").height() - $("#content div[class='content-scroll'] .c-time").outerHeight())+'px');

			};

			$('#bodyclick').click(function(){
				  disableOther( 'showLeftPush' );
				});

			function disableOther( button ) {
				if( button !== 'showLeftPush' ) {
					classie.toggle( showLeftPush, 'disabled' );

				}

			}

  $("#block").click(function(){
    $("body").removeClass("cbp-spmenu-push-toleft cbp-spmenu-push-toright");
    $("#sidebar nav").removeClass("cbp-spmenu-open");
    $("#content div #Preditction").height(origin_height+'px');
    $(this).hide();
  });
  setInterval(function(){
    if(!($("body").hasClass("cbp-spmenu-push-toleft") || $("body").hasClass("cbp-spmenu-push-toright")))
      $("#block").hide();
    if(!($("#cbp-spmenu-s1").hasClass("cbp-spmenu-open") || $("#cbp-spmenu-s2").hasClass("cbp-spmenu-open")) && origin_height != ($("#content div[class='content-scroll'] #Preditction article").height() + $("#content div[class='content-scroll'] #Preditction .c-time").outerHeight() )){
      origin_height=$("#content div[class='content-scroll'] #Preditction article").height() + $("#content div[class='content-scroll'] #Preditction .c-time").outerHeight();
      $("#content div #Preditction").height(origin_height+'px');
    }
  },300);
