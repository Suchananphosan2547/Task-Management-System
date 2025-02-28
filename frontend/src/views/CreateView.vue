<template>
    <div class="q-gutter-md" style="max-width: 600px; margin: 0 auto; padding: 30px;">
        <q-form @submit="onSubmit" class="q-gutter-md" style="border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); background-color: #fff; padding: 30px;">
            <q-input 
                v-model="title" 
                label="Task Title" 
                class="q-mb-md"
                dense
                rounded
            />
            <q-input 
                v-model="description" 
                label="Description" 
                class="q-mb-md"
                dense
                rounded
            />
            <q-select 
                v-model="status" 
                :options="statusOptions" 
                label="Status" 
                class="q-mb-md"
                dense
                rounded
            />
            <q-input 
                v-model="due_date" 
                label="Due Date" 
                type="date" 
                class="q-mb-md"
                dense
                rounded
            />
            <q-btn 
                type="submit" 
                label="Create Task" 
                color="primary" 
                class="full-width"
                rounded
                size="lg"
            />
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

<style scoped>
.q-form {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.q-input,
.q-select {
  max-width: 100%;
  padding: 10px 15px;
}

.q-btn {
  font-weight: bold;
}

.q-btn.full-width {
  width: 100%;
}

.q-input.q-mb-md,
.q-select.q-mb-md {
  margin-bottom: 15px;
}

.q-btn {
  margin-top: 20px;
}
</style>
