const { execSync } = require('child_process');

const portArg = process.argv[2];
const port = portArg || process.env.PORT || '5000';

if (!port) {
  console.error('❌ No port provided. Usage: node scripts/free-port.js <port>');
  process.exit(1);
}

const platform = process.platform;

function info(message) {
  console.log(`[free-port] ${message}`);
}

function getPids() {
  try {
    if (platform === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        stdio: ['ignore', 'pipe', 'ignore'],
        encoding: 'utf8',
      });

      const lines = output
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && line.includes(`:${port}`));

      const pids = new Set();

      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid) {
          pids.add(pid);
        }
      });

      return Array.from(pids);
    }

    // Unix-like systems
    const output = execSync(`lsof -ti :${port}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    });

    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    // No process using the port
    return [];
  }
}

function killPid(pid) {
  try {
    if (platform === 'win32') {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    } else {
      execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
    }
    info(`Killed process ${pid} on port ${port}`);
  } catch (error) {
    console.error(`❌ Failed to kill process ${pid}:`, error.message);
  }
}

function main() {
  info(`Checking if port ${port} is in use...`);
  const pids = getPids();

  if (pids.length === 0) {
    info(`Port ${port} is free.`);
    return;
  }

  info(`Found ${pids.length} process(es) using port ${port}. Attempting to terminate...`);
  pids.forEach(killPid);
}

main();
