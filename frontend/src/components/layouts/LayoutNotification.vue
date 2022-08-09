<template>
  <NotificationGroup group="app">
    <ul
      class="fixed bottom-0 right-0 w-full max-w-sm sm:max-w-md flex flex-col space-y-4 p-4 lg:px-8 lg:py-12 pointer-events-none z-100"
    >
      <Notification
        v-slot="{ notifications, close }"
        enter="transform ease-out duration-300"
        enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
        enter-to="translate-y-0 opacity-100 sm:translate-x-0"
        leave="ease-in duration-1000"
        leave-from="opacity-100"
        leave-to="opacity-0"
        move="duration-500"
        move-delay="delay-300"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="relative pointer-events-auto delay-0"
        >
          <AppAlert
            :variant="notification.type"
            :title="notification.title"
            :model-value="true"
            :report="notification.report"
            @update:modelValue="close(notification.id)"
          >
            <p>
              <span v.if="notification.text"> {{ notification.text }} </span>
            </p>
          </AppAlert>
        </div>
      </Notification>
    </ul>
  </NotificationGroup>
</template>

<script setup lang="ts">
import AppAlert from "@/components/app/AppAlert.vue";
</script>
