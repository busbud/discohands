$(function() {
  $('button.upvote').click(function(e) {
    var $this = $(this);
    var $topic = $this.parents('.topic');
    var $score = $this.siblings('.score');

    $.post('/topics/' + $topic.data('topic-id') + '/upvote');

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $score.text(+$score.text() - 1);
    } else {
      $this.addClass('active');
      $score.text(+$score.text() + 1);
    }

    $this.blur();
  });

  $('button.discussed').click(function(e) {
    var $this = $(this);
    var $topic = $this.parents('.topic');
    var $upvote = $topic.find('button.upvote');

    $.post('/topics/' + $topic.data('topic-id') + '/discussed');

    $this.toggleClass('active btn-default btn-info');
    $upvote.toggleClass('disabled');

    $this.blur();
  });
});
