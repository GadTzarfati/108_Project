import React, { useState } from 'react';
import { FaTerminal, FaNetworkWired, FaCog } from 'react-icons/fa';

const MachinB = () => {
    const [activeCommand, setActiveCommand] = useState(null);
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');

    const handleCommand = (type) => {
        setActiveCommand(type);
        setTerminalOutput([`${type} Connected Successfully`]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (currentCommand.toLowerCase() === 'clear') {
                setTerminalOutput([]);
            } else {
                setTerminalOutput((prev) => [...prev, `> ${currentCommand}`]);
            }
            setCurrentCommand('');
        }
    };

    const handleExit = () => {
        setActiveCommand(null);
        setTerminalOutput([]);
        setCurrentCommand('');
    };

    const handleClear = () => {
        setTerminalOutput([]);
    };

    if (activeCommand) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 relative">
                <h2 className="text-xl font-bold mb-4">{activeCommand} Terminal</h2>

                {/* חלון הטרמינל */}
                <div className="w-1/2 h-96 bg-black border border-gray-600 rounded-md p-4 overflow-y-auto font-mono text-sm">
                    {terminalOutput.map((line, index) => (
                        <p key={index} className="text-green-500">{line}</p>
                    ))}
                    <div className="flex">
                        <span className="text-green-500">{'>'}</span>
                        <input
                            type="text"
                            value={currentCommand}
                            onChange={(e) => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full bg-black text-white font-mono outline-none border-none"
                        />
                    </div>
                </div>

                {/* כפתורים */}
                <div className="absolute bottom-4 flex gap-4">
                    <button
                        onClick={handleClear}
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded shadow-lg font-bold"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleExit}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded shadow-lg font-bold"
                    >
                        Exit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white flex flex-col items-center justify-start p-6">
            {/* תמונה של המוצר */}
            <div className="w-3/4 max-w-xl mb-6">
                <img
                    src="https://img.freepik.com/free-photo/low-angle-shot-b-17-bomber-plane-from-wwii-captured-airbase-sunny-day_181624-26344.jpg"
                    alt="Machine B"
                    className="w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
                />
            </div>

            {/* תיאור המוצר */}
            <p className="text-center text-gray-300 mb-6 w-3/4 max-w-xl text-lg transform transition-transform hover:scale-105">
                Control Machine B with SSH, Telnet, and CLI. Manage your operations effectively
                and securely.
            </p>

            {/* כפתורים */}
            <div className="flex gap-8">
                <div
                    onClick={() => handleCommand('SSH')}
                    className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110"
                >
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-lg">
                        <FaTerminal className="text-white text-3xl" />
                    </div>
                    <span className="text-sm text-gray-300 mt-2">SSH</span>
                </div>

                <div
                    onClick={() => handleCommand('Telnet')}
                    className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110"
                >
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-lg">
                        <FaNetworkWired className="text-white text-3xl" />
                    </div>
                    <span className="text-sm text-gray-300 mt-2">Telnet</span>
                </div>

                <div
                    onClick={() => handleCommand('CLI')}
                    className="flex flex-col items-center cursor-pointer transform transition-transform hover:scale-110"
                >
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-lg">
                        <FaCog className="text-white text-3xl" />
                    </div>
                    <span className="text-sm text-gray-300 mt-2">CLI</span>
                </div>
            </div>
        </div>
    );
};

export default MachinB;
