console.log('runnning script');
window.onbeforeunload = () => {
  const currentSession = JSON.parse(localStorage.getItem('currentSession'));
  if (!currentSession) throw Error('No current session');
  else {
    chrome.runtime.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
      message: 'store-session-data',
      sessionData: {
        sessionId: currentSession.id,
        token: localStorage.getItem('token'),
      },
    });
  }
};
