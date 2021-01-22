export default class Listener {
    
    $$listeners = {};

    on(eventType, handler){
        let group = this.$$listeners[eventType];
        if(!group) {
            this.$$listeners[eventType] = [];
            group = this.$$listeners[eventType];
        }
        group.push(handler);
    }

    off(eventType, handler) {
        let group = this.$$listeners[eventType];
        if(!group) {
            return false;
        }
        let index = this.$$listeners[eventType].indexOf(handler);
        if(index > -1) {
            return this.$$listeners.splice(index, 1);
        }
        return false;
    }

    emit(eventType, data) {
        let group = this.$$listeners[eventType];
        if(!group) {
            return;
        }
        group.forEach(listener => listener(data));
    }
}