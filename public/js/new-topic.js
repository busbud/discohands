$(function() {
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
