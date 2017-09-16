;(function() {
  const module = {
    init: function() {
      const self = this;
      chrome.storage.sync.get({position: 'right', status: 'on'}, function(items) {
        self.position = items.position;
        self.status = items.status;
        if (self.status != 'on') {
          self.removeMarisa();
          return;
        }
        self.renderMarisa();
      });
    },
    renderCSS: function(dom, css) {
      const self = this;
      let style = '';
      const oldStyle = dom.getAttribute('style');
      for (let key of Object.keys(css)) {
        const name = key;
        const value = css[name];
        style += `${name}: ${value};`
      }
      dom.setAttribute('style', !!oldStyle ? oldStyle + ';' + style : style);
    },
    createCanvas: function(className, width, height, css) {
      const self = this;
      const canvas = document.createElement('canvas');
      canvas.classList.add(className);
      canvas.height = height;
      canvas.width = width;
      self.renderCSS(canvas, css);
      return canvas;
    },
    createImage: function(src, onload) {
      const self = this;
      const image = new Image();
      image.onload = function() {
        onload(image);
      };
      image.src = src;
    },
    createStyle: function() {
      const self = this;
      let style = {
        'position': 'fixed',
        'bottom': '0',
        [self.position]: '0',
        'border': 'none',
        'opacity': '.6',
        'pointer-events': 'none',
        'width': '162px',
        'height': '298px',
        'z-index': '9999',
      };
      if (self.position === 'left') {
        style['transform'] = 'rotateY(180deg)';
      }
      return style;
    },
    renderMarisa: function() {
      const self = this;
      const imageData = chrome.extension.getURL('resource/marisa.png');;
      const style = self.createStyle();
      const Marisa = self.createCanvas('chrome-extension-marisa', 162, 298, style);
      self.createImage(imageData, function(MarisaImage) {
        Marisa.getContext('2d').drawImage(MarisaImage, 0, 0, 166, 303);
      });
      self.removeMarisa();
      setTimeout(function() {
        document.body.append(Marisa);
      }, 0);
    },
    removeMarisa: function() {
      document.querySelector('.chrome-extension-marisa') && document.querySelector('.chrome-extension-marisa').remove();
    }
  }
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    module.init();
  });
  module.init();
})()