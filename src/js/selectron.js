import $ from 'jquery'

$.fn.selectron = function() {
  let selectrons = []
  let curIdx = null
  let $selectrons = $()

  function makeItem(options) {
    let idx = options.idx
    return $('<div></div>')
      .addClass(options.className + ' ' + (options.selected || ''))
      .css({width: options.width, height: options.height})
      .html(options.content)
      .attr({'data-idx': idx})
      .data({relativeElem: options.el, idx: idx})
      .appendTo(options.parent)
  }

  this.each(function(idx, el) {
    let $el = $(el)
    let $parent = $el.parent()
    let w = $el.outerWidth()
    let h = $el.outerHeight()
    let pos = $el.position()
    let $selectron = $('<div></div>')
    let $selectronOptionContainer = $('<div></div>')

    selectrons.push($selectron.data({idx: idx}))
    $selectrons = $selectrons.add($selectron)

    $el
      .children()
      .each(function(ind, elem) {
        let $elem = $(elem)
        $(elem).data({idx: ind})

        let item = makeItem({
          width: w,
          height: h - 20,
          className: 'list-item',
          content: $elem.html(),
          parent: $selectronOptionContainer,
          idx: ind,
          selected: $elem.attr('selected'),
          el: $elem
        })
    })

    $selectron.on('click', function (e) {
      e.stopPropagation()
      let data = $selectron.data()
      if (data.idx !== curIdx) {
        selectrons.forEach(function(el, i) {
          let $elem = $(el).data().listElem
            $elem.removeClass('open')
        })
        data.listElem.addClass('open')
        curIdx = data.idx
      } else {
        data.listElem.removeClass('open')
        curIdx = null
      }
    })

    $selectronOptionContainer
      .addClass('list')
      .css({
        position: 'absolute',
        top: pos.top + h,
        left: pos.left - 1,
        width: w,
        height: '154px',
        overflow: 'hidden'
      })
      .appendTo($parent)

    $selectronOptionContainer.overlayScrollbars({ });

    $selectron
      .css({
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        width: w,
        height: h,
        cursor: 'pointer'
      })
      .data({listElem: $selectronOptionContainer})
      .appendTo($parent)


    $selectronOptionContainer.on('click', function(e) {
      e.stopPropagation()
      curIdx = null
      let $target = $(e.target)
      $target
        .parent()
        .find('.selected')
        .removeClass('selected')
        .end()
        .end()
        .addClass('selected')

      selectrons.forEach(function(el, i) {
        $(el).data().listElem.removeClass('open')
      })

      $el
        .children()
        .each(function(ind, elem) {
          let $elem = $(elem)
          $elem.attr('selected', false)
          if ($target.data().idx === $elem.data().idx) {
            $elem.attr('selected', true)
          }
        })
    })
  })
  return $selectrons
}
