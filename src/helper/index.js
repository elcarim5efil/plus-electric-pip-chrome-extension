export function sendMessage(params) {
  const { chrome } = window;

  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          params,
          function (...args) {
            resolve(...args)
          });
      });
    } catch(err) {
      reject(err)
    }
  })
}

export function queryStickers() {
  return sendMessage({
    method: 'querySelectorAll',
    param: {
      selector: '.custom_emoji'
    }
  }).then(res => {
    console.log(res)
    return res;
  })
}