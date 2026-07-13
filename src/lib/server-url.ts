export const getServerUrl = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  }

  throw new Error(
    "Missing environment variable NEXT_PUBLIC_SERVER_URL. Set it in your deployment environment.",
  );
};
