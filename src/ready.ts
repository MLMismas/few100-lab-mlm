export function ready(callback: any) {
    document.onreadystatechange = function () {
        // DOM is created
        if (document.readyState === 'interactive') {
            callback();
        }
    }
}