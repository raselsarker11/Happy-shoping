// register form start

const handleRegistration = async (event) => {
  event.preventDefault();

  document.getElementById("error").innerText = "";

  const username = getValue("Username");
  const first_name = getValue("First_name");
  const last_name = getValue("Last_name");
  const email = getValue("Email_address");
  const password = getValue("Password");
  const confirm_password = getValue("Confirm_password");

  const info = {
    name: username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  if (password !== confirm_password) {
    document.getElementById("error").innerText = "Passwords do not match.";
    alert("Passwords do not match.");
    return;
  }

  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    document.getElementById("error").innerText =
      "Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    return; 
  }

  try {
      const response = await fetch(
        "https://smart-shoping-whb0.onrender.com/account/register/",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        }
      );
    
      const data = await response.json();
      if (data?.id) {
        document.getElementById("error").innerText =
          "Congratulations! Your Account Created Successfully.";
          document.getElementById("contact_form").reset();
          window.location.href = "https://raselsarker11.github.io/Happy-shoping/login.html";
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      // Display user-friendly error message
      document.getElementById("error").innerText =
        "An error occurred. Please try again later.";
   }
 
};

const getValue = (id) => {
  return document.getElementById(id).value;
};

document.getElementById("contact_form").addEventListener("submit", handleRegistration); // Change this line

// register form end
