<template>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Birth Date</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="users.length > 0">
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.birthDate) }}</td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="4" v-if="!isLoading && users.length === 0">No data.</td>
      </tr>
      <tr v-if="isLoading">
        <td colspan="4" v-if="isLoading"><h3>~ L O A D I N G ~</h3></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/generated/graphql';

export const UserTable = defineComponent({
  name: 'UserTable',
  props: {
    users: {
      type: Array as PropType<User[]>,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    function formatDate(isoDate: string) {
      const date = new Date(isoDate);
      return date.toLocaleDateString();
    }
    return {
      formatDate,
    };
  },
});
export default UserTable;
</script>

<style lang="scss" scoped></style>
