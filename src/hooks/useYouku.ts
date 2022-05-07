export default () => {
    function getCurrentTime() {
        return $('.kui-dashboard-timer-panel')[0].innerText.substring(3) + ".00";
    }

    return {
        getCurrentTime
    }
}