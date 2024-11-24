import React from 'react';
import { FaTerminal, FaNetworkWired, FaCog, FaPowerOff } from 'react-icons/fa';

// פונקציה ליצירת כפתור מעוצב
const createButton = ({ onClick, label, icon: Icon }) => (
    <div className="flex flex-col items-center justify-center p-4">
        <button
            onClick={onClick}
            className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center"
        >
            <Icon className="text-white text-2xl" />
        </button>
        <span className="mt-2 text-gray-700 text-sm font-semibold">{label}</span>
    </div>
);

// פונקציה לחיבור SSH
export const SSHButton = ({ host, username, password, onOutput }) => {
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/connect-ssh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, username, password }),
            });
            const result = await response.json();
            onOutput(result.output || 'SSH Connected Successfully');
        } catch (error) {
            onOutput('Error connecting to SSH: ' + error.message);
        }
    };

    return createButton({ onClick: handleClick, label: 'SSH', icon: FaTerminal });
};

// פונקציה לחיבור Telnet
export const TelnetButton = ({ host, port, onOutput }) => {
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/connect-telnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, port }),
            });
            const result = await response.json();
            onOutput(result.output || 'Telnet Connected Successfully');
        } catch (error) {
            onOutput('Error connecting to Telnet: ' + error.message);
        }
    };

    return createButton({ onClick: handleClick, label: 'Telnet', icon: FaNetworkWired });
};

// פונקציה לחיבור CLI
export const CLIButton = ({ host, username, password, onOutput }) => {
    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/connect-cli', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, username, password }),
            });
            const result = await response.json();
            onOutput(result.output || 'CLI Connected Successfully');
        } catch (error) {
            onOutput('Error connecting to CLI: ' + error.message);
        }
    };

    return createButton({ onClick: handleClick, label: 'CLI', icon: FaCog });
};

// פונקציה לכיבוי/הדלקה
export const PowerButton = ({ isOn, onToggle }) => {
    const handleClick = () => {
        const newState = !isOn;
        onToggle(newState);
    };

    return createButton({
        onClick: handleClick,
        label: isOn ? 'Turn Off' : 'Turn On',
        icon: FaPowerOff,
    });
};
