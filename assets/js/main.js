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

	            // Replace the placeholder with the actual section.
	            element.outerHTML = html;
	        }
	        // Sections are now loaded.
	        initializePage();

	        // Reveal the page after everything is ready.
	        window.setTimeout(function() {
	            $body.removeClass('is-preload');
	        }, 100);
	    } catch (error) {
	        console.error('Error loading sections:', error);
	    }
	}


	function initializePortfolioCarousel() {

		var $carousel = $('.portfolio-carousel');

		if ($carousel.length === 0)
			return;

		var $track = $carousel.find('.portfolio-carousel-track');
		var $originalCards = $track.find('.portfolio-card');

		var $prevButton = $carousel.find('.portfolio-carousel-prev');
		var $nextButton = $carousel.find('.portfolio-carousel-next');
		var $dots = $('.portfolio-carousel-dot');
		
		var currentIndex = 0;
		var isAnimating = false;


		function getCardsPerView() {

			if (window.innerWidth <= 736)
				return 1;

			return 2;
		}

		function updateDots() {
		    $dots.removeClass('active');
		    var originalCount = $originalCards.length;
		    if (originalCount === 0)
		        return;
		    var cardsPerView = getCardsPerView();
		    // Highlight the cards currently visible.
		    for (var i = 0; i < cardsPerView; i++) {
		        var index = (currentIndex + i) % originalCount;
		        if (index < 0)
		            index += originalCount;
		        $dots
		            .filter('[data-index="' + index + '"]')
		            .addClass('active');
		    }
		}

		function createClones() {

			// Remove previously created clones.
			$track.find('.portfolio-card-clone').remove();

			var cardsPerView = getCardsPerView();
			var $cards = $track.find('.portfolio-card');

			if ($cards.length === 0)
				return;

			// Clone the last visible cards and place them before the originals.
			$cards
				.slice(-cardsPerView)
				.clone()
				.addClass('portfolio-card-clone')
				.prependTo($track);

			// Clone the first visible cards and place them after the originals.
			$cards
				.slice(0, cardsPerView)
				.clone()
				.addClass('portfolio-card-clone')
				.appendTo($track);
		}

		function getAllCards() {
			return $track.find('.portfolio-card');
		}

		function getCardStep() {

			var $cards = getAllCards();

			if ($cards.length === 0)
				return 0;

			var cardWidth = $cards.first().outerWidth();
			var gap = parseFloat($track.css('gap')) || 0;

			return cardWidth + gap;
		}

		function moveCarousel(animate) {
			var step = getCardStep();
			var cardsPerView = getCardsPerView();
			var offset = (currentIndex + cardsPerView) * step;

			if (animate) {
				$track.css(
					'transition',
					'transform 0.45s ease'
				);
			} else {
				$track.css(
					'transition',
					'none'
				);
			}
			updateDots();
			$track.css(
				'transform',
				'translate3d(-' + offset + 'px, 0, 0)'
			);
		}

		function resetAfterClone() {
			var originalCount = $originalCards.length;

			// We moved into the clones at the beginning.
			if (currentIndex < 0) {
				currentIndex = originalCount - 1;
				moveCarousel(false);
			}
			// We moved into the clones at the end.
			else if (currentIndex >= originalCount) {
				currentIndex = 0;
				moveCarousel(false);
			}
		}


		function goNext() {
			if (isAnimating)
				return;
			isAnimating = true;
			currentIndex++;
			moveCarousel(true);
		}

		function goPrevious() {
			if (isAnimating)
				return;

			isAnimating = true;
			currentIndex--;
			moveCarousel(true);
		}

		$nextButton.on(
			'click',
			goNext
		);

		$prevButton.on(
			'click',
			goPrevious
		);

		$dots.on('click', function() {
		    if (isAnimating)
		        return;
		    var targetIndex = parseInt(
		        $(this).attr('data-index'),
		        10
		    );
		    if (isNaN(targetIndex))
		        return;
		    var originalCount = $originalCards.length;
		    if (originalCount === 0)
		        return;
		    targetIndex = targetIndex % originalCount;
		    if (targetIndex === currentIndex)
		        return;
		    isAnimating = true;
		    currentIndex = targetIndex;
		    moveCarousel(true);
		});

		$track.on(
		    'transitionend',
		    function(e) {
			
		        if (e.originalEvent && e.originalEvent.propertyName !== 'transform')
		            return;
			
		        resetAfterClone();

		        isAnimating = false;
		    }
		);

		/*
		* Rebuild the clones when the screen changes
		* between desktop and mobile.
		*/
		$window.on(
			'resize',
			function() {
				createClones();
				currentIndex = 0;
				moveCarousel(false);
				isAnimating = false;
			}
		);

		/*
		* Initial setup.
		*/
		createClones();
		currentIndex = 0;
		moveCarousel(false);
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
		// after dynamically loaded sections are initialized.
		if (window.location.hash) {
		    var $target = $(window.location.hash);
		    if ($target.length) {
			
		        setTimeout(function() {
		            $('html, body').animate({
		                scrollTop: $target.offset().top
		            }, 0);
		        }, 100);
		    }
		}
    }
    // Start everything.
    loadSections();	
})(jQuery);
