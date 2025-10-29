/**
 * System Monitoring Script
 * Supports both production and development modes
 */

const ENV = process.env.NODE_ENV || 'production';

const monitorConfig = {
  production: {
    interval: 60000, // 1 minute
    alertThreshold: 80,
    debugMode: false,
    verboseLogging: false,
    metricsEndpoint: 'http://localhost:8080/metrics'
  },
  development: {
    interval: 5000, // 5 seconds
    alertThreshold: 90,
    debugMode: true,
    verboseLogging: true,
    metricsEndpoint: 'http://localhost:3000/metrics'
  }
};

const config = monitorConfig[ENV] || monitorConfig.production;

console.log('=================================');
console.log('DevOps Simulator - Monitor');
console.log(`Environment: ${ENV}`);
console.log(`Debug: ${config.debugMode ? 'ENABLED' : 'DISABLED'}`);
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();

  if (config.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // Simulated metrics
  const cpuUsage = Math.random() * 100;
  const memUsage = Math.random() * 100;
  const diskUsage = Math.random() * 100;

  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);

  if (config.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
  }

  if (maxUsage > config.alertThreshold) {
    console.log('⚠️  System Status: WARNING - High resource usage');
  } else {
    console.log('✅ System Status: HEALTHY');
  }

  if (config.verboseLogging) {
    console.log(`Next check in ${config.interval}ms`);
  }
}

console.log(`Monitoring every ${config.interval}ms`);
setInterval(checkSystemHealth, config.interval);
checkSystemHealth();

// Optional: Extra logging for development mode
if (config.debugMode) {
  setInterval(() => {
    const mem = process.memoryUsage();
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
