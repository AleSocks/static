
var $$ = document;
var $$getValue = (elementId) => $$.getElementById(elementId).value;
    
    // Make the body full screen size if it has not enough content inside
    $(window).on('load resize', function() {
        if($('body').height() < 800) {
            $('body').css('min-height', '100vh');
            $('#footer-main').addClass('footer-auto-bottom')
        }
    });

    // Headroom - show/hide navbar on scroll
    if($('.headroom')[0]) {
        var headroom  = new Headroom(document.querySelector("#navbar-main"), {
            offset: 300,
            tolerance : {
                up : 30,
                down : 30
            },
        });
        headroom.init();
    }

$(function Navbar() {
	// Variables
	var $nav = $('.navbar-nav, .navbar-nav .nav');
	var $collapse = $('.navbar .collapse');
	var $dropdown = $('.navbar .dropdown');
	function accordion($this) {
		$this.closest($nav).find($collapse).not($this).collapse('hide');
	}

    function closeDropdown($this) {
        var $dropdownMenu = $this.find('.dropdown-menu');

        $dropdownMenu.addClass('close');

    	setTimeout(function() {
    		$dropdownMenu.removeClass('close');
    	}, 200);
	}
	$collapse.on({
		'show.bs.collapse': function() {
			accordion($(this));
		}
	})

	$dropdown.on({
		'hide.bs.dropdown': function() {
			closeDropdown($(this));
		}
	})

});


//
// Navbar collapse
//

$(function NavbarCollapse() {
	// Variables
	var $nav = $('.navbar-nav'),
		$collapse = $('.navbar .navbar-custom-collapse');
		
	function hideNavbarCollapse($this) {
		$this.addClass('collapsing-out');
	}

	function hiddenNavbarCollapse($this) {
		$this.removeClass('collapsing-out');
	}
	if ($collapse.length) {
		$collapse.on({
			'hide.bs.collapse': function() {
				hideNavbarCollapse($collapse);
			}
		})

		$collapse.on({
			'hidden.bs.collapse': function() {
				hiddenNavbarCollapse($collapse);
			}
		})
	}

});

//
// Scroll to (anchor links)
//

'use strict';

$(function ScrollTo() {
	// Variables
	var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');
	function scrollTo($this) {
		var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
		var options = {
			scrollTop: $($el).offset().top - offset
		};

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate(options, 600);

        event.preventDefault();
	}
	if ($scrollTo.length) {
		$scrollTo.on('click', function(event) {
			scrollTo($(this));
		});
	}

});

//
// Form control
//

'use strict';

$(function FormControl() {
	// Variables
	var $input = $('.form-control');
	function init($this) {
		$this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
    }).trigger('blur');
	}
	if ($input.length) {
		init($input);
	}

});

//
// Scrollbar
//

'use strict';

$(function Scrollbar() {
	// Variables
	var $scrollbar = $('.scrollbar-inner');
	function init() {
		$scrollbar.scrollbar().scrollLock()
	}
	if ($scrollbar.length) {
		init();
	}

});

