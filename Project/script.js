"use strict";
    var anim_id;

    //saving dom objects to variables
    var container = document.getElementById('container');
    var car = document.getElementById('car');
    var car_1 = document.getElementById('car_1');
    var car_2 = document.getElementById('car_2');
    var car_3 = document.getElementById('car_3');
    var line_1 = document.getElementById('line_1');
    var line_2 = document.getElementById('line_2');
    var line_3 = document.getElementById('line_3');
    var restart_div = document.getElementById('restart_div');
    var restart_btn = document.getElementById('restart');
    var score = document.getElementById('score');
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');
    
    //saving some initial setup
    var container_left = parseInt(getComputedStyle(container)['left']);
    var container_width = parseFloat(getComputedStyle(container, null).width.replace("px", ""));
    var container_height = parseFloat(getComputedStyle(container, null).height.replace("px", ""));
    var car_width = parseFloat(getComputedStyle(car, null).width.replace("px", ""));
    var car_height = parseFloat(getComputedStyle(car, null).height.replace("px", ""));

    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    /* GAME CODE STARTS HERE */

    /* Move the car */
    //Mouse Mod
    leftArrow.addEventListener('mousedown', function() {
        if (move_left === false) {
            move_left = requestAnimationFrame(left);
        }
    });
    leftArrow.addEventListener('mouseup', function() {
        cancelAnimationFrame(move_left);
        move_left = false;
    });
    rightArrow.addEventListener('mousedown', function() {
        if (move_right === false) {
            move_right = requestAnimationFrame(right);
        }
    });
    rightArrow.addEventListener('mouseup', function() {
        cancelAnimationFrame(move_right);
        move_right = false;
    });
    // Touchscreen
   leftArrow.addEventListener('touchstart', function() {
        if (move_left === false) {
            move_left = requestAnimationFrame(left);
        }
    });
    leftArrow.addEventListener('touchend', function() {
        cancelAnimationFrame(move_left);
        move_left = false;
    });
    rightArrow.addEventListener('touchstart', function() {
        if (move_right === false) {
            move_right = requestAnimationFrame(right);
        }
    });
    rightArrow.addEventListener('touchend', function() {
        cancelAnimationFrame(move_right);
        move_right = false;
    });

    // Desktop
    document.addEventListener('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    document.addEventListener('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(getComputedStyle(car,null).left) > 0) {
            car.style['left'] = (parseInt(getComputedStyle(car,null).left) - 5) + 'px';
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(getComputedStyle(car,null).left) < container_width - car_width) {
            car.style['left'] = (parseInt(getComputedStyle(car,null).left) + 5) + "px";
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(getComputedStyle(car,null).top) > 0) {
            car.style['top'] = (parseInt(getComputedStyle(car,null).top) - 3) + "px";
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(getComputedStyle(car,null).top) < container_height - car_height) {
            car.style['top'] = (parseInt(getComputedStyle(car,null).top) + 3) + "px";
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the other cars and lines */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.innerText = parseInt(score.innerText) + 1;
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
        
        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = parseInt(getComputedStyle(car,null).top.replace("px",""));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.style['left'] = car_left + "px";
        }
        car.style["top"] = (car_current_top + speed)+"px";
    }

    function line_down(line) {
        var line_current_top = parseInt(getComputedStyle(line,null).top.replace("px",""));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.style["top"] = (line_current_top + line_speed) +"px";
    }

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        alert('Game Over !\n Click To Restart');
        location.reload();
        //restart_div.slideDown();
        //restart_btn.focus();
    }

    /* GAME CODE ENDS */

    function collision(div1, div2) {
        var rectD1 = div1.getBoundingClientRect();
        var rectD2 = div2.getBoundingClientRect();

        var x1 = rectD1.left + document.body.scrollLeft;
        var y1 = rectD1.top + document.body.scrollTop;
        var h1 = outerHeight(div1);
        var w1 = outerWidth(div1);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = rectD2.left + document.body.scrollLeft;
        var y2 = rectD2.top + document.body.scrollTop;
        var h2 = outerHeight(div2);
        var w2 = outerWidth(div2);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function outerHeight(el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
      
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
      }

    function outerWidth(el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }
