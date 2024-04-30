// observer.js
class Observer {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
  
    unsubscribe(subscriber) {
      this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }
  
    notify(message) {
      this.subscribers.forEach(subscriber => subscriber.update(message));
    }
  }
  
  class Subscriber {
    constructor(userId) {
      this.userId = userId;
    }
  
    update(message) {
      console.log(`User ${this.userId} received: ${message}`);
      // You can add additional logic here, e.g., sending notifications or emails
    }
  }
  
  module.exports = { Observer, Subscriber };