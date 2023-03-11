import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

function App() {
  React.useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // 发消息给content
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'SHOW_LOGIN_DIV' } as DOMMessage,
        (response: DOMMessageResponse) => {
          window.close()
        });
    })
  }, []);

  return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>
    </div>
  );
}

export default App;
