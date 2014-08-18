$(function() {
  $('#signin').click(function(e) {
    e.preventDefault();
    navigator.id.request();
  });

  $('#signout').click(function(e) {
    e.preventDefault();
    navigator.id.logout();
  });

  navigator.id.watch({
    loggedInUser: user_email,
    onlogin: function(assertion) {
      $.post('/auth/login', {
        assertion: assertion
      }, function() {
        window.location.reload();
      }).fail(function() {
        window.location.href = '/unauthorized';
      });
    },
    onlogout: function() {
      $.post('/auth/logout', function() {
        window.location.reload();
      });
    }
  });
});
