const extractQueries = (path) => {
  let temp = path.split('&');
  let result = {};
  const regex = /(?==)\W/g;
  for (let i = 0; i < temp.length; i++) {
    let currIndex = temp[i].search(regex);
    let currKey = temp[i].substring(0, currIndex);
    let currVal = temp[i].substring(currIndex + 1);
    result[currKey] = currVal;
  }

  return result;
};

const existingRequest = (currUsername, friend) => {
  if (friend.requestee.length > 0) {
    for (let i = 0; i < friend.requestee.length; i++) {
      if (friend.requestee[i].username === currUsername) {
        if (friend.requestee[i]?.friendship.requestStatus !== 'approved') {
          return 'Already sent a request';
        } else {
          return 'Already in your friend list!';
        }
      }
    }
  }

  if (friend.requester.length > 0) {
    for (let i = 0; i < friend.requester.length; i++) {
      if (friend.requester[i].username === currUsername) {
        if (friend.requester[i]?.friendship.requestStatus !== 'approved') {
          return 'You have a friend request from them';
        } else {
          return 'Already in your friend list!';
        }
      }
    }
  }
  return false;
};

export { extractQueries, existingRequest };
