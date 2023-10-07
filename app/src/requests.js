// const path = "http://122.116.20.182:9001";
const path = "http://localhost:8000";

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

export const get_items_in_stock = async () => {
  // Get items that is currently in stock

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item/in_stock`, {
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
  // Update specific item

  const token = window.localStorage.getItem("access_token");

  const body = {};
  body[type] = value;

  try {
    const class_id = await get_item_detail(item_id).class_id;
    body.class_id = class_id;

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

export const send_rental_form = async (
  student_name,
  student_id,
  lend_date,
  due_date,
  phone_number,
  contact_info,
  note,
  pay_date,
  rent,
  item_id
) => {
  // Send new rental form

  const token = window.localStorage.getItem("access_token");
  const body = {
    student_name: student_name,
    student_id: student_id,
    lend_date: lend_date,
    due_date: due_date,
    phone_number: phone_number,
    contact_info: contact_info,
    note: note,
    pay_date: pay_date,
    rent: rent,
    item_id: item_id,
  };

  try {
    const response = await fetch(`${path}/rental_form/`, {
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

export const get_item_class_models = async (class_id) => {
  // Get all models in specific item class

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/model/by_class/${class_id}`, {
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

export const get_items_in_model = async (model_id) => {
  // Get all items in specific item

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/item/by_model/${model_id}`, {
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

export const get_rental_forms_by_serial_number = async (item_id) => {
  // Get all rental forms by specific item id

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/rental_form/by_item/${item_id}`, {
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

export const add_model = async (model_name, class_id) => {
  // Add new model

  const token = window.localStorage.getItem("access_token");
  const body = {
    model_name: model_name,
    class_id: class_id,
  };

  try {
    const response = await fetch(`${path}/model/`, {
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

export const adjust_model = async (model_id, body) => {
  // Update specific item model

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/model/${model_id}`, {
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

export const under_review_rental_forms = async () => {
  // Get all rental forms that is under review

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/rental_form/under_review_forms`, {
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

export const renting_rental_forms = async () => {
  // Get all rental forms that is currently renting

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/rental_form/renting_forms`, {
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

export const update_rental_form_status = async (
  rental_id,
  status,
  return_date = null
) => {
  // Update rental form's status

  const token = window.localStorage.getItem("access_token");

  let body = { status: status };

  if (status === 2) {
    body["return_date"] = return_date;
  }

  try {
    const response = await fetch(`${path}/rental_form/${rental_id}`, {
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

export const delete_rental_form = async (rental_id) => {
  // Update rental form's status

  const token = window.localStorage.getItem("access_token");

  try {
    const response = await fetch(`${path}/rental_form/${rental_id}`, {
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
