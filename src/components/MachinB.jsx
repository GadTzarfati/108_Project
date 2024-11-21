import React from 'react';
import Machin from './Machin';
import { FaNetworkWired, FaTerminal, FaExchangeAlt } from 'react-icons/fa';

class MachinB extends Machin {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            telnetConnected: false,
            telnetIp: '',
            telnetPort: '',
            cliCommand: '',
            cliOutput: [],
            sideMachineConnected: false,
            sideMachineData: '',
            sideMachineResponse: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    connectTelnet = async () => {
        const { telnetIp, telnetPort } = this.state;
        try {
            const response = await fetch('http://localhost:5000/api/connect-telnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host: telnetIp, port: telnetPort }),
            });
            const result = await response.json();
            if (result.success) {
                this.setState({ telnetConnected: true });
                this.addToCliOutput('Telnet connection successful.');
            } else {
                this.addToCliOutput('Telnet connection failed: ' + result.error);
            }
        } catch (error) {
            this.addToCliOutput('Error connecting to Telnet: ' + error.message);
        }
    };

    sendCliCommand = async () => {
        const { cliCommand } = this.state;
        if (cliCommand.trim() === '') {
            this.addToCliOutput('No command entered.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/execute-cli', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: cliCommand }),
            });
            const result = await response.json();
            if (result.success) {
                this.addToCliOutput(`> ${cliCommand}`);
                this.addToCliOutput(result.output);
            } else {
                this.addToCliOutput(`Error: ${result.error}`);
            }
        } catch (error) {
            this.addToCliOutput('Error executing CLI command: ' + error.message);
        }
        this.setState({ cliCommand: '' });
    };

    sendDataToSideMachine = async () => {
        const { sideMachineData } = this.state;
        try {
            const response = await fetch('http://localhost:5000/api/side-machine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: sideMachineData }),
            });
            const result = await response.json();
            if (result.success) {
                this.setState({ sideMachineResponse: result.response, sideMachineConnected: true });
                this.addToCliOutput('Data sent to side machine successfully.');
            } else {
                this.addToCliOutput('Side machine communication failed: ' + result.error);
            }
        } catch (error) {
            this.addToCliOutput('Error communicating with side machine: ' + error.message);
        }
    };

    renderCliInterface() {
        const { cliCommand, cliOutput } = this.state;

        return (
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold flex items-center mb-2">
                    <FaTerminal className="mr-2" />
                    CLI Interface
                </h3>
                <div className="overflow-y-auto h-32 mb-2">
                    {cliOutput.map((line, index) => (
                        <p key={index} className="text-sm">{line}</p>
                    ))}
                </div>
                <input
                    type="text"
                    name="cliCommand"
                    value={cliCommand}
                    onChange={this.handleInputChange}
                    placeholder="Enter CLI Command"
                    className="w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={this.sendCliCommand}
                    className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center">
                    <FaTerminal size={16} className="mr-2" />
                    Execute CLI Command
                </button>
            </div>
        );
    }

    renderTelnetInterface() {
        const { telnetConnected, telnetIp, telnetPort, cliCommand, cliOutput } = this.state;

        return (
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold flex items-center mb-2">
                    <FaNetworkWired className="mr-2" />
                    Telnet Interface
                </h3>
                {!telnetConnected ? (
                    <div>
                        <input
                            type="text"
                            name="telnetIp"
                            value={telnetIp}
                            onChange={this.handleInputChange}
                            placeholder="Enter Telnet IP"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="telnetPort"
                            value={telnetPort}
                            onChange={this.handleInputChange}
                            placeholder="Enter Telnet Port"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <button
                            onClick={this.connectTelnet}
                            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                            Connect to Telnet
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="overflow-y-auto h-32 mb-2">
                            {cliOutput.map((line, index) => (
                                <p key={index} className="text-sm">{line}</p>
                            ))}
                        </div>
                        <input
                            type="text"
                            name="cliCommand"
                            value={cliCommand}
                            onChange={this.handleInputChange}
                            placeholder="Enter Telnet Command"
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <button
                            onClick={this.sendCliCommand}
                            className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center">
                            <FaTerminal size={16} className="mr-2" />
                            Execute Telnet Command
                        </button>
                    </div>
                )}
            </div>
        );
    }

    renderSideMachineInterface() {
        const { sideMachineData, sideMachineResponse } = this.state;

        return (
            <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold flex items-center mb-2">
                    <FaExchangeAlt className="mr-2" />
                    Side Machine Interface
                </h3>
                <input
                    type="text"
                    name="sideMachineData"
                    value={sideMachineData}
                    onChange={this.handleInputChange}
                    placeholder="Data to send"
                    className="w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={this.sendDataToSideMachine}
                    className="w-full p-2 bg-purple-500 hover:bg-purple-600 text-white rounded">
                    Send to Side Machine
                </button>
                {sideMachineResponse && (
                    <p className="text-sm mt-2">Response: {sideMachineResponse}</p>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="p-4">
                {super.render()}
                {this.renderTelnetInterface()}
                {this.renderCliInterface()}
                {this.renderSideMachineInterface()}
            </div>
        );
    }
}

export default MachinB;
