export const getError = (error: any) => {
  console.log("error", error);
  if (error && typeof error === "object" && "reason" in error)
    return error.reason;
  if (error && typeof error === "object" && "message" in error)
    return error.message;
  if (error && typeof error === "string") return error;
  else return "Something went wrong";
};
