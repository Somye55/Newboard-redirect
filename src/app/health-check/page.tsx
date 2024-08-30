// app/health-check/page.tsx
// Simulated server-side function to check health status
async function checkServerHealth() {
  // Replace with your actual health check logic
  const response = await fetch("http://localhost:8001/health-nb", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (response.status >= 200) {
    return '✅ Server is healthy';
  } else {
   return '❌ Server is unhealthy'
    // Optionally, handle the 404 case, e.g., by showing an error message or redirecting to a 404 page.
  };
}

export default async function HealthCheckPage() {
  let healthStatus;

  try {
    healthStatus = await checkServerHealth();
  } catch (error:any) {
    healthStatus = error.message;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Health Check</h1>
      <div style={{ fontSize: '18px', fontWeight: '600', marginTop: '20px', color: healthStatus === 'Server is Healthy' ? 'green' : 'red' }}>
        {healthStatus}
      </div>
    </div>
  );
}
