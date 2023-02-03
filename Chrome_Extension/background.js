chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.data);
    // request.data will contain "Hello from content script"
  });
