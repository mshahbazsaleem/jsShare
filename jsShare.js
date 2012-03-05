(function($) {
    $.fn.extend({
        jsShare: function(options) {
            var settings = $.extend({
                minwidth: 40,
                maxwidth: 250,
                animate: true,
                speed: 1000,
                initialdisplay: 'compact',
                facebook: true,
                twitter: true,
                digg: true,
                reddit: true,
                stumbleupon: true,
                messenger: true,
                delicious: true,
                linkedin: true,
                googlebuzz: true,
                yoursitetitle: '',
                yoursiteurl: '',
                yoursitename: '',
                desc: ''
            }, options);
            return this.each(function() {
                var container = $(this);
                container.addClass('social-media-share');
                var inner = $('<div/>').addClass('inner');
                container.append(inner);
                var buttons = $('<ul/>');
                container.append(buttons);
                var tooltip = $('<div/>').addClass('social-media-share-tooltip');
                container.before(tooltip);
                var mediaSource = ["http://www.facebook.com/share.php?u={ADDRESS}",
                                     "http://twitter.com/home?status={TITLE}{ADDRESS}",
                                     "http://delicious.com/save?url={ADDRESS}&amp;title={TITLE}",
                                     "http://www.stumbleupon.com/submit?url={ADDRESS}&amp;title={TITLE}",
                                     "http://digg.com/submit?url={ADDRESS}&amp;title={TITLE}",
                                     "http://reddit.com/submit?url={ADDRESS}",
                                     "http://www.google.com/reader/link?url={ADDRESS}&title={TITLE}&snippet={SDESCRIPTION}&srcURL={BLOGURL}&srcTitle={BLOGTITLE}",
                                     "http://www.linkedin.com/shareArticle?mini=true&url={ADDRESS}&title={TITLE}&summary={SDESCRIPTION}&source={BLOGNAME}",
                                     "http://profile.live.com/badge?url={ADDRESS}"];

                function getButton(index, button, title) {
                    var link = mediaSource[index].replace('{ADDRESS}', encodeURIComponent(location.href))
                                                .replace('{TITLE}', encodeURIComponent(document.title))
                                                .replace('{SDESCRIPTION}', encodeURIComponent(settings.desc))
                                                .replace('{BLOGURL}', encodeURIComponent(settings.yoursiteurl))
                                                .replace('{BLOGTITLE}', encodeURIComponent(settings.yoursitetitle))
                                                .replace('{BLOGNAME}', encodeURIComponent(settings.yoursitename));

                    return $('<li/>').append($('<a/>')
                                                    .attr('href', link)
                                                    .attr('title', title)
                                                    .attr('target', '_blank')
                                                    .append($('<img/>')
                                                    .attr('src', 'images/' + button + '.png')
                                                    .attr('alt', '').css({ width: 16, height: 16, marginTop: 8 })).hover(function() {
                                                        var dummy = $('<div/>').html(title).css('display', 'none');
                                                        container.append(dummy);
                                                        var left = Math.round($(this).offset().left - dummy.width() / 2);
                                                        dummy.remove();
                                                        var b = $(this);
                                                        if (settings.animate)
                                                            b.find('img').stop(false, true).animate({ height: 24, width: 24, marginTop: 0 }, 300);
                                                        tooltip.html(b.attr('title'));
                                                        tooltip.css({ left: left,
                                                            top: function() { return container.offset().top - $(this).height(); }
                                                        }).stop(false, true).fadeIn("slow");

                                                    }, function() {
                                                        if (settings.animate)
                                                            $(this).find('img').stop(false, true).animate({ width: 16, height: 16, marginTop: 8 }, 300);
                                                        tooltip.stop(false, true).fadeOut("slow");

                                                    }));
                }

                $.each(mediaSource, function(index, media) {
                    switch (index) {
                        case 0:
                            if (settings.facebook) buttons.append(getButton(index, 'facebook', 'Share with Facebook')); break;
                        case 1:
                            if (settings.twitter) buttons.append(getButton(index, 'twitter', 'Share with Twitter')); break;
                        case 2:
                            if (settings.delicious) buttons.append(getButton(index, 'delicious', 'Share with Delicious')); break;
                        case 3:
                            if (settings.stumbleupon) buttons.append(getButton(index, 'stumbleupon', 'Share with Stumble Upon')); break;
                        case 4:
                            if (settings.digg) buttons.append(getButton(index, 'digg', 'Share with Digg')); break;
                        case 5:
                            if (settings.reddit) buttons.append(getButton(index, 'reddit', 'Share with Reddit')); break;
                        case 6:
                            if (settings.googlebuzz) buttons.append(getButton(index, 'buzz', 'Share with Gooble Buzz')); break;
                        case 7:
                            if (settings.linkedin) buttons.append(getButton(index, 'linkedin', 'Share with LinkedIn')); break;
                        case 8:
                            if (settings.messenger) buttons.append(getButton(index, 'messenger', 'Share with Live Messenger')); break;
                    }
                });
                if (settings.initialdisplay == 'expanded') {
                    container.css({ width: settings.maxwidth });
                    inner.toggle(function() { container.stop().animate({ width: settings.minwidth }, settings.speed); }, function() { container.stop().animate({ width: settings.maxwidth }, settings.speed); });
                }
                else {
                    container.css({ width: settings.minwidth });
                    inner.toggle(function() { container.stop().animate({ width: settings.maxwidth }, settings.speed); }, function() { container.stop().animate({ width: settings.minwidth }, settings.speed); });
                }
            });
        }
    });
})(jQuery);