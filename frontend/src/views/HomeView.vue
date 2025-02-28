<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-btn icon="add" @click="onCreate" label="Create New Task" />
    </div>

    <q-table
      title="Tasks"
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            @click="onEdit(props.row.id)"
          />
          <q-btn
            flat
            dense
            round
            icon="delete"
            @click="onDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
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
  console.log(id)
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
