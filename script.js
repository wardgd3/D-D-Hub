$(document).ready(function() {
    // Function to update the color and position based on scroll position
    function updateIconAppearanceBasedOnScroll() {
        var offset = $(window).scrollTop();
        var colorBasedOnScroll = offset < 100 ? 'black' : 'white'; // Black when at the top

        // Calculate top position based on scroll offset continuously
        var topPosition = Math.max(20 - offset, 0) + 'px';

        $('#menuIcon, .nav-mobile h1').css({
            'color': colorBasedOnScroll,
            'top': topPosition
        });
    }
    $('#desktop-menu-icon').click(function() {
    $('#desktop-menuContent').toggleClass(function() {
        if ($(this).hasClass('desktop-hidden')) {
          $(this).removeClass('desktop-hidden');
          return 'desktop-visible';
        } else {
          $(this).removeClass('desktop-visible');
          return 'desktop-hidden';
        }
      });
    });
      

    // Shared click event for the menu icon and .nav-mobile h1
    $('#menuIcon, .nav-mobile h1').click(function() {
        $('#menuContent').toggleClass('hidden visible');

        if ($(this).hasClass('menu-active')) {
            $(this).removeClass('menu-active');
        } else {
            $(this).addClass('menu-active');
        }
    });

    $('#menuContent').mouseleave(function() {
        $(this).addClass('hidden').removeClass('visible');
    });

    $(window).scroll(function() {
        var offset = $(this).scrollTop();
        var fadeUntil = 100;
        var opacity = offset <= fadeUntil ? 0 + offset / fadeUntil : 1;

        $('.nav-mobile').css('background-color', 'rgba(37, 37, 37, ' + opacity + ')');
        updateIconAppearanceBasedOnScroll();
        //$('.nav-mobile h1, .nav-mobile img').css('opacity', opacity);
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('#menuContent').length && !$(event.target).is('#menuIcon')) {
            $('#menuContent').addClass('hidden').removeClass('visible');
        }
    });

    $('#menu-list-mobile a').click(function() {
        $('#menu-list-mobile a').removeClass('active');
        $(this).addClass('active');
    });

    // Initialize icon color and position based on initial scroll position
    updateIconAppearanceBasedOnScroll();

    //Dice App
    $('.dice-result-button').click(function() {
        let diceType = $('#dice-select').val();
        let numberOfDice = parseInt($('#dice-number').val());
        let total = 0;
        let individualResults = [];
    
        for (let i = 0; i < numberOfDice; i++) {
            let roll = rollDice(diceType);
            total += roll;
            individualResults.push(roll);
        }
    
        $('#totalResult').text(total);
        $('#individualRolls').text(individualResults.join(', '));
    });
    
    function rollDice(diceType) {
        switch(diceType) {
            case 'd20': return Math.floor(Math.random() * 20) + 1;
        case 'd12': return Math.floor(Math.random() * 12) + 1;
        case 'd10': return Math.floor(Math.random() * 10) + 1;
        case 'd8': return Math.floor(Math.random() * 8) + 1;
        case 'd6': return Math.floor(Math.random() * 6) + 1;
        case 'd4': return Math.floor(Math.random() * 4) + 1;
        case 'd-percent': 
            // Roll two ten-sided dice - one for tens and one for units
            return (Math.floor(Math.random() * 10) * 10) + Math.floor(Math.random() * 10);
        default: return 0;
        }
    }
    
});
