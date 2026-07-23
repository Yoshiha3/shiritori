async function request(url, options = {}) {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.errorMessage);
  }

  return data;
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function get(url) {
  return request(url, {
    method: "GET",
  });
}

export function post(url, body) {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
