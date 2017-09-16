;(function() {
  chrome.storage.sync.get({position: 'right', status: 'on'}, (items) => {
    const initMarisa = () => {
      chrome.tabs.getSelected(null, (tab) => {
        chrome.tabs.sendRequest(tab.id, {reRender: true});
      });
    };
    const initView = () => {
      const position = items.position;
      const status = items.status;
      document.querySelector(`input[name=status][value=${status}]`).setAttribute('checked', 'checked');
      document.querySelector(`input[name=position][value=${position}]`).setAttribute('checked', 'checked');
    };
    const listener = () => {
      document.querySelector('.J_save').addEventListener('click', () => {
        let status = document.querySelector(`input[name=status]:checked`).value;
        let position = document.querySelector(`input[name=position]:checked`).value;
        chrome.storage.sync.set({status, position}, () => {
          initMarisa();
        });
      }, false);
    };
    initMarisa();
    initView();
    listener();
  });
})()