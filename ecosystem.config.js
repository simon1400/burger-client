module.exports = {
  apps: [
    {
      name: 'burger-client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/opt/burger/client',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
      },
      error_file: '/var/log/pm2/burger-client-error.log',
      out_file: '/var/log/pm2/burger-client-out.log',
      log_file: '/var/log/pm2/burger-client-combined.log',
      time: true,
      merge_logs: true,
    },
  ],
}
