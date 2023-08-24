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
            if (this.text.trim() !== "") {
                this.tasks.push({ id: this.tasks.length + 1, title: this.text, editing: false });
                this.saveTasksToCookies();
            }
            
        },

        updateMessage(event) {
            this.text = event.target.value;
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