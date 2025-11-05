export const handleApiError = (error: unknown, setErrorMessage?: (msg: string) => void) => {
  console.error("❌ API Error:", error)
  let message = "Something went wrong. Please try again.";

  if (typeof error === "string") {
    message = error
  } else if (error instanceof Error) {
    if (error.message.includes("NetworkError")) {
        message = "Cannot connect to the server. Check your internet connection."
    }else if (error.message.includes("timeout")) {
      message = "The request took too long. Please try again.";
    } else {
      message = error.message || message;
    }
  } else if (typeof (error as any)?.response?.status === "number") {
    const status = (error as any).response.status;
    if (status === 401) message = "You are not authorized.";
    else if (status === 403) message = "Access denied.";
    else if (status === 404) message = "Resource not found.";
    else if (status >= 500) message = "Server error. Please try again later.";
  }

    if (setErrorMessage) setErrorMessage(message);
    return message;

}