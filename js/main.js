(function (jQuery) {
  var body = jQuery(document.body || 'body');
  var main = jQuery('main');
  var lb = jQuery('.lightbox');

  var lbContent = lb.find('.lightbox-content').on('scroll', function () {
    lb.toggleClass('scrolled', lbContent.scrollTop() > 10);
  });

  jQuery(document).ready(function () {
    body.addClass('domready');
  });

  jQuery('.cards-montadoras').on('click tap', '.card-montadoras', function () {
    var data = jQuery(this).data();
    var content = jQuery('.info-montadora[data-id="' + data.id + '"]').html();

    lb.find('.lightbox-icon')
      .attr('src', 'img/montadoras/' + data.id + '.png')
      .attr('alt', data.name);

    lb.find('.lightbox-title').text(data.name);
    lbContent.html(content).scrollTop(0);

    setTimeout(function () {
      body.addClass('lightbox-open');
    }, 200);
  });

  jQuery('.lightbox-backdrop, .lightbox-fechar').on('click tap', function () {
    body.removeClass('lightbox-open');
  });

  jQuery('.cabecalho-menu, .menu-fechar').on('click tap', function () {
    body.toggleClass('menu-open', this.className === 'cabecalho-menu');
  });

  jQuery('.menu-backdrop').on('click tap', function () {
    body.removeClass('menu-open');
  });

  jQuery('.menu')
    .on('click tap', '.menu-lista-sublista > a', function (e) {
      e.preventDefault();

      jQuery(this)
        .parent()
        .toggleClass('fechado')
        .siblings()
        .addClass('fechado');
    })
    .on('click tap', '.menu-sublista-link', function (e) {
      if (this.pathname === location.pathname) {
        body.removeClass('menu-open');

        if (!this.hash) {
          e.preventDefault();
          main.scrollTop(0);
        }
      }
    });

  var submit = jQuery('.contato button[type="submit"]');

  jQuery('.contato').on('submit', function (e) {
    var form = this;

    submit.attr('disabled', 'disabled');
    e.preventDefault();

    setTimeout(function () {
      console.log('enviado');

      lb.find('.lightbox-icon')
        .attr('src', 'img/logo-dp6-square.png')
        .attr('alt', 'Logo DP6');

      lb.find('.lightbox-title').text('Contato enviado');
      lbContent.html('Obrigado pelo seu contato!').scrollTop(0);

      setTimeout(function () {
        body.addClass('lightbox-open');

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'view_form_success',
          form_id: form.id || '',
          form_name: form.name || ''
        });

        submit.removeAttr('disabled');
      }, 200);
    }, Math.random() * 2000);
  });

  jQuery(
    '.menu-lista-' +
      location.pathname.split('/').reverse()[0].replace('.html', '')
  )
    .parent()
    .removeClass('fechado');
})(jQuery);

(function () {
  function trackFormStart(event) {
    var form = event.target.form;

    if (!form || form.dataset.formStarted) {
      return;
    }

    form.dataset.formStarted = 'true';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_start',
      form_id: form.id || '',
      form_name: form.name || '',
      form_destination: (form.action || window.location.href).split('#')[0]
    });
  }

  document.addEventListener('input', trackFormStart, true);
  document.addEventListener('change', trackFormStart, true);
})();