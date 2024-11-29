interface FetchError extends Error {
  info?: unknown;
  status?: number;
}

export const fetcher = async <T>(
  ...args: [RequestInfo, RequestInit?]
): Promise<T> => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error: FetchError = new Error(
      "An error occurred while fetching the data.",
    );
    throw error;
  }

  return res.json() as Promise<T>;
};
