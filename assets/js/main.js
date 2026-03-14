(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Mobile?
	if (browser.mobile)
		$body.addClass('is-mobile');
	else {
		breakpoints.on('>medium', function() {
			$body.removeClass('is-mobile');
		});

		breakpoints.on('<=medium', function() {
			$body.addClass('is-mobile');
		});
	}

	// UI Initialization for content
	function initContent(scope) {
		var $scope = scope ? $(scope) : $('body');

		// Rotate headers - auto-cycle every 4 seconds
		var $headers = $scope.find('.rotating-header');
		if ($headers.length > 0) {
			var currentIndex = 0;
			
			// Hide all except first
			$headers.hide();
			$headers.eq(currentIndex).fadeIn(500);
			
			// Auto-rotate every 12 seconds
			setInterval(function() {
				$headers.eq(currentIndex).fadeOut(500, function() {
					currentIndex = (currentIndex + 1) % $headers.length;
					$headers.eq(currentIndex).fadeIn(500);
				});
			}, 12000);
		}

		// Scrolly - with navbar offset
		var navbarHeight = function() {
			var nav = document.querySelector('.navbar');
			return nav ? nav.offsetHeight : 60;
		};
		$scope.find('.scrolly').scrolly({
			speed: 600,
			easing: 'linear',
			offset: navbarHeight
		});
	};

	// Scroll to hash after content loads, or scroll to top if no hash
	function scrollToHash() {
		var hash = window.location.hash;
		if (hash && hash.length > 1) {
			// Wait for content to render, then scroll to hash
			setTimeout(function() {
				var target = document.querySelector(hash);
				if (target) {
					var nav = document.querySelector('.navbar');
					var offset = nav ? nav.offsetHeight : 60;
					var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
					window.scrollTo({ top: targetPos, behavior: 'smooth' });
				}
			}, 100);
		} else {
			// No hash - scroll to top of page
			window.scrollTo({ top: 0, behavior: 'instant' });
		}
	}

	// Initialize on ready
	$(function() {
		initContent('body');
		scrollToHash();
	});

	// Re-initialize for HTMX swaps
	document.body.addEventListener('htmx:load', function(evt) {
		initContent(evt.detail.elt);
		scrollToHash();
	});

})(jQuery);
