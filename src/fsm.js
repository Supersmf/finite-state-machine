class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        
        if(!config) throw new Error("");
        this.config = config;
        this.state = this.config.initial;
        this.prevState = [];
        this.redoState = [];
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state != "normal" && state != "busy" && 
           state != "hungry" && state != "sleeping") throw new Error("");
        else {
            if(this.prevState[this.prevState.length - 1] != this.state)
                this.prevState.push(this.state);
            this.state = state;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        var temp = this.config.states[this.state].transitions[event];
        this.changeState(temp);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        var obj = this.config.states;
        var arr = Object.getOwnPropertyNames(obj);;
        if(event){
            var newArr = [];
            for(var i = 0; i < arr.length; i++){
                var temp = Object.keys(this.config.states[arr[i]].transitions);
                if(temp.indexOf(event) != -1) newArr[newArr.length] = arr[i];
            }
            return newArr;
        }
        return arr;
            
    }
    
    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prevState.length > 0){
            if(this.redoState.length < this.prevState.length){
                this.redoState.push(this.state);
            }   
            this.state = this.prevState.pop();
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoState.length > 0){
            this.state = this.redoState.pop();
            return true;
        } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState = [];
        this.redoState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
