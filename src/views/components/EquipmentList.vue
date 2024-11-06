<script setup>
import { ref, onMounted } from "vue";
import Modal from "../components/Modal.vue";
import { useApi } from "@/composables/use-api";
import Swal from "sweetalert2";

const equipments = ref([]);
const currentPage = ref([1]);
const totalPages = ref([1]);
const itemsPerPage = 15;
const isModalVisible = ref(false); // Estado para el modal
const selectedEquipment = ref(null); // Equipo seleccionado para editar

const fetchEquipment = async (page = 1) => {
  try {
    const response = await useApi(
      `equipment?page=${page}&itemsPerPage=${itemsPerPage}`
    );
    equipments.value = response.equipments.data;
    currentPage.value = response.equipments.current_page;
    totalPages.value = response.equipments.last_page;
  } catch (error) {
    console.error("Error al cargar los equipos");
  }
};

const deleteEquipment = async (id) => {
  try {
    await useApi(`equipment/${id}`, "DELETE"); // Realizamos la petición DELETE
    // Filtramos el equipo eliminado de la lista local
    equipments.value = equipments.value.filter(
      (equipment) => equipment.id !== id
    );
    Swal.fire(
      "Eliminado!",
      "El equipo ha sido eliminado ha sido eliminado.",
      "success"
    );
  } catch (error) {
    Swal.fire("Error", "No se pudo eliminar el asistente", "error");
  }
};

const saveChanges = async () => {
  try {
    await useApi(
      `equipment/${selectedEquipment.value.id}`,
      "PUT",
      selectedEquipment.value
    );
    Swal.fire("Guardado!", "El equipo ha sido actualizado.", "success");
    closeModal();
    fetchEquipment(currentPage.value); // Refresca la lista de equipos
  } catch (error) {
    Swal.fire("Error", "No se pudo actualizar el equipo", "error");
  }
};

const openModal = (equipment) => {
  selectedEquipment.value = equipment; // Asigna el equipo seleccionado
  isModalVisible.value = true; // Muestra el modal
};

onMounted(() => {
  fetchEquipment();
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchEquipment(page);
  }
};

const calculateIndex = (index) => {
  return (currentPage.value - 1) * itemsPerPage + index + 1;
};
</script>

<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Listado de equipos</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 table-scroll">
      <div class="table-responsive p-0 table-scroll">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                #
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                PROPIEDAD
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                DEPENDENCIA
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                NOMBRE
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                SO
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                PAQUETE DE OFIMITICA
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                MODELO
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                MARCA
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                CPU
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                HDD (GB)
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                RAM (GB)
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                IP
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                MAC
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                SERIAL
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ACTIVO FIJO
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ANYDESK
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                IMPRESORA
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ACTIVO FIJO IMPRESORA
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ESCANER
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ACTIVO FIJO ESCANER
              </th>
              <th class="text-secondary opacity-7">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!equipments.length">
              <td colspan="3">Cargando equipos...</td>
            </tr>
            <tr
              v-else
              v-for="(equipment, index) in equipments"
              :key="equipment.id"
            >
              <td>{{ calculateIndex(index) }}</td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.property
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.dependence_id
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.equipmentName
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.os
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.officePackage
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.brand
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.brand
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.cpu
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.hdd
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.ram
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.ip
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.mac
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.serial
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.fixedAsset
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.anydesk
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.printer
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.printerFixedAsset
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.scanner
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{
                  equipment.scannerFixedAsset
                }}</span>
              </td>

              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
              <td>
                <button class="btn btn-primary btn-sm" @click="openModal(equipment)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="deleteEquipment(equipment.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="pagination d-flex align-items-center justify-content-center mt-3"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal :isVisible="isModalVisible" title="Editar equipo" @close="closeModal">
    <div v-if="selectedEquipment">
      <label>Nombre del equipo</label>
      <input
        v-model="selectedEquipment.equipmentName"
        type="text"
        class="form-control"
      />
      <!-- Agrega más campos de edición según necesites -->
      <button class="btn btn-success mt-3" @click="saveChanges">
        Guardar cambios
      </button>
    </div>
  </Modal>
</template>

<style scoped>
.pagination button {
  background-color: #4e73df; /* Color primario */
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 50px; /* Bordes redondeados */
  font-weight: bold;
  transition: all 0.3s ease;
  margin: 0 5px;
  box-shadow: 0 4px 8px rgba(78, 115, 223, 0.3); /* Sombra suave */
}

.pagination button:disabled {
  background-color: #e0e0e0;
  color: #7a7a7a;
  cursor: not-allowed;
  box-shadow: none; /* Sin sombra cuando está deshabilitado */
}

.pagination button:hover:not(:disabled) {
  background-color: #375ab5; /* Color de hover */
  box-shadow: 0px 6px 12px rgba(78, 115, 223, 0.5); /* Sombra más intensa en hover */
}

.pagination span {
  font-weight: bold;
  color: #4e73df;
}
</style>
