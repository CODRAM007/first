function editTask(id) {
  const newName = prompt("Enter new task name:");
  if (newName && newName.trim() !== "") {
    document.getElementById("updatedName-" + id).value = newName;
    document.getElementById("edit-form-" + id).submit();
  }
}

