import { input$, output$ } from "./engine.js";
import { settings } from "../roms/carnival.json";
import { sendCommand } from "./client";
import Pusher from "pusher-js";
import {
  Channels,
  Events,
  BroadcastMessage,
  KEY,
  CLUSTER,
} from "../lib/pusher.core";

const commandLine = document.getElementById("command_line");
const form = document.getElementById("form");
const log = document.getElementById("console");
const pre = document.getElementById("prepend");
const image = document.getElementById("image");

if (image) {
  const src = settings["background-url"];
  (image as HTMLImageElement).src = src;
}

if (pre) {
  pre.innerText = settings.prepend;
}

var pusher = new Pusher(KEY, { cluster: CLUSTER });

var channel = pusher.subscribe(Channels.BROADCAST);
channel.bind(Events.MESSAGE, function (data: BroadcastMessage) {
  output$.write(data.message);
});

sendCommand("ping").then((x) => {
  output$.write(x);
});

const getCommandLineValue = () => {
  if (commandLine) {
    return (commandLine as HTMLInputElement).value.trim().toLowerCase();
  }
};

const setCommandLineValue = (text) => {
  if (commandLine) {
    (commandLine as HTMLInputElement).value = text;
  }
};

const logText = (x) => {
  let p = document.createElement("p");
  p.innerText = x;
  if (log) {
    log.appendChild(p);
  }
};

const smoothScrollWindow = (px) => {
  window.scrollBy({
    top: px, // could be negative value
    left: 0,
    behavior: "smooth",
  });
};

if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();

    // get input
    let input = getCommandLineValue();

    // send input to engine
    input$.write(input);

    // set command line empty
    setCommandLineValue("");
  };
}

output$.each((x) => {
  // print the output
  logText(x);

  // scroll the window up to accomodate for new text
  smoothScrollWindow(500);
});
