// 获取当前的tabId
function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      resolve(tabs.length ? tabs[0].id : null)
    })
  })
}

chrome.runtime.onInstalled.addListener(function() {
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
      if (menuItemId === 'scanProduct') {
        if (srcUrl) {
          console.log('srcUrl>>', srcUrl)
          console.log('tabId>>', tabId)
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

chrome.runtime.onMessage.addListener(async(request, sender, sendRepoonse) => {
  // switch(request.operation) {
  //   await 
  // }
})