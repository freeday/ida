import $ from 'jquery'
import browser from 'bowser'
import 'overlayscrollbars/js/jquery.overlayScrollbars.js'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import './js/validate'
import './js/selectron'
import './scss/main.scss'

$(window).on('load', function () {
  $('#menu').on('click', function(e){
    e.stopPropagation()
    $('.nav').toggleClass('open')
  })
  var $form = $('form')
  var $input = $('#fi')
  if (browser.name !== 'Safari') {
    let $selects = $('select').selectron()
    $('body').on('click', function(){
      $selects.each(function(i, el){
        let $el = $(el)
        if ($el.data().listElem.hasClass('open')) $(el).trigger('click')
      })
    })
  }
  $input.on('input', function() {
    let $el = $(this)
    let val = $el.val().toUpperCase()
    $el.val(val)
  })
  $('#btnSbmt').on('click', function(e) {
    e.preventDefault()
    if ($form.validateForm()) {
      $(this).off()
      $input.off()
      $form.submit()
    }
  })
});
