<template>
    <div class="q-gutter-md" style="max-width: 400px">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="id" label="Task ID" readonly />
            <q-input v-model="title" label="Task Title" />
            <q-input v-model="description" label="Description" />
            <q-select v-model="status" :options="statusOptions" label="Status" />
            <q-input v-model="due_date" label="Due Date" type="date" />
            <q-btn type="submit" label="Update Task" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// State variables for Task data
const id = ref(route.params.id)
const title = ref('')
const description = ref('')
const status = ref('Pending')
const due_date = ref('')

// Status options for the task
const statusOptions = ['Pending', 'In Progress', 'Completed']

// Fetch task data to populate the form
const fetchData = () => {
    fetch(`http://localhost:8800/api/v1/tasks/${id.value}`)
    .then(res => res.json())
    .then(result => {
        title.value = result.title
        description.value = result.description
        status.value = result.status
        due_date.value = result.due_date ? result.due_date.slice(0, 10) : '' // Format due_date as yyyy-mm-dd
    })
}
fetchData()

// Handle form submission to update the task
const onSubmit = () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({
        title: title.value,
        description: description.value,
        status: status.value,
        due_date: due_date.value
    })

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    fetch(`http://localhost:8800/api/v1/tasks/${id.value}`, requestOptions) // API endpoint for updating task
    .then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.message || "Something went wrong")
            })
        }
        return response.json()
    })
    .then((result) => {
        alert(result.message)
        if (result.status === 'ok') {
            router.push('/') // Navigate back to the task list page
        }
    })
    .catch((error) => {
        console.error('Error:', error)
        alert(`Error: ${error.message}`)
    })
}
</script>
