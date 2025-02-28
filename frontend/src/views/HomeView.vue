<template>
  <div class="q-pa-md flex" style="height: 100vh;">

    <!-- คอลัมน์ (กล่องข้อความอยู่ด้านบน, ปุ่มอยู่ด้านล่าง) -->
    <div class="flex flex-column q-pa-md" style="flex-grow: 1;">
      
      <!-- ตารางแสดงข้อมูล Task -->
      <q-table
        title="Tasks"
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="bg-white shadow-2 rounded-borders"
        :rows-per-page-options="[5, 10, 15]"
        :pagination="pagination"
        style="flex-grow: 1; overflow: auto;"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <!-- ปุ่มแก้ไขและลบ -->
            <q-btn
              flat
              dense
              round
              icon="edit"
              @click="onEdit(props.row.id)"
              color="primary"
              class="q-mr-sm"
              size="sm"
            />
            <q-btn
              flat
              dense
              round
              icon="delete"
              @click="onDelete(props.row.id)"
              color="negative"
              size="sm"
            />
          </q-td>
        </template>
      </q-table>

      <!-- ปุ่มสำหรับสร้าง Task ใหม่ -->
      <div class="q-pa-md flex justify-center q-mt-md">
        <q-btn
          icon="add"
          @click="onCreate"
          label="Create New Task"
          color="primary"
          size="lg"
          rounded
          style="max-width: 250px; border-radius: 10px;"
        />
      </div>
      
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'

const columns = [
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
  { name: 'due_date', align: 'center', label: 'Due Date', field: 'due_date', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
]

const rows = ref([])

const pagination = ref({ page: 1, rowsPerPage: 5 })

const fetchData = async () => {
  fetch('http://localhost:8800/api/v1/tasks') // API สำหรับดึงข้อมูล tasks
    .then(res => res.json())
    .then(result => {
      rows.value = result
    })
}

fetchData()

const onCreate = () => {
  router.push('/create') // ไปที่หน้าเพื่อสร้าง Task ใหม่
}

const onEdit = (id) => {
  router.push(`/update/${id}`) // ไปที่หน้าแก้ไข Task โดยใช้ ID
}

const onDelete = (id) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch(`http://localhost:8800/api/v1/tasks/${id}`, requestOptions) // API สำหรับลบ Task ตาม ID
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      if (result.status === 'OK') {
        router.push('/') // กลับไปที่หน้าแรก
      }
      fetchData() // รีเฟรชข้อมูลหลังจากลบ
    })
    .catch((error) => console.error(error))
}
</script>

<style scoped>
/* ปรับแต่งสีและขอบให้เป็นระเบียบ */
.q-btn {
  font-weight: bold;
}

.q-table {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.q-table__row {
  cursor: pointer;
}

.q-table__cell {
  padding: 10px 15px;
}

.q-table__head {
  background-color: #f5f5f5;
  font-weight: 600;
}

.q-table__head .q-th {
  color: #333;
}

/* เพิ่มสีเบา ๆ ให้กับปุ่มเมื่อ hover */
.q-btn:hover {
  transform: scale(1.05);
}

/* ปรับให้ตารางมีสีขาวและขอบโค้ง */
.q-table__rows {
  background-color: #ffffff;
  border-radius: 8px;
}

/* จัดคอลัมน์ให้เหมาะสม */
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.q-table {
  width: 100%;
}

.q-table__cell {
  padding: 12px;
}

/* ปรับระยะห่างระหว่างปุ่มและตาราง */
.q-pa-md.flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.q-pa-md.flex.q-mt-md {
  margin-top: 20px;
}
</style>
