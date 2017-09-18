;(function() {
  chrome.storage.sync.get({position: 'right', status: 'on', opacity: '0.6'}, (items) => {
    const initMarisa = () => {
      chrome.tabs.getSelected(null, (tab) => {
        chrome.tabs.sendRequest(tab.id, {reRender: true});
      });
    };
    const initView = () => {
      const position = items.position;
      const status = items.status;
      const opacity = items.opacity;
      document.querySelector(`input[name=status][value=${status}]`).setAttribute('checked', 'checked');
      document.querySelector(`input[name=position][value=${position}]`).setAttribute('checked', 'checked');
      document.querySelector(`input[name=opacity]`).value = opacity;
    };
    const listener = () => {
      document.querySelector('.J_save').addEventListener('click', () => {
        let status = document.querySelector(`input[name=status]:checked`).value;
        let position = document.querySelector(`input[name=position]:checked`).value;
        let opacity = document.querySelector('input[name=opacity]').value;
        console.log(opacity);
        chrome.storage.sync.set({status, position, opacity}, () => {
          initMarisa();
        });
      }, false);
    };
    initMarisa();
    initView();
    listener();
  });
})()