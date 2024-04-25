class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

class Subscriber {
    constructor(userId) {
        this.userId = userId;
    }

    update(message) {
        console.log(`User ${this.userId} received message: ${message}`);
        // You can add logic here to notify the user or update the UI
    }
}

module.exports = {
    Observer,
    Subscriber
};