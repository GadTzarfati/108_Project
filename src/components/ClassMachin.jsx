import React, { Component } from 'react';
import { FaPowerOff } from 'react-icons/fa';


class Machin extends Component {
    constructor(props) {
        super(props);
        this.state = {isTurnOn: false,};
    }
    togglePower = () => {
        this.setState((prevState) => ({isTurnOn: !prevState.isTurnOn, }));
    };
    renderPowerButton() {
        const { isTurnOn } = this.state;
        return (
            <button onClick={this.togglePower}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center w-10 h-10 ${isTurnOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'}`} >
                <FaPowerOff size={18} className="text-white" /> </button>
        );
    }
}
export default Machin;
