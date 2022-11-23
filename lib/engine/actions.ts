import { sanitize } from "./operative";

export enum ActionType {
  EMPTY = "empty",
  HELP = "help",
  OBSERVE = "observe",
  INVENTORY = "inventory",
  ITEMS = "stock",
  EXCHANGE = "exchange",
  MOVE = "move",
  TAKE = "take",
  DROP = "drop",
  ERROR = "error",
  WELCOME = "welcome",
}

export interface Action {
  type: ActionType;
  subject?: string;
}

export const build = (string: string): Action => {
  if (string === "") {
    return {
      type: ActionType.EMPTY,
    };
  }
  if (string.indexOf("help") > -1) {
    return {
      type: ActionType.HELP,
    };
  }
  if (string.indexOf("welcome") > -1) {
    return {
      type: ActionType.WELCOME,
    };
  }
  if (string.indexOf("look around") > -1) {
    return {
      type: ActionType.OBSERVE,
    };
  }
  if (string.indexOf("pockets") > -1) {
    return {
      type: ActionType.INVENTORY,
    };
  }
  if (string.indexOf("items") > -1) {
    return {
      type: ActionType.ITEMS,
    };
  }
  if (string.indexOf("walk") > -1) {
    string = sanitize("walk")(string);
    return {
      type: ActionType.MOVE,
      subject: string,
    };
  }
  if (string.indexOf("take") > -1) {
    string = sanitize("take")(string);
    return {
      type: ActionType.TAKE,
      subject: string,
    };
  }
  if (string.indexOf("drop") > -1) {
    string = sanitize("drop")(string);
    return {
      type: ActionType.DROP,
      subject: string,
    };
  }
  if (string.indexOf("exchange") > -1) {
    string = sanitize("exchange")(string);
    return {
      type: ActionType.EXCHANGE,
      subject: string,
    };
  }
  return {
    type: ActionType.ERROR,
  };
};
