import React from 'react';
import Machin from './Machin';
import { FaTerminal } from 'react-icons/fa';

class MachinA extends Machin {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            sshConnected: false,
            ip: '',
            username: '',
            password: '',
            command: '',
            terminalOutput: [],
        };
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    connectSSH = async () => {
        const { ip, username, password } = this.state;
        try {
            const response = await fetch('http://localhost:5000/api/connect-ssh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host: ip, username, password }),
            });
            const result = await response.json();
            if (result.success) {
                this.setState({ sshConnected: true });
                this.addToTerminalOutput('Connected to SSH server successfully.');
            } else {
                this.addToTerminalOutput('Connection failed: ' + result.error);
            }
        } catch (error) {
            this.addToTerminalOutput('Error connecting to SSH: ' + error.message);
        }
    };
    sendCommand = async () => {
        const { command } = this.state;
        if (command.trim() === '') {
            this.addToTerminalOutput('No command entered.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command }),
            });
            const result = await response.json();
            if (result.success) {
                this.addToTerminalOutput(`> ${command}`);
                this.addToTerminalOutput(result.output);
            } else {
                this.addToTerminalOutput(`Error: ${result.error}`);
            }
        } catch (error) {
            this.addToTerminalOutput('Error executing command: ' + error.message);
        }
        this.setState({ command: '' });
    };
    addToTerminalOutput = (message) => {
        this.setState((prevState) => ({
            terminalOutput: [...prevState.terminalOutput, message],
        }));
    };
    renderSSHInterface() {
        const { sshConnected, ip, username, password, command, terminalOutput } = this.state;

        if (!sshConnected) {
            return (
                <button
                    onClick={this.connectSSH}
                    className="absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600">
                    <FaTerminal size={18} className="text-white" />
                </button>
            );
        }
        return (
            <div className="absolute bottom-4 left-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64">
                <div className="overflow-y-auto h-32 mb-2">
                    {terminalOutput.map((line, index) => (
                        <p key={index} className="text-sm">
                            {line}</p>
                    ))}
                </div>
                <input
                    type="text"
                    name="command"
                    value={command}
                    onChange={this.handleInputChange}
                    placeholder="Type a command"
                    className="w-full mb-2 p-2 border rounded" />
                <button onClick={this.sendCommand} className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded">
                    Execute Command
                </button>
            </div>
        );
    }
    render() {
        return (
            <div className="relative">
                {super.render()} 
                {this.renderSSHInterface()}
            </div>
        );
    }
}
export default MachinA;
