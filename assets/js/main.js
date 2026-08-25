/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	var	$window = $(window),
		$body = $('body');

	// Load HTML sections first.
	async function loadSections() {
	    var sectionElements = $('[data-section]');
	    try {
	        for (const element of sectionElements) {
	            var section = $(element).data('section');

	            const response = await fetch('sections/' + section + '.html');

	            if (!response.ok) {
	                throw new Error('Failed to load ' + section);
	            }
	            const html = await response.text();
	            // Replace the placeholder div with the actual section.
	            element.outerHTML = html;
	        }
	        // Sections are now direct children of #main.
	        initializePage();
	    } catch (error) {
	        console.error('Error loading sections:', error);
	    }
	}

	function initializePortfolioCarousel() {

	    var $carousel = $('.portfolio-carousel');
	    if ($carousel.length === 0)
	        return;
	    var $track = $carousel.find('.portfolio-carousel-track');
	    var $cards = $track.find('.portfolio-card');
	    var $prevButton = $carousel.find('.portfolio-carousel-prev');
	    var $nextButton = $carousel.find('.portfolio-carousel-next');
	    var currentIndex = 0;

	    function getCardsPerView() {
	        if (window.innerWidth <= 736)
	            return 1;
	        return 2;
	    }

	    function getMaxIndex() {
	        var cardsPerView = getCardsPerView();

	        return Math.max(
	            0,
	            $cards.length - cardsPerView
	        );
	    }

		function updateCarousel() {
		
		    if ($cards.length === 0)
		        return;
		
		    var cardWidth = $cards.first().outerWidth();
		    var gap = parseFloat($track.css('gap')) || 0;
		
		    var offset = currentIndex * (cardWidth + gap);
		
		    $track.css(
		        'transform',
		        'translateX(-' + offset + 'px)'
		    );
		}


	    function goNext() {
	        var maxIndex = getMaxIndex();
	        if (currentIndex >= maxIndex)
	            currentIndex = 0;
	        else
	            currentIndex++;
	        updateCarousel();
	    }

	    function goPrevious() {
	        var maxIndex = getMaxIndex();
	        if (currentIndex <= 0)
	            currentIndex = maxIndex;
	        else
	            currentIndex--;
	        updateCarousel();
	    }

	    $nextButton.on('click', goNext);
	    $prevButton.on('click', goPrevious);

		$window.on('resize', function() {
	        currentIndex = Math.min(
	            currentIndex,
	            getMaxIndex()
	        );
	        updateCarousel();
	    });
	    updateCarousel();
	}

	// Initialize the Prologue template AFTER sections are loaded.
    function initializePage() {
		$nav = $('#nav');

		// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

		// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				// var	$this = $(this),
				// 	id = $this.attr('href'),
				// 	$section = $(id);
    			var $this = $(this),
    			    id = $this.attr('href');

    			// External link? Bail.
    			if (!id || id.charAt(0) != '#')
    			    return;
			
    			var $section = $(id);
				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

		// Scrolly.
		$('.scrolly').scrolly();

		// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

		// CV toggle.
		$('#cvButton').on('click', function(e) {
			e.preventDefault();
		
			var $button = $(this);
			var $cv = $('#cv');
		
			$cv.stop(true, true).slideToggle(300, function() {
				if ($cv.is(':visible')) {
					$button.text('Hide My CV');
				} else {
					$button.text('View My CV');
				}
			});
		});
		// Portfolio carousel.
		initializePortfolioCarousel();
    }
    // Start everything.
    loadSections();	
})(jQuery);
