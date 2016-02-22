var Reflux = require('reflux');
var Const = require('../../Dashboard/util/Const');

var Actions = Reflux.createActions([
  'connect',
  'disconnect',
  'pause',
  'resume'
]);

var UserStore = Reflux.createStore({

  Actions: Actions,

  device: "26877",

  state: Const.DISCONNECTED,

  mockUser: [
    {
    "id": 0,
    "name": "Jon Doe",
    "descrip": "Jon from above",
    "mail": "jondoe@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg"
    },
    {
    "id": 1,
    "name": "Sally Bond",
    "descrip": "from 3 Etage",
    "mail": "sallymally@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
    },
     {
    "id": 2,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 2,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 3,
    "name": "Ben Looper",
    "descrip": "Ben from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 4,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 5,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 6,
    "name": "Ken Cooper",
    "descrip": "Ken from Barbie",
    "mail": "KenMan@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/soffes/128.jpg"
    },
    {
    "id": 7,
    "name": "Molly Sue Schmidt",
    "descrip": "with blond hairs",
    "mail": "MollyKane@IoT.com",
    "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/mtnmissy/128.jpg"
    }
    ],

  init: function() {
    this.listenTo(Actions.connect, this.onConnect);
    this.listenTo(Actions.disconnect, this.onDisconnect);
    this.listenTo(Actions.pause, this.onPause);
    this.listenTo(Actions.resume, this.onResume);

    this.trigger({state: Const.DISCONNECTED});
  },

  onConnect: function(payload) {
    if (this.state == Const.DISCONNECTED) {
      this.state = Const.CONNECTED;
      this.changeState();
    }
    this.trigger({users:this.mockUser});
  },

  changeState: function() {
    this.trigger({state: this.state});
  },

  onDisconnect: function(payload) {
    this.trigger({state: Const.DISCONNECTED});
  },

  onPause: function(payload) {
    this.trigger({state: Const.PAUSED});
  },

  onResume: function(payload) {
    this.trigger({state: Const.CONNECTED});
  }
});

module.exports = UserStore;
