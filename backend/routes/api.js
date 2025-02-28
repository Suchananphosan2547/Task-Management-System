const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// การตั้งค่า rate limiter สำหรับจำกัดจำนวนการร้องขอจากผู้ใช้ในช่วงเวลาหนึ่ง
const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 3,   // กำหนดเวลาหน้าต่าง 3 นาที
    max: 100,                  // จำกัดจำนวนการร้องขอได้ไม่เกิน 100 ครั้งภายใน 3 นาที
    message: 'Too many requests, please try again after 3 minutes!'
});

// เชื่อมต่อกับ taskController เพื่อจัดการกับข้อมูลงาน
const taskController = require('../controllers/tasks');

// API สำหรับสร้างงานใหม่
router.post('/tasks', apiLimiter, taskController.createTask);

// API สำหรับอัปเดตข้อมูลงานตาม ID
router.put('/tasks/:id', apiLimiter, taskController.updateTask);

// API สำหรับลบงานตาม ID
router.delete('/tasks/:id', apiLimiter, taskController.deleteTask);

// API สำหรับดึงข้อมูลงานตาม ID
router.get('/tasks/:id', taskController.getTask);

// API สำหรับดึงข้อมูลงานทั้งหมด
router.get('/tasks', apiLimiter, taskController.getTasks);

// (ถ้าคุณต้องการการค้นหางานตามคำค้นหา ใช้ API นี้)
// router.get('/tasks/q/:term', apiLimiter, taskController.getTasksByTerm);

module.exports = router;
