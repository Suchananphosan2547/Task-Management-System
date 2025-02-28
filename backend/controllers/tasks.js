const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้างงานใหม่
const createTask = async (req, res) => {
    const { title, description, status, due_date } = req.body;

    try {
        // สร้างข้อมูลงานใหม่
        const task = await prisma.tasks.create({  // แก้เป็น tasks แทน task
            data: {
                title,
                description,
                status,
                due_date: due_date ? new Date(due_date) : null,
            },
        });

        res.status(200).json({
            status: "ok",
            message: `Task with ID = ${task.id} is created`, // ส่ง ID ที่ถูกสร้างกลับไป
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to create task",
            error: err.message,
        });
    }
};

// ดึงงานทั้งหมด
const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany();  // แก้เป็น tasks แทน task
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch tasks",
            error: err.message,
        });
    }
};

// ดึงงานตาม ID
const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await prisma.tasks.findUnique({  // แก้เป็น tasks แทน task
            where: {
                id: Number(id),
            },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch task",
            error: err.message,
        });
    }
};

// อัปเดตงานตาม ID
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;

    const data = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (status) data.status = status;
    if (due_date) data.due_date = new Date(due_date);

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'No data provided for update.',
        });
    }

    try {
        const task = await prisma.tasks.update({  // แก้เป็น tasks แทน task
            where: { id: Number(id) },
            data,
        });

        res.status(200).json({
            status: 'ok',
            message: `Task with ID = ${id} has been updated`,
            task,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update task',
            error: err.message,
        });
    }
};

// ลบงานตาม ID
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.tasks.findUnique({  // แก้เป็น tasks แทน task
            where: { id: Number(id) },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await prisma.tasks.delete({  // แก้เป็น tasks แทน task
            where: { id: Number(id) },
        });

        res.status(200).json({
            status: 'ok',
            message: `Task with ID = ${id} has been deleted`,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete task',
            error: err.message,
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};
