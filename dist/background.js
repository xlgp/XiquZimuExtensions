(function () {
	'use strict';

	chrome.runtime.onInstalled.addListener(e=>{console.log(e);});chrome.action.onClicked.addListener(e=>{console.log(e),e.id&&chrome.tabs.sendMessage(e.id,{key:"create",value:""});});chrome.runtime.onMessage.addListener((e,o,n)=>{console.log(e);});

})();
