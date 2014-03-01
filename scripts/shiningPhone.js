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
            appearTime: 10
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.allPhones = ['galaxy_s_4', 'iPhone_5_black', 'iPhone_5_s_gold', 'iPhone_5_white'];
        this._background = $(element).css('background');
        this._backgroundSize = $(element).css('background-size');

        this.init();

    }

    Plugin.prototype = {

        init: function() {
            var elem = this.element;
            $(elem).css('background', 'url("images/shining_' + this.getRandomInt(0, 9) + '.jpg") no-repeat')
                .css('background-size', '1500px 1000px');
            var $phone = $('<div></div>');
            var matchedPhones = [];

            var _this = this;
            this.allPhones.forEach(function(phone) {
                if (phone.toUpperCase().indexOf(_this.settings.phone.toUpperCase()) != -1) {
                    matchedPhones.push(phone);
                }
            });
            if (matchedPhones.length == 0) {
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
            this.tilt($phone);
            this.$phone = $phone;
        },

        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        tilt: function($phone) {
            var rotateXStart = this.getRandomRotate('x');
            var rotateYStart = this.getRandomRotate('y');
            var rotateXMiddle = this.getRandomRotate('x');
            var rotateYMiddle = this.getRandomRotate('y');
            var rotateXEnd = this.getRandomRotate('x');
            var rotateYEnd = this.getRandomRotate('y');
            $phone.css('transform', rotateX + ' ' + rotateY);
        },
        getRandomRotate: function(axis) {
            return 'perspective(500) rotate' + axis.toUpperCase() + '(' + this.getRandomInt(-90, 90) + 'deg)';
        },
        distroy: function() {
            this.$phone.remove();
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