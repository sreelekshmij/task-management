const bcrypt = require("bcrypt");
const supabase = require("../config/supabase");

const registerUser = async ({ name, email, password, role }) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    })
    .select("id, name, email, role, created_at")
    .single();

  if (error) throw error;

  return data;
};

const loginUser = async ({ email, password }) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};