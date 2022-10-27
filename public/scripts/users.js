/* --- On document load listener --- */
$(() => {
  /* --- Listener to load profile page --- */
  $('.load-profile').on('click', () => {
    $.get('/users/profile')
      .catch(err => console.log(err));
  });
});
