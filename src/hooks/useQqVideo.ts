export default () => {
    function getCurrentTime() {
        let innerText = $('.txp_time_current')[0].innerText;
        if (innerText.length == 0) {
            return '00:00.00';
        } else if (innerText.length == 5) {
            return innerText + '.00';
        } else if (innerText.length == 8) {
            return innerText.substring(3) + ".00";
        }
    }

    return {
        getCurrentTime
    }
}