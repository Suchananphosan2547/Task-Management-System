<template>
    <div class="q-gutter-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="title" label="Task Title" />
            <q-input v-model="description" label="Description" />
            <q-select v-model="status" :options="statusOptions" label="Status" />
            <q-input v-model="due_date" label="Due Date" type="date" />
            <q-btn type="submit" label="Create Task" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'

const title = ref('')
const description = ref('')
const status = ref('Pending')
const due_date = ref('')

const statusOptions = ['Pending', 'In Progress', 'Completed']

const onSubmit = () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    title: title.value,
    description: description.value,
    status: status.value,
    due_date: due_date.value
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  fetch('http://localhost:8800/api/v1/tasks', requestOptions) // ใช้ endpoint สำหรับสร้าง task
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      if (result.status === 'ok') {
        router.push('/') // ไปที่หน้าแสดงรายการ task
      }
    })
    .catch((error) => console.error(error))
}
</script>
