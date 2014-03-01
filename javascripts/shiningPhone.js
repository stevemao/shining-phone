// Created by Steve Mao
if ("undefined" == typeof jQuery) {
    throw new Error("shiningPhone's JavaScript requires jQuery");
}

!(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "shiningPhone",
        defaults = {
            phone: '',
            // In sec
            animateTime: 10,
            infinite: true
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.allPhones = ['galaxy_s_4', 'iPhone_5_black', 'iPhone_5_s_gold', 'iPhone_5_white'];
        this.$phone = null;
        this.init();

    }

    Plugin.prototype = {

        init: function() {
            this.animateCount = 0;
            var elem = this.element;
            $(elem).css('background', 'url("images/shining_' + this.getRandomInt(0, 9) + '.jpg") no-repeat')
                .css('background-size', '1500px 1000px');
            var $phone = $('<div id="shiningPhone"></div>');
            var matchedPhones = [];

            var _this = this;
            this.allPhones.forEach(function(phone) {
                if (phone.toUpperCase().indexOf(_this.settings.phone.toUpperCase()) != -1) {
                    matchedPhones.push(phone);
                }
            });
            if (matchedPhones.length === 0) {
                matchedPhones = this.allPhones;
            }

            var phone = matchedPhones[this.getRandomInt(0, matchedPhones.length - 1)];
            $phone.css('background', 'url("images/' + phone + '.png") no-repeat')
                .css('width', '234px')
                .css('height', '483px')
                .css('background-size', '100% 100%')
                .css('position', 'absolute')
                .css('left', '0')
                .css('right', '0')
                .css('margin', '250px 590px')
                .appendTo(elem);
            this.$phone = $phone;
            this.tilt($phone);
        },

        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        tilt: function($phone) {
            $('#tiltStyle_' + (this.animateCount - 1)).remove();
            var rotateXStart = this.getRandomRotate('x');
            var rotateYStart = this.getRandomRotate('y');
            var rotateXMiddle = this.getRandomRotate('x');
            var rotateYMiddle = this.getRandomRotate('y');
            var rotateXEnd = this.getRandomRotate('x');
            var rotateYEnd = this.getRandomRotate('y');
            var tilt = '0%{ ' + this.setRotate(0) + '; }' +
                '10%{ ' + this.setRotate(rotateXStart + rotateYStart) + '; }' +
                '40%{ ' + this.setRotate(rotateXMiddle + rotateYMiddle) + '; }' +
                '80%{ ' + this.setRotate(rotateXEnd + rotateYEnd) + '; }' +
                '100%{ ' + this.setRotate(0) + '; }';
            var animateName = 'tilt_' + this.animateCount;
            var style = '@keyframes ' + animateName + ' {' + tilt + '}';
            var prefixedStyle = this.prefixCss(style);
            var $style = $('<style id="tiltStyle_' + this.animateCount + '"">' + prefixedStyle + '</style>').appendTo('head');
            this.animateCount++;
            $phone.css('animation', animateName + ' ' + this.settings.animateTime + 's');
            var _this = this;
            $phone.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(event) {
                $phone.css('animation', '');
                if (_this.settings.infinite) {
                    _this.tilt($phone);
                }

            });
        },
        getRandomRotate: function(axis) {
            return 'perspective(500px) rotate' + axis.toUpperCase() + '(' + this.getRandomInt(-80, 80) + 'deg)';
        },
        setRotate: function(ratation) {
            return 'transform: ' + ratation;
        },
        prefixCss: function(cssRule) {
            cssRules = [];

            if (cssRule.indexOf('transform') != -1) {
                cssRules.push(cssRule.replace(/transform/g, '-webkit-transform'));
                cssRules.push(cssRule.replace(/transform/g, '-moz-transform'));
                cssRules.push(cssRule.replace(/transform/g, '-o-transform'));
                cssRules.push(cssRule);
            }

            if (cssRule.indexOf('@keyframes') != -1) {
                cssRules[0] = cssRules[0].replace(/@keyframes/g, '@-webkit-keyframes');
                cssRules[1] = cssRules[1].replace(/@keyframes/g, '@-moz-keyframes');
                cssRules[2] = cssRules[2].replace(/@keyframes/g, '@-o-keyframes');
            }

            var cssRulesString = '';
            cssRules.forEach(function(prefixedCssRule) {
                cssRulesString += prefixedCssRule + ' ';
            });

            return cssRulesString;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // Preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_ " + pluginName)) {
                $.data(this, "plugin_ " + pluginName, new Plugin(this, options));
            }
        });

        // Chain jQuery functions
        return this;
    };

})(jQuery, window, document);