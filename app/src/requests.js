const path = "http://127.0.0.1:8000";

const get_access_token = async (user_name, password) => {
  // Get admin access token for localStorage

  try {
    const formData = new URLSearchParams();
    formData.append("username", user_name);
    formData.append("password", password);

    const response = await fetch(`${path}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    console.log(data);

    if (data.access_token) {
      console.log("Access token:", data.access_token);
    } else if (data.someOtherData) {
      console.log("Other data:", data.someOtherData);
    }

    return data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
export default get_access_token;

export const validate = async () => {
  // Check if the token is still avaliable

  const token = window.localStorage.getItem("access_token");
  try {
    const response = await fetch(
      `${path}/token/validate_access_token?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error validating access token:", error);
    // throw error;
  }
};
