export class Subject {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    next(value) {
        this.value = value;
        this.subscribers.forEach((callback) => {
            callback(value);
        });
    }
}
