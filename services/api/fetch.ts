let xCsrfToken: string;
let accessToken: string;

export function setXCsrfToken(csrfToken: string): void {
  xCsrfToken = csrfToken;
}

export function setAccessToken(jwt: string): void {
  accessToken = jwt;
}

export default async function request(
  endpoint: string,
  query?: string,
  method?: string,
  dataType?: string,
  data?: any
) {
  let uri = endpoint;

  if (query) {
    uri = `${uri}?${query}`;
  }

  const options: any = {
    method: method || "GET",
    credentials: "include",
    headers: {
      "x-csrf": "1",
    },
  };

  if (xCsrfToken) options.headers["x-csrf-token"] = xCsrfToken;
  if (accessToken) options.headers["Authorization"] = `Bearer ${accessToken}`;

  if (dataType === "application/json" && typeof data !== "string") {
    data = JSON.stringify(data);
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": dataType,
    };
    options.body = data;
  }

  const response: any = await fetch(uri, options);

  if (!response.ok) {
    throw new Error(
      `Request failed with status code ${
        response.status
      }.\nReason: ${await response.text()}`
    );
  }

  const contentType = response.headers.get("content-type");

  if (!contentType) {
    return response;
  }

  if (contentType.includes("application/json")) {
    const obj = await response.json();
    return obj;
  }

  if (contentType.includes("text/plain")) {
    const text = await response.text();
    return text;
  }

  if (contentType.includes("text/html")) {
    const html = await response.html();
    return html;
  }

  throw new Error("Received response with unknown content type!");
}
