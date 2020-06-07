export default class EventBus {
  constructor() {
    if (!EventBus.events) {
      EventBus.events = new Object();
    }
    this.events = EventBus.events;
  }
  addEventListener(type, func) {
    // if (this.events[type]) {
    //   this.events[type].push(func);
    // } else {
    this.events[type] = func;
    // }
  }
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type](args);
      return;
      // for (let i = 0; i < this.events[type].length; i++) {
      //   this.events[type][i](args);
      // }
    }
    return false;
  }
}
