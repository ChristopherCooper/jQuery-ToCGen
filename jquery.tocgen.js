(function ( $ ) {
  $.fn.table_of_contents = function (list_type){
    if (typeof list_type == 'undefined')
      list_type = 'ol';

    toc = '';
    level = 1;
    count = 1;
    $(this).find('h1, h2, h3, h4, h5, h6').each(function(){
      var $$ = $(this);
      text = $$.text();
      current_level = parseInt($$.prop("tagName").substring(1));

      if (current_level == 1)
        return;

      if (current_level > level)
      {
        if (current_level > level + 1)
          for (i = level + 1; i < current_level; i++)
            toc += '<'+list_type+'><li>'+(i != current_level ? ' - ' : '');
        toc += '<'+list_type+'>';
      }
      else if (current_level == level)
      {
        toc += '</li>';
      }
      else if (current_level < level)
      {
        for (i = level; i > current_level; i--)
          toc += '</li></'+list_type+'>';
      }
      display_text = text.replace(/^[0-9.\s]+/,'');
      id = count+'-'+display_text.toLowerCase().replace(/[^a-zA-Z]+/g, '-').replace(/^[\-]+|[\-]+$/, '');
      $$.append(' <small><a id="'+id+'" href="#'+id+'">#</a></small>');
      toc += '<li><a href="#'+id+'">'+display_text+'</a>';

      level = current_level;
      count++;
    });
    return '<div id="table_of_contents">'+toc+'</div>';
  };
}( jQuery ));
