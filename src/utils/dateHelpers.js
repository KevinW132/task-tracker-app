export function isToday(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}

export function shouldShowToday(task) {
    if (task.repeat === "none") return !task.done;
    if (!task.lastDone) return true;

    const last = new Date(task.lastDone);
    const today = new Date();

    switch (task.repeat) {
        case "daily":
            return last.toDateString() !== today.toDateString();
        case "weekly":
            return today.getDay() === last.getDay()
                ? today.toDateString() !== last.toDateString()
                : true;
        case "monthly":
            return today.getDate() === last.getDate()
                ? today.toDateString() !== last.toDateString()
                : true;
        default:
            return true;
    }
}
