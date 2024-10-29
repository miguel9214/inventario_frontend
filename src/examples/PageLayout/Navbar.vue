<script setup>
defineProps({
  btnBackground: {
    type: String,
    default: "",
  },
  isBlur: {
    type: String,
    default: "",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  isBtn: { type: String, default: "bg-gradient-light" },
});
</script>
