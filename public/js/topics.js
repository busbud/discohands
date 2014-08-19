$(function() {
  $('button.upvote').click(function(e) {
    var $this    = $(this);
    var $topic   = $this.parents('.topic');
    var $score   = $this.siblings('.score');
    var topic_id = $topic.data('topic-id');

    if ($this.hasClass('active')) {
      $.post('/topics/' + topic_id + '/unvote', function() {
        $this.removeClass('active');
        $score.text(+$score.text() - 1);
      });
    } else {
      $.post('/topics/' + topic_id + '/vote', function() {
        $this.addClass('active');
        $score.text(+$score.text() + 1);
      });
    }

    $this.blur();
  });

  $('button.discussed').click(function(e) {
    var $this    = $(this);
    var $topic   = $this.parents('.topic');
    var $upvote  = $topic.find('button.upvote');
    var topic_id = $topic.data('topic-id');

    if ($this.hasClass('active')) {
      $.post('/topics/' + topic_id + '/undiscuss', function() {
        $this.removeClass('active btn-info').addClass('btn-default');
        $upvote.removeClass('disabled');
      });
    } else {
      $.post('/topics/' + topic_id + '/discuss', function() {
        $this.addClass('active btn-info').removeClass('btn-default');
        $upvote.addClass('disabled');
      });
    }

    $this.blur();
  });
});
