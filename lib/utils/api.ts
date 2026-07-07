export function ok<T>(data: T, status = 200): Response {
  return Response.json({ data }, { status });
}

export function fail(message: string, status = 500): Response {
  return Response.json(
    {
      error: {
        message,
      },
    },
    { status }
  );
}
