let globalParent;
const componentContext = new Map();

export class Subject {
    constructor(value) {
        this.value = value;
        this.subcribers = [];
    }
    subcribe(callback) {
        this.subcribers.push(callback);
    }
    next(value) {
        this.value = value;
        this.subcribers.forEach((callback) => callback(value));
    }
}

export function render(component, props, parent) {
    globalParent = parent;
    useParent(() => {}); // TODO WHY?
    const html = component(props);
    parent.innerHTML = html;
    const context = componentContext.get(parent);
    if (context && context.callback) {
        context.callback();
    }
}

export function useParent(callback) {
    ((parent) => {
        componentContext.set(parent, {
            callback: () => callback(parent),
        });
    })(globalParent);
}
