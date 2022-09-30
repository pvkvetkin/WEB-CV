window.addEventListener ('load', function () {
var current = location.pathname.split('/')[10];
var menuItems = document.querySelectorAll('.headerLi a');
for (var i = 0, len = menuItems.length; i < len; i++) {
    // console.log(menuItems[i].getAttribute("href").indexOf(current))
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
        menuItems[i].className += " active";
    }
}
});
