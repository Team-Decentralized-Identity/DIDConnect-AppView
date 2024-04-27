<script setup lang="ts">
import { reactive } from "vue"; // remove the duplicate import of 'ref'
import ButtonAsync from "@/components/common/ButtonAsync.vue";
import ModalChangeHandle from "@/components/ModalChangeHandle.vue";
import { useSettings, updateSettings } from "@/lib/settings";
import { deleteSession, exportUserData } from '@/lib/bsky';

const settings = useSettings();
const state = reactive({
  showsModalChangeHandle: false,
  loadingModalChangeHandle: false,
  exportStatus: '' // declare exportStatus here to fix the related error
});
// Methods
const logout = () => {
  deleteSession();
  window.location.reload(); // Use window.location.reload()
};

const exportAccountData = async () => {
  console.log('Export button clicked'); // This should show up in the console
  state.exportStatus = 'Exporting data...';
  try {
    const exportSuccess = await exportUserData();
    state.exportStatus = exportSuccess ? 'Data exported successfully.' : 'Failed to export data.';
  } catch (error) {
    state.exportStatus = 'An error occurred during export.';
    console.error('Export error:', error);
  }
};


</script>

<template>
  <div class="form-group">
    <label class="form-switch">
      <input
        type="checkbox"
        :checked="settings.enableRelativeTime"
        @change="
          updateSettings({
            enableRelativeTime: !settings.enableRelativeTime,
          })
        "
      />
      <i class="form-icon"></i>Enable relative time
    </label>
  </div>
  <div>

<ButtonAsync
  class="btn btn-link change-handle" 
  :force-loading="state.loadingModalChangeHandle"
  @click="state.showsModalChangeHandle = true"
>
  Edit your handle...
</ButtonAsync>
  </div>
  <div>
    <button class="btn btn-link export-button" @click="exportAccountData">
      Export account data
    </button>
    <p>{{ state.exportStatus }}</p>
  </div>
<button class="btn btn-link logout-button" @click="logout">
  Logout
</button>
  <Suspense
    @pending="state.loadingModalChangeHandle = true"
    @resolve="state.loadingModalChangeHandle = false"
    @fallback="state.loadingModalChangeHandle = false"
  >
    <ModalChangeHandle
      v-if="state.showsModalChangeHandle"
      @close="state.showsModalChangeHandle = false"
    />
  </Suspense>
</template>


<style scoped>
.btn-link.logout-button {
  padding: 8px 16px; 
  font-size: 16px; 
  background-image: linear-gradient(145deg, #b8d8be, #b8d8be); 
  color: rgb(10, 9, 9) !important;
  border: none; 
  border-radius: 5px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  transition: all 0.3s ease; 
  cursor: pointer; 
  margin-top: 3px;
}

.btn-link.change-handle {
  padding: 8px 16px; 
  font-size: 16px; 
  background-image: linear-gradient(145deg, #b8d8be, #b8d8be); 
  color: black !important;
  border: none; 
  border-radius: 5px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: .9em; 
}

.btn-link.export-button {
  padding: 8px 16px; 
  font-size: 16px; 
  background-image: linear-gradient(145deg, #b8d8be, #b8d8be); 
  color: rgb(10, 9, 9) !important;
  border: none; 
  border-radius: 5px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  transition: all 0.3s ease; 
  cursor: pointer; 
  margin-top: 30px;
}

.export-status.success {
  color: #b8d8be; /* green for success messages */
}

.export-status.error {
  color: #f6bdc3; /* red for error messages */
}

p, p code {
    color: #32b643;
}
</style>
