<template>
  <div id="chat">
    <div id="dialog">
      Content of {{ activeTabTitle }}
      <button
        class="resizeButton"
        @click="resize"
      >~</button>
      <button @click="togglePlayersList">players</button>
      {{ debug }}
      <div id="content">
        <p
          v-for="(msg, mI) in activeTabContent"
          :key="mI"
          class="msg"
        >{{msg}}</p>
      </div>
      <div id="chatOptions">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activateTab(index)"
          v-bind:class="{active: index===activeTab}"
        >{{tab.title}}</button>
        <br>
        <input
          type="text"
          placeholder="msg"
          v-model="msg"
        >
        <button @click="send">Send</button>
      </div>
      <div id="playersList">
        <nuxt-link
          v-for="p in playersList"
          :key="p._id"
          v-bind:to="'./view/'+p._id"
        >
          {{ p.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import io from "~/plugins/socket.io.js";
import requester from "~/components/request-cfg";

export default {
  props: ["guildName", "cityName"],

  data() {
    return {
      msg: "",
      debug: "",
      url: requester.urlWs(),
      tabs: [],
      activeTab: 0, //index of tabs
      expanded: true,
      contentDOM: {},
      players: []
    };
  },
  computed: {
    playersList: function() {
      return this.players;
    },
    activeTabTitle: function() {
      if (this.tabs.length > 0) {
        return this.tabs[this.activeTab].title;
      } else {
        return "";
      }
    },
    activeTabContent: function() {
      if (this.tabs.length > 0) {
        return this.tabs[this.activeTab].content;
      } else {
        return [];
      }
    }
  },
  mounted: function() {
    this.prepareTabs();
    this.contentDOM = document.getElementById("content");
    this.resize();
  },
  methods: {
    togglePlayersList: function() {},
    resize: function() {
      console.log(
        "disp: " +
          document.getElementsByClassName("resizeButton")[0].offsetParent +
          " :::::::::::::::: "
      );
      if (
        document.getElementsByClassName("resizeButton")[0].offsetParent !== null
      ) {
        this.contentDOM.style.height = this.expanded ? "10vh" : "65vh";
        this.expanded = !this.expanded;
      }
    },
    activateTab: function(tabIndex) {
      this.activeTab = tabIndex;
    },
    prepareTabs: function() {
      this.tabs.push({
        title: "Location", //btn title
        socket: io(this.url + "location"), //socket of namespace
        content: [] //received msgs
      });
      this.tabs.push({
        title: this.guildName,
        socket: io(this.url + this.guildName),
        content: []
      });
      this.tabs.push({
        title: this.cityName,
        socket: io(this.url + this.cityName),
        content: []
      });
      var t = this;
      this.tabs
        .filter(tab => tab.title === "Location")
        .forEach(locationTab => {
          locationTab.socket.on("list", msg => {
            console.log("playersList");
            // console.table(msg);
            t.players = msg;
          });
          locationTab.socket.on("new-player", msg => {
            console.log("new-player");
            // console.table(msg);
            t.players.push(msg);
          });
        });
      this.tabs.forEach(tab => {
        tab.socket.on("msg", function(m) {
          // console.log(t);
          var id = this.id;
          t.tabs
            .filter(innerTab => innerTab.socket.id === id)
            .map(item => item.content)[0]
            .push(m.name + ": " + m.msg);
          // console.table(this.id);
        });
      });
    },
    send: function() {
      this.tabs[this.activeTab].socket.emit("msg", this.msg, () => {
        //push msg to local chat only when delivered to all users!
        this.tabs[this.activeTab].content.push(this.msg);
        this.msg = "";
      });
      // console.table(e);
      // socket;
      console.log(this.msg);
      // alert(this.msg);
    }
  }
};
</script>

<style>
#chat {
  right: 0px;
  bottom: 0px;
  width: 30vw;
}

@media only screen and (max-width: 920px) {
  #content {
    height: 75vh;
  }
  #chatOptions {
    height: 25vh;
    width: 100%;
  }
  .resizeButton {
    display: none;
  }
}

#content {
  display: block;
  /* border: 1px solid green; */
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);
}
.msg {
  border-bottom: 1px solid #888;
}
button {
  border: 1px solid gray;
  background-color: aliceblue;
  color: #000;
  padding: 3px;
  min-width: 26px;
  min-height: 30px;
}
.active {
  background-color: #000;
  color: #fff;
}
input {
  border: 1px solid rgb(68, 41, 30);
  padding: 10px 5px;
}
#dialog {
  box-sizing: border-box;
  width: 100%;
  /* border: 3px solid purple; */
}
#dialog,
#playersList {
  width: 100vw;
  display: inline-block;
}
</style>
