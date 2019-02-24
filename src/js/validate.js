import $ from 'jquery'
$.fn.validateForm = function() {
  var globalFlag = true
  this.find(':input').each(function(idx, el) {
    let $el = $(el)
    let $parent = $el.parent()
    let tabIndex = parseInt($el.attr('tabIndex'))
    let value = $el.val()
    let flag = false
    if (tabIndex <= 4) {
      flag = value.length < 4 || !value.match(/^\d+$/)
    }
    if (tabIndex > 4 && tabIndex < 7) {
      flag = isNaN(parseInt(value))
    }
    if (tabIndex === 7) {
      flag = !value.match(/^[A-Za-z]+$/)
    }
    if (tabIndex === 8) {
      flag = value.length < 3 || !value.match(/^\d+$/)
    }
    if (flag) {
      globalFlag = !flag
    }
    $parent.toggleClass('form-input-error', flag)
  });
  return globalFlag
};
