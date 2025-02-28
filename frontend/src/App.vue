<template>
  <q-layout view="hHh lpR fFf">

    <!-- Header -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="q-mr-md">
          Task Management System
        </q-toolbar-title>

        <q-tabs
          align="center"
          class="q-mb-none"
          :dense="true"
          narrow-indicator
          active-color="white"
        >
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/create" label="Create" />
          <q-route-tab to="/about" label="About" />
        </q-tabs>

      </q-toolbar>
    </q-header>

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>
/* ปรับปรุง header ให้มีความสมดุล */
.q-header {
  padding-left: 20px;
  padding-right: 20px;
}

/* เพิ่มระยะห่างให้กับ q-toolbar-title */
.q-toolbar-title {
  font-size: 1.25rem;
  font-weight: 600;
}

/* ปรับระยะห่างของ q-tabs */
.q-tabs {
  margin-left: 30px;
  margin-right: 30px;
}

/* ปรับการจัดตำแหน่ง tab ให้สมดุล */
.q-tabs .q-route-tab {
  font-size: 1rem;
  font-weight: 500;
}

/* จัดการให้ tab indicator หนาและเป็นสีขาว */
.q-tabs .q-route-tab.q-tabs__indicator {
  border-bottom-width: 3px;
  border-color: white;
}
</style>
