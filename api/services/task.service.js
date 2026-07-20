const supabase = require("../config/supabase");

const createTask = async (taskData, user) => {
  const { title, description, status } = taskData;

  const userId =
    user.role === "admin"
      ? taskData.user_id || user.id
      : user.id;

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      status: status || "Pending",
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getAllTasks = async (user, query) => {
  let { page = 1, limit = 10, search = "", status } = query;

  page = parseInt(page);
  limit = parseInt(limit);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let dbQuery = supabase
    .from("tasks")
    .select("*", { count: "exact" })
    .eq("is_deleted", false);

  if (user.role === "user") {
    dbQuery = dbQuery.eq("user_id", user.id);
  }

  // Search by title
  if (search) {
    dbQuery = dbQuery.ilike("title", `%${search}%`);
  }
 // Filter by status
  if (status) {
    dbQuery = dbQuery.eq("status", status);
  }

  dbQuery = dbQuery
    .order("created_at", { ascending: false })
    .range(from, to);

  const { data, error, count } = await dbQuery;

  if (error) {
    throw new Error(error.message);
  }

  return {
    tasks: data,
    pagination: {
      page,
      limit,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

const getTaskById = async (taskId, user) => {
  let query = supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("is_deleted", false);

  if (user.role === "user") {
    query = query.eq("user_id", user.id);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    throw new Error("Task not found");
  }

  return data;
};

const updateTask = async (taskId, taskData, user) => {
  let query = supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("is_deleted", false);

  if (user.role === "user") {
    query = query.eq("user_id", user.id);
  }

  const { data: task, error } = await query.single();

  if (error || !task) {
    throw new Error("Task not found");
  }

  delete taskData.user_id;
  delete taskData.id;
  delete taskData.created_at;
  delete taskData.is_deleted;

  taskData.updated_at = new Date();

  const { data, error: updateError } = await supabase
    .from("tasks")
    .update(taskData)
    .eq("id", taskId)
    .select()
    .single();

  if (updateError) {
    throw new Error(updateError.message);
  }

  return data;
};

const deleteTask = async (taskId, user) => {
  let query = supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("is_deleted", false);

  if (user.role === "user") {
    query = query.eq("user_id", user.id);
  }

  const { data: task, error } = await query.single();

  if (error || !task) {
    throw new Error("Task not found");
  }

  // Implemented soft delete
  const { error: deleteError } = await supabase
    .from("tasks")
    .update({
      is_deleted: true,
      updated_at: new Date(),
    })
    .eq("id", taskId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};