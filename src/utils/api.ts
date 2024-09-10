export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function fetchApi<T>(
  url: string,
  method: string,
  body?: object
): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
