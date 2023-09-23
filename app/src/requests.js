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
    return false;
  }
};

export const update_admin = async (type, value) => {
  // Update the corresponding value of admin user

  const token = window.localStorage.getItem("access_token");

  let body = {};
  body[type] = value;

  console.log(JSON.stringify(body));

  try {
    const response = await fetch(`${path}/user/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) return 401;

    if (!response.ok) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const get_item_classes = async () => {
  // Get all item classes

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item_class/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const update_item_class = async (class_id, new_name) => {
  // Update specific item class

  const token = window.localStorage.getItem("access_token");

  const body = { class_name: new_name };

  try {
    const response = await fetch(`${path}/item_class/${class_id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const delete_item_class = async (class_id) => {
  // Delete specific item class

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item_class/${class_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const add_new_item_class = async (name) => {
  // Add new item class

  const token = window.localStorage.getItem("access_token");
  const body = { class_name: name };

  try {
    const response = await fetch(`${path}/item_class/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const get_models = async () => {
  // Get all models

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/model/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const get_all_items = async () => {
  // Get all items general datas

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const get_item_detail = async (item_id) => {
  // Get item detail

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item/${item_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const update_item = async (item_id, type, value) => {
  // Delete specific item

  const token = window.localStorage.getItem("access_token");

  const body = {};
  body[type] = value;

  try {
    const class_id = await get_item_detail(item_id).class_id;
    body.class_id = class_id;

    console.log(body);

    const response = await fetch(`${path}/item/${item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const delete_item = async (item_id) => {
  // Delete specific item

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item/${item_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return 401;
    if (response.status === 406) return 406;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export const add_item = async (
  item_name,
  item_serial_number,
  item_description,
  model_id,
  image
) => {
  // Add new item

  const token = window.localStorage.getItem("access_token");
  const body = {
    item_name: item_name,
    serial_number: item_serial_number,
    description: item_description,
    model_id: model_id,
    image: image,
  };

  try {
    const response = await fetch(`${path}/item/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) return 401;

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};
