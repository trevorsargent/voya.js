import { places, messages, defaultPlayer } from "../../roms/carnival.json";
import {
  describeNeighborhood,
  describeHash,
  glue,
  addArticle,
  templateString,
} from "./narative";
import {
  findPlaceFromName,
  hashRemove,
  hashAdd,
  hashHasItems,
} from "./operative";
import { locationIsAccessable, hasPassiveAccess } from "./logic";

let player = {
  currentLocation: findPlaceFromName(
    defaultPlayer.settings.startingPlace,
    places
  ),
  height: defaultPlayer.height,
  pockets: defaultPlayer.pockets,
  locationHistory: [],
};

export const welcome = () => {
  return messages.welcomeText;
};

export const describePlayerLocation = () => {
  return describeNeighborhood(player.currentLocation, places);
};

export const help = () => {
  return messages.helpText;
};

export const inventory = () => {
  return describeHash(player.pockets);
};

export const items = (): string => {
  player.currentLocation.items = player.currentLocation.items || {};
  if (hashHasItems(player.currentLocation.items)) {
    return describeHash(player.currentLocation.items);
  }
  return messages.itemsError;
};

export const describeNewPlayerLocation = (): string => {
  if (player.locationHistory.indexOf(player.currentLocation.name) === -1) {
    if (player.currentLocation.messages) {
      return player.currentLocation.messages.newText || "";
    }
  }
  return "";
};

export const move = (placeName): string => {
  let neededPassiveKey = false;
  const place = findPlaceFromName(placeName, places);
  if (!locationIsAccessable(places, player.currentLocation, place)) {
    return messages.moveError;
  }

  place.settings = place.settings || {};
  if (place.settings.passiveKey) {
    if (hasPassiveAccess(place, player)) {
      neededPassiveKey = true;
    } else {
      return place.messages.passiveKeyFailure;
    }
  }

  player.locationHistory.push(player.currentLocation.name);

  player.currentLocation = place;
  return glue(
    neededPassiveKey ? place.messages.passiveKeySuccess : "",
    messages.moveMessage + place.name,
    describePlayerLocation(),
    describeNewPlayerLocation()
  );
};

export const drop = (item) => {
  player.currentLocation.items = player.currentLocation.items || {};
  if (item in player.pockets) {
    hashRemove(player.pockets, item);
    hashAdd(player.currentLocation.items, item);
    return messages.dropSuccess + addArticle(item);
  }
  return messages.dropError + addArticle(item);
};

export const take = (item) => {
  player.currentLocation.items = player.currentLocation.items || {};
  if (item in player.currentLocation.items) {
    hashAdd(player.pockets, item);
    hashRemove(player.currentLocation.items, item);
    return messages.takeSuccess + addArticle(item);
  }
  return messages.takeError + addArticle(item);
};

export const exchange = (item) => {
  player.currentLocation.exchanges = player.currentLocation.exchanges || {};
  if (item in player.currentLocation.exchanges) {
    const newItem = player.currentLocation.exchanges[item];
    hashAdd(player.pockets, newItem);
    hashRemove(player.pockets, item);
    return templateString(messages.exchangeSuccess, item, newItem);
  }
  return messages.exchangeFailure;
};

export const inputError = () => {
  return messages.commandInvalid;
};

export const unlock = () => {
  player.currentLocation.isLocked = false;
};
