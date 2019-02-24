import $ from 'jquery'
import './js/validate'
import './scss/main.scss'

$(window).on('load', function () {
  $('#btnSbmt').on('click', function(e) {
    e.preventDefault()
    if ($form.validateForm()) {
      $(this).off()
      $input.off()
      $form.submit()
    }
  })
});
