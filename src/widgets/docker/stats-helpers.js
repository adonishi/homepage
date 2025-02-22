export function calculateCPUPercent(stats) {
  let cpuPercent = 0.0;
  const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
  const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;

  if (systemDelta > 0.0 && cpuDelta > 0.0) {
    cpuPercent = (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100.0;
  }

  return Math.round(cpuPercent * 10) / 10;
}

export function calculateUsedMemory(stats) {
  // see https://github.com/docker/cli/blob/dcc161076861177b5eef6cb321722520db3184e7/cli/command/container/stats_helpers.go#L239
  return stats.memory_stats.usage - (stats.memory_stats.total_inactive_file ?? stats.memory_stats.stats.inactive_file ?? 0)
}