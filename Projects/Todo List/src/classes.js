import {formatDistance, subDays} from 'date-fns';

class Item {
    /**
     * 
     * @param {String} title 
     * @param {String} description 
     * @param {Date} dueDate 
     * @param {Number} priority '
     * @param {Boolean} completed
     */
    constructor(title, description, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    getDateString() {
        return this.dueDate.toLocaleDateString();
    }

    getTimeDue() {
        return this.dueDate.toLocaleTimeString();
    }

    getTimeLeft() {
        return formatDistanceToNow(this.dueDate, {addSuffix: true});
    }
}


class Project {
    /**
     * 
     * @param {String} title 
     * @param {Array} listOfItems 
     */
    constructor(title, listOfItems) {
        this.title = title;
        this.listOfItems = listOfItems;
    }

    addToList(item) {
        this.listOfItems.push(item);
    }

    removeFromList(item) {
        this.listOfItems.splice(this.listOfItems.indexOf(item), 1);
    }
}

export {Item, Project};