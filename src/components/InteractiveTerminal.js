import React, { useState, useRef, useEffect } from 'react';
import TechIcon from './TechIcon';
import { interactiveTerminalCommands } from '../data/portfolioData';

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: "Laravel Artisan CLI v11.x (PHP 8.3) - Logeshwaran's Environment" },
    { type: 'system', text: "Type 'help' or click the quick command pills below to explore." },
    { type: 'command', text: 'artisan about' },
    ...interactiveTerminalCommands['artisan about'].map((t) => ({ type: 'output', text: t }))
  ]);

  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState(['artisan about']);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const newHistory = [...history, { type: 'command', text: cmdStr }];

    if (interactiveTerminalCommands[trimmed]) {
      const lines = interactiveTerminalCommands[trimmed];
      lines.forEach((line) => {
        newHistory.push({ type: 'output', text: line });
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `Command '${cmdStr}' not recognized. Type 'help' to see available commands.`
      });
    }

    setHistory(newHistory);
    setCmdHistory((prev) => [cmdStr, ...prev]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickPills = [
    'artisan about',
    'artisan skills',
    'artisan projects',
    'artisan route:list',
    'artisan tinker',
    'artisan contact',
    'clear'
  ];

  return (
    <div className="terminal-wrapper">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-window-buttons">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title">
            <TechIcon name="FaTerminal" size={12} className="mr-2" />
            <span>logesh@dev-server: ~/portfolio_nexerp</span>
          </div>
          <div className="terminal-meta-tag">PHP 8.4 • Laravel 11</div>
        </div>

        {/* Terminal Quick Command Pills */}
        <div className="terminal-quick-actions">
          <span className="quick-label">Try commands:</span>
          <div className="quick-pill-list">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => executeCommand(pill)}
                className="terminal-pill-btn"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line terminal-${item.type}`}>
              {item.type === 'command' && (
                <span className="terminal-prompt-prefix">
                  <span className="prompt-user">logesh</span>
                  <span className="prompt-at">@</span>
                  <span className="prompt-host">laravel-cli</span>
                  <span className="prompt-dollar">$ </span>
                </span>
              )}
              {item.type === 'output' && <span className="output-bullet">› </span>}
              <span className="terminal-text">{item.text}</span>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="terminal-active-line">
            <span className="terminal-prompt-prefix">
              <span className="prompt-user">logesh</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">laravel-cli</span>
              <span className="prompt-dollar">$ </span>
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              placeholder="type a command, e.g. artisan route:list..."
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
