var Utils = {

  // create a unique rfc4122 conform UUID
  createUUID: function() {
    var dec2hex = [];
    for (var i=0; i<=15; i++) {
      dec2hex[i] = i.toString(16);
    }

    var uuid = '';
    for (var j=1; j<=36; j++) {
      if (j===9 || j===14 || j===19 || j===24) {
        uuid += '-';
      } else if (j===15) {
        uuid += 4;
      } else if (j===20) {
        uuid += dec2hex[(Math.random()*4|0 + 8)];
      } else {
        uuid += dec2hex[(Math.random()*15|0)];
      }
    }
    return uuid;
  }

};

module.exports = Utils;
