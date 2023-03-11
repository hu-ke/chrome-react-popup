// 获取当前的tabId
function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs.length ? tabs[0].id : null)
    })
  })
}

chrome.runtime.onInstalled.addListener(function() {
  console.log('background.js onInstalled')
  chrome.contextMenus.removeAll(function() {
    // 右键菜单栏
    chrome.contextMenus.create({
      id: 'scanProduct',
      title: 'Search by image',
      contexts: ['all'],
    })

    async function contextClick(info, tab) {
      const { menuItemId, srcUrl } = info
      const tabId = await getCurrentTabId()
      console.log('menuItemId, srcUrl, tabId>>', menuItemId, srcUrl, tabId, info)
      if (menuItemId === 'scanProduct') {
        if (srcUrl) {
          try { 
            await chrome.tabs.sendMessage(tabId, {  type: 'scanClick', srcUrl })
          } catch(e) {
            console.log('errrr',e)
          }
        }else{
          chrome.tabs.sendMessage(tabId, { op: 'commandKeyCrop' })
        }
      }
    }
    chrome.contextMenus.onClicked.addListener(contextClick)
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendReponse) => {
  switch(request.operation) {
    case 'captureVisibleTab':
      chrome.tabs.captureVisibleTab().then(res => {
        sendReponse(res)
      })
      break;
  }
  return true
})