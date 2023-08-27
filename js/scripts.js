const app = Vue.createApp({
    data() {
        return {
            tasks: this.loadTasksFromCookies(),
            text: "",
        };
    },

    computed: {
        totalTasks() {
            return this.tasks.length;
        },
    },

    methods: {

        addtask() {
            if (this.newTask.trim() !== "") {
                const existingTask = this.tasks.find(task => task.title.toLowerCase() === this.newTask.toLowerCase());
                
                if (!existingTask) {
                    this.tasks.push({ id: this.tasks.length + 1, title: this.newTask, editing: false });
                    this.saveTasksToCookies();
                    this.newTask = "";
                } else {
                    
                    alert("This task already exists!");
                }
            }
        },

        updateMessage(event) {
            this.text = event.target.value;
        },

        showConfirmationModal(index) {
            this.taskToDeleteIndex = index;
            const modal = document.getElementById('confirmationModal');
            modal.style.display = 'block';
        },

        cancelDelete(){
            const modal = document.getElementById('confirmationModal');
            modal.style.display = 'none';
        },

        confirmDelete() {
            const index = this.taskToDeleteIndex;
            this.deleteTask(index);
            const modal = document.getElementById('confirmationModal');
            modal.style.display = 'none';
            this.taskToDeleteIndex = null;
        },
    
        deleteTask(index) {
            this.tasks.splice(index, 1);
            this.saveTasksToCookies();
        },
        
        toggleEdit(task) {
            task.editing = !task.editing;
            this.saveTasksToCookies();
        },

        saveEdit(task) {
            task.editing = false;
            this.saveTasksToCookies();
        },

        toggleChecked(task) {
            task.checked = !task.checked;
            this.saveTasksToCookies();
        },

        saveTasksToCookies() {
            document.cookie = `tasks=${JSON.stringify(this.tasks)}`;
        },
        loadTasksFromCookies() {
            const cookies = document.cookie.split("; ");
            for (const cookie of cookies) {
                const [name, value] = cookie.split("=");
                if (name === "tasks") {
                    return JSON.parse(value);
                }
            }
            return [];
        },

    },

 
})




app.mount("#app");

app.config.optionMergeStrategies.created = (parentValue, childValue) => {
    if (!parentValue) parentValue = [];
    if (childValue) parentValue = childValue(parentValue);
    return parentValue;
};