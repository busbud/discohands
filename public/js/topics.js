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
      if (!confirm('Unmark this topic as discussed?')) return;
      $.post('/topics/' + topic_id + '/undiscuss', function() {
        $this.removeClass('active btn-info').addClass('btn-default');
        $upvote.removeClass('disabled');
        document.location.reload();
      });
    } else {
      if (!confirm('Mark this topic as discussed?')) return;
      $.post('/topics/' + topic_id + '/discuss', function() {
        $this.addClass('active btn-info').removeClass('btn-default');
        $upvote.addClass('disabled');
        document.location.reload();
      });
    }
  });

  $('#submit').click(function(e) {
    var $title = $('#title');
    var $description = $('#description');

    if (!$title.val() || $title.val().length > 255) {
      $title.parents('.form-group').addClass('has-error');
      e.preventDefault();
    }
    if ($description.val().length > 1024) {
      $description.parents('.form-group').addClass('has-error');
      e.preventDefault();
    }
  });
});
